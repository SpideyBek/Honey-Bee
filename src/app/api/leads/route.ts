import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { storeLead, isRateLimited, CustomerLead } from "@/lib/leads";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-\+\(\)\.]{7,20}$/;

type FieldError = { field: string; message: string };

function ip(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ---------------------------------------------------------------------------
// POST /api/leads
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // --- Rate limit ---
  const clientIp = ip(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // --- Parse body ---
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  // --- Honeypot: bots fill in the hidden "website" field ---
  if (b.website) {
    // Silently accept so bots don't know they were detected
    return NextResponse.json({ success: true, leadId: "ok" }, { status: 201 });
  }

  // --- Validate contact fields ---
  const errors: FieldError[] = [];

  const fullName = typeof b.fullName === "string" ? b.fullName.trim() : "";
  if (!fullName) {
    errors.push({ field: "fullName", message: "Full name is required." });
  } else if (fullName.length < 2) {
    errors.push({ field: "fullName", message: "Please enter your full name." });
  } else if (fullName.length > 100) {
    errors.push({ field: "fullName", message: "Name must be 100 characters or fewer." });
  }

  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  if (!phone) {
    errors.push({ field: "phone", message: "Phone number is required." });
  } else if (!PHONE_RE.test(phone)) {
    errors.push({ field: "phone", message: "Please enter a valid phone number." });
  }

  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (!email) {
    errors.push({ field: "email", message: "Email address is required." });
  } else if (!EMAIL_RE.test(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }

  // --- Validate items ---
  const knownIds = new Set(products.map((p) => p.id));

  if (!Array.isArray(b.items) || b.items.length === 0) {
    errors.push({ field: "items", message: "Your bag is empty." });
  } else {
    const items = b.items as unknown[];

    for (const raw of items) {
      if (!raw || typeof raw !== "object") {
        errors.push({ field: "items", message: "Invalid item data." });
        break;
      }
      const item = raw as Record<string, unknown>;

      if (typeof item.productId !== "string" || !knownIds.has(item.productId)) {
        errors.push({ field: "items", message: `Unknown product: ${item.productId}` });
        break;
      }
      if (
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 99
      ) {
        errors.push({ field: "items", message: "Invalid quantity." });
        break;
      }
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // --- Create lead ---
  const lead: CustomerLead = {
    id:        crypto.randomUUID(),
    fullName,
    phone,
    email,
    products:  (b.items as Array<{ productId: string; quantity: number }>).map((i) => ({
      productId: i.productId,
      quantity:  i.quantity,
    })),
    createdAt: new Date().toISOString(),
    status:    "new",
  };

  try {
    await storeLead(lead);
  } catch (err) {
    console.error("[leads] Supabase error:", err);
    return NextResponse.json(
      { error: "We could not save your inquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
}
