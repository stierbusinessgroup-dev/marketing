// Facebook Group Manager — data access for The Porch Kitchen.
//
// All access goes through the service-role admin client (server-only). The
// table is RLS-hardened with NO anon policies, so it is never reachable via
// the public anon key / PostgREST — the server mediates every read and write.
// Mutations live in app/sites/[subdomain]/social/actions.ts (passcode-guarded).

import { getAdminClient } from "@/lib/supabase/admin";

const TABLE = "porch_facebook_groups";

export type PorchGroup = {
  id: string;
  name: string;
  memberCount: number;
  focus: string | null;
  /** One posting rule per entry. */
  postingRequirements: string[];
  joinUrl: string | null;
};

type Row = {
  id: string;
  name: string;
  member_count: number | null;
  focus: string | null;
  posting_requirements: string[] | null;
  join_url: string | null;
};

function toGroup(r: Row): PorchGroup {
  return {
    id: r.id,
    name: r.name,
    memberCount: r.member_count ?? 0,
    focus: r.focus,
    postingRequirements: r.posting_requirements ?? [],
    joinUrl: r.join_url,
  };
}

/**
 * List all groups, oldest first. Returns [] if storage is unconfigured or the
 * table does not exist yet (so the page renders an empty state, never 500s).
 */
export async function listGroups(): Promise<PorchGroup[]> {
  const admin = getAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from(TABLE)
    .select("id,name,member_count,focus,posting_requirements,join_url")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[porch-groups] listGroups failed:", error.message);
    return [];
  }
  return (data as Row[]).map(toGroup);
}
