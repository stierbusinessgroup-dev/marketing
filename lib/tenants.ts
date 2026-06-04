import { getAdminClient } from "@/lib/supabase/admin";

export type TenantRow = {
  id: string;
  business: string;
  location: string | null;
  subdomain: string;
  site_published: boolean;
};

/**
 * Look up a client row by its subdomain. Uses the service-role admin client so
 * it bypasses RLS (tenant sites are public, but only for published rows).
 * Returns null when:
 *   - the admin client is unconfigured (missing env vars)
 *   - no row matches
 *   - the query errors
 */
export async function getTenantBySubdomain(
  subdomain: string
): Promise<TenantRow | null> {
  const admin = getAdminClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from("clients")
    .select("id,business,location,subdomain,site_published")
    .eq("subdomain", subdomain)
    .maybeSingle();

  if (error || !data) return null;

  return data as TenantRow;
}
