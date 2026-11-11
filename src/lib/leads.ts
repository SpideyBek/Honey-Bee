/**
 * Lead storage — Phase 4: Supabase (persistent).
 *
 * This module is SERVER-SIDE ONLY.
 * Never import it from a client component or expose SUPABASE_SERVICE_ROLE_KEY
 * to the browser.
 *
 * Table DDL (run once in the Supabase SQL editor):
 *
 *   create table if not exists leads (
 *     id          uuid primary key,
 *     full_name   text not null,
 *     phone       text not null,
 *     email       text not null,
 *     products    jsonb not null,
 *     created_at  timestamptz not null default now(),
 *     status      text not null default 'new'
 *       check (status in ('new','contacted','completed','cancelled'))
 *   );
 */

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InquiryProduct {
  productId: string;
  quantity: number;
}

export type LeadStatus = "new" | "contacted" | "completed" | "cancelled";

export interface CustomerLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  products: InquiryProduct[];
  createdAt: string; // ISO 8601
  status: LeadStatus;
}

// ---------------------------------------------------------------------------
// Supabase client (server-side singleton)
// ---------------------------------------------------------------------------

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. " +
      "Add them to .env.local and restart the dev server.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

/** Insert a new lead row. Throws on database error. */
export async function storeLead(lead: CustomerLead): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase.from("leads").insert({
    id:         lead.id,
    full_name:  lead.fullName,
    phone:      lead.phone,
    email:      lead.email,
    products:   lead.products,
    created_at: lead.createdAt,
    status:     lead.status,
  });

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

/** Fetch all leads, newest first. */
export async function getLeads(): Promise<CustomerLead[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Supabase select failed: ${error.message}`);

  return (data ?? []).map(row => ({
    id:        row.id,
    fullName:  row.full_name,
    phone:     row.phone,
    email:     row.email,
    products:  row.products,
    createdAt: row.created_at,
    status:    row.status,
  }));
}

/** Fetch a single lead by ID. Returns undefined if not found. */
export async function getLead(id: string): Promise<CustomerLead | undefined> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Supabase select failed: ${error.message}`);
  if (!data) return undefined;

  return {
    id:        data.id,
    fullName:  data.full_name,
    phone:     data.phone,
    email:     data.email,
    products:  data.products,
    createdAt: data.created_at,
    status:    data.status,
  };
}

// ---------------------------------------------------------------------------
// Simple IP-based rate limiter (in-memory — resets on server restart)
// Rate limiting the API layer, not the database layer.
// ---------------------------------------------------------------------------

interface RateEntry {
  count: number;
  resetAt: number;
}

const _rateMap = new Map<string, RateEntry>();

const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX       = 5;

export function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = _rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    _rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_MAX) return true;
  entry.count += 1;
  return false;
}
