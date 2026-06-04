import { getAdminClient } from "@/lib/supabase/admin";
import { clients as placeholderClients, type Client } from "@/lib/dashboard-data";

type ClientRow = {
  id: string;
  business: string;
  location: string | null;
  status: Client["status"];
  plan: Client["plan"];
  mrr: number | null;
  onboarding_stage: string | null;
  start_date: string | null;
};

/**
 * Fetch clients from Supabase. Falls back to the seeded placeholder list when
 * Supabase isn't configured, the query errors, or the table is empty — so the
 * dashboard always renders something coherent (never breaks in a demo).
 * `live` is true only when the data came from the database.
 */
export async function getClients(): Promise<{ rows: Client[]; live: boolean }> {
  const admin = getAdminClient();
  if (!admin) return { rows: placeholderClients, live: false };

  const { data, error } = await admin
    .from("clients")
    .select("id,business,location,status,plan,mrr,onboarding_stage,start_date")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return { rows: placeholderClients, live: false };
  }

  const rows: Client[] = (data as ClientRow[]).map((r) => ({
    id: r.id,
    business: r.business,
    location: r.location ?? "—",
    status: r.status,
    plan: r.plan,
    mrr: r.mrr,
    onboardingStage: r.onboarding_stage ?? "—",
    startDate: r.start_date ?? "—",
  }));

  return { rows, live: true };
}

/** Derive the overview metrics from the live client list. */
export function computeMetrics(rows: Client[]) {
  const active = rows.filter((c) => c.status === "active" || c.status === "onboarding");
  const pipeline = rows.filter((c) => c.status === "lead" || c.status === "closing");
  const mrr = active.reduce((sum, c) => sum + (c.mrr ?? 0), 0);
  return {
    mrr,
    activeClients: active.length,
    pipeline: pipeline.length,
    thisMonthRevenue: mrr,
  };
}
