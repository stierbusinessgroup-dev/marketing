import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service_role key. Bypasses RLS, so
 * NEVER import this into a client component. Used for the owner-only S-Tier
 * operating dashboard (server-rendered). Returns null when env is unset so
 * callers can fall back gracefully.
 */
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
