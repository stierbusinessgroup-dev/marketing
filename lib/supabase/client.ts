import { createBrowserClient } from "@supabase/ssr";

/** True only when both public Supabase env vars are present. */
export function isSupabaseConfigured(): boolean {
  return (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0
  );
}

/**
 * Browser Supabase client. Only call after checking isSupabaseConfigured()
 * (the login form does this), so the non-null assertions are safe at call time.
 * Kept async to match the `await createClient()` call sites.
 */
export async function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
