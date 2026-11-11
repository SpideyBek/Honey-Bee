"use client";

import { useState, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-\+\(\)\.]{7,20}$/;

interface FormValues {
  fullName: string;
  phone: string;
  email: string;
}

interface FormErrors {
  fullName: string;
  phone: string;
  email: string;
}

function validate(v: FormValues): FormErrors {
  const e: FormErrors = { fullName: "", phone: "", email: "" };

  const name = v.fullName.trim();
  if (!name)             e.fullName = "Full name is required.";
  else if (name.length < 2)   e.fullName = "Please enter your full name.";
  else if (name.length > 100) e.fullName = "Name must be 100 characters or fewer.";

  const phone = v.phone.trim();
  if (!phone)               e.phone = "Phone number is required.";
  else if (!PHONE_RE.test(phone)) e.phone = "Please enter a valid phone number (digits, spaces, +, dashes).";

  const email = v.email.trim();
  if (!email)               e.email = "Email address is required.";
  else if (!EMAIL_RE.test(email)) e.email = "Please enter a valid email address.";

  return e;
}

// ---------------------------------------------------------------------------
// Field component
// ---------------------------------------------------------------------------

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error: string;
  touched: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id, label, type = "text", value, error, touched,
  onChange, onBlur, placeholder, autoComplete,
}: FieldProps) {
  const hasError = touched && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-inter text-[9px] tracking-[0.28em] uppercase text-ivory/50"
      >
        {label} <span className="text-gold/60">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={[
          "w-full bg-transparent font-inter text-[14px] text-ivory/85 pb-3",
          "outline-none border-b transition-colors duration-200",
          "placeholder:text-ivory/20",
          hasError
            ? "border-red-400/60 focus:border-red-400"
            : "border-gold/25 focus:border-gold/70",
        ].join(" ")}
      />
      <div className="min-h-[16px]">
        {hasError && (
          <p className="font-inter text-[10px] text-red-400/80 leading-tight">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function InquiryClient() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const uid = useId();

  // Prevent hydration mismatch — cart is client-only
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Form state
  const [form, setForm] = useState<FormValues>({ fullName: "", phone: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({ fullName: "", phone: "", email: "" });
  const [touched, setTouched] = useState({ fullName: false, phone: false, email: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Enrich cart items with product data
  const cartItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = cartItems.reduce(
    (acc, { product, qty }) => acc + product.price * qty,
    0,
  );

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  function handleChange(field: keyof FormValues, value: string) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(updated)[field] }));
    }
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(form)[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Touch all fields to show errors
    setTouched({ fullName: true, phone: true, email: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    if (cartItems.length === 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone:    form.phone.trim(),
          email:    form.email.trim(),
          items: cartItems.map(({ id, qty }) => ({
            productId: id,
            quantity:  qty,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as Record<string, unknown>;
        const msg =
          typeof data.error === "string"
            ? data.error
            : "Submission failed. Please try again.";
        throw new Error(msg);
      }

      // Clear cart before navigating so success page shows a clean state
      clearCart();
      router.push("/inquiry/success");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Empty cart state (shown before mount too, to avoid flash)
  // ---------------------------------------------------------------------------

  if (!mounted || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center pt-24">
        <div className="mb-8 w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-gold/40" strokeWidth={1.2} />
        </div>
        <h1 className="font-cormorant text-3xl text-ivory/70 font-light mb-3">
          Your bag is empty
        </h1>
        <p className="font-inter text-[12px] tracking-widest text-ivory/35 uppercase mb-10">
          Add products before placing an inquiry
        </p>
        <Link
          href="/#collection"
          className="inline-flex items-center gap-2 font-inter text-[11px] tracking-[0.22em] uppercase
                     text-gold border border-gold/40 px-7 py-3 hover:bg-gold/8 transition-colors"
        >
          Explore Collection
          <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
        </Link>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Full inquiry layout
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-obsidian">
      {/* ── Page header ── */}
      <div className="pt-28 pb-12 px-6 text-center border-b border-ivory/[0.06]">
        <p className="font-inter text-[9px] tracking-[0.32em] uppercase text-gold/70 mb-4">
          Step 2 of 2
        </p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-ivory font-light">
          Complete Your Inquiry
        </h1>
        <p className="mt-3 font-inter text-[12px] tracking-widest text-ivory/35 uppercase">
          No payment required — our team will contact you directly
        </p>
      </div>

      {/* ── Two-column body ── */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

        {/* ── Left: Order Summary ── */}
        <div>
          <p className="font-inter text-[9px] tracking-[0.28em] uppercase text-gold/60 mb-8">
            Order Summary
          </p>

          {/* Product rows */}
          <div className="flex flex-col divide-y divide-ivory/[0.06]">
            {cartItems.map(({ id, qty, product }) => (
              <div key={id} className="flex items-center gap-5 py-5">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-ivory/5">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-cormorant text-[17px] text-ivory font-medium leading-tight truncate">
                    {product.name}
                  </p>
                  <p className="font-inter text-[10px] tracking-widest text-ivory/35 uppercase mt-0.5">
                    {product.size}
                  </p>
                </div>

                {/* Qty × price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-inter text-[12px] text-ivory/60">
                    {qty} × ${product.price}
                  </p>
                  <p className="font-cormorant text-[18px] text-gold font-medium mt-0.5">
                    ${product.price * qty}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="mt-6 pt-6 border-t border-ivory/[0.06] flex items-center justify-between">
            <p className="font-inter text-[10px] tracking-[0.24em] uppercase text-ivory/50">
              Estimated Total
            </p>
            <p className="font-cormorant text-2xl text-ivory font-light">
              ${subtotal}
            </p>
          </div>

          {/* Disclaimer box */}
          <div className="mt-6 p-4 border border-gold/15 bg-gold/[0.04]">
            <p className="font-inter text-[11px] text-ivory/40 leading-relaxed">
              <span className="text-gold/70">⚠ </span>
              Prices shown are estimates. Final pricing will be confirmed by our
              team when they reach out. No payment is collected at this stage.
            </p>
          </div>
        </div>

        {/* ── Right: Contact Form ── */}
        <div>
          <p className="font-inter text-[9px] tracking-[0.28em] uppercase text-gold/60 mb-8">
            Your Details
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">

            {/* Honeypot — hidden from humans, traps bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
              autoComplete="off"
            />

            <Field
              id={`${uid}-fullName`}
              label="Full Name"
              value={form.fullName}
              error={errors.fullName}
              touched={touched.fullName}
              onChange={(v) => handleChange("fullName", v)}
              onBlur={() => handleBlur("fullName")}
              placeholder="e.g. Elena Dimitrova"
              autoComplete="name"
            />

            <Field
              id={`${uid}-phone`}
              label="Phone Number"
              type="tel"
              value={form.phone}
              error={errors.phone}
              touched={touched.phone}
              onChange={(v) => handleChange("phone", v)}
              onBlur={() => handleBlur("phone")}
              placeholder="e.g. +1 555 000 0000"
              autoComplete="tel"
            />

            <Field
              id={`${uid}-email`}
              label="Email Address"
              type="email"
              value={form.email}
              error={errors.email}
              touched={touched.email}
              onChange={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              placeholder="e.g. elena@example.com"
              autoComplete="email"
            />

            {/* Privacy note */}
            <p className="font-inter text-[10px] text-ivory/30 leading-relaxed -mt-2">
              Your details are only used to process your inquiry. We will never
              share your information with third parties.
            </p>

            {/* API-level error banner */}
            {submitError && (
              <div className="p-3 border border-red-500/30 bg-red-500/5">
                <p className="font-inter text-[11px] text-red-400/80 leading-relaxed">
                  {submitError}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={[
                "mt-2 w-full flex items-center justify-center gap-3",
                "font-inter text-[11px] tracking-[0.22em] uppercase",
                "py-4 px-8 transition-all duration-200",
                submitting
                  ? "bg-gold/40 text-obsidian/60 cursor-not-allowed"
                  : "bg-gold text-obsidian hover:bg-gold-light",
              ].join(" ")}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit My Inquiry
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </>
              )}
            </button>

            <p className="font-inter text-[10px] text-center text-ivory/25 leading-relaxed">
              After you submit, a member of our team will contact you within
              1–2 business days to finalise your order. No payment is required at
              this stage.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
