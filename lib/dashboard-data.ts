// PLACEHOLDER — replace with Supabase queries once the S-Tier project is wired.
// Each export maps to one section of /dashboard. To wire real data, swap the
// typed array literal for an async function that queries your Supabase table.

// ─── Types ───────────────────────────────────────────────────────────────────

export type ClientStatus = "lead" | "closing" | "onboarding" | "active" | "paused";
export type ClientPlan = "Foundational" | "Growth" | "Custom" | "TBD";

export type Client = {
  id: string;
  business: string;
  location: string;
  status: ClientStatus;
  plan: ClientPlan;
  mrr: number | null;
  onboardingStage: string;
  startDate: string;
};

export type ActivityItem = {
  id: string;
  date: string;
  description: string;
};

export type TaskItem = {
  id: string;
  label: string;
  done: boolean;
  group: string;
};

export type BookkeepingRow = {
  id: string;
  month: string;
  category: string;
  description: string;
  type: "income" | "expense";
  amount: number;
};

// ─── Metrics ─────────────────────────────────────────────────────────────────

export const metrics = {
  mrr: 250,
  activeClients: 1,
  pipeline: 3,
  thisMonthRevenue: 250,
};

// ─── Clients ─────────────────────────────────────────────────────────────────

export const clients: Client[] = [
  {
    id: "1",
    business: "The Porch Kitchen",
    location: "Sebastopol, CA",
    status: "onboarding",
    plan: "Foundational",
    mrr: 250,
    onboardingStage: "Closing",
    startDate: "2026-06-02",
  },
  {
    id: "2",
    business: "Rosso Brewing Co.",
    location: "Santa Rosa, CA",
    status: "lead",
    plan: "TBD",
    mrr: null,
    onboardingStage: "Discovery call",
    startDate: "—",
  },
  {
    id: "3",
    business: "Healdsburg Running Co.",
    location: "Healdsburg, CA",
    status: "closing",
    plan: "Foundational",
    mrr: 250,
    onboardingStage: "Proposal sent",
    startDate: "—",
  },
  {
    id: "4",
    business: "Valley Ford Cheese",
    location: "Valley Ford, CA",
    status: "lead",
    plan: "TBD",
    mrr: null,
    onboardingStage: "Initial contact",
    startDate: "—",
  },
];

// ─── Recent activity ─────────────────────────────────────────────────────────

export const recentActivity: ActivityItem[] = [
  { id: "a1", date: "2026-06-04", description: "The Porch Kitchen — agreement signed, onboarding initiated." },
  { id: "a2", date: "2026-06-03", description: "Healdsburg Running Co. — Foundational proposal sent." },
  { id: "a3", date: "2026-06-02", description: "Rosso Brewing Co. — discovery call completed." },
  { id: "a4", date: "2026-06-01", description: "Valley Ford Cheese — initial outreach sent." },
];

// ─── Tasks / SOPs ─────────────────────────────────────────────────────────────

export const tasks: TaskItem[] = [
  // Onboarding checklist — The Porch Kitchen
  { id: "t1", group: "Onboarding: The Porch Kitchen", label: "Send welcome packet & NDA", done: true },
  { id: "t2", group: "Onboarding: The Porch Kitchen", label: "Provision AI agent instance", done: false },
  { id: "t3", group: "Onboarding: The Porch Kitchen", label: "Set up inventory tool", done: false },
  { id: "t4", group: "Onboarding: The Porch Kitchen", label: "Train staff on agent workflow", done: false },
  { id: "t5", group: "Onboarding: The Porch Kitchen", label: "Build customer-facing website", done: false },
  { id: "t6", group: "Onboarding: The Porch Kitchen", label: "First-month check-in scheduled", done: false },
  // Daily ops
  { id: "t7", group: "Daily Ops", label: "Review client agent logs", done: false },
  { id: "t8", group: "Daily Ops", label: "Check pipeline follow-ups", done: false },
  { id: "t9", group: "Daily Ops", label: "Update bookkeeping if invoices sent", done: false },
  { id: "t10", group: "Daily Ops", label: "Log any new inbound leads", done: false },
];

// ─── Bookkeeping ──────────────────────────────────────────────────────────────

export const bookkeeping: BookkeepingRow[] = [
  { id: "b1", month: "Jun 2026", category: "Consulting", description: "Foundational retainer — The Porch Kitchen", type: "income", amount: 250 },
  { id: "b2", month: "Jun 2026", category: "Infrastructure", description: "Supabase Pro plan", type: "expense", amount: 25 },
  { id: "b3", month: "Jun 2026", category: "Infrastructure", description: "Vercel Pro plan", type: "expense", amount: 20 },
  { id: "b4", month: "Jun 2026", category: "Software", description: "Domain + DNS (annual, amortized)", type: "expense", amount: 4 },
  { id: "b5", month: "May 2026", category: "Consulting", description: "Foundational retainer — The Porch Kitchen (partial)", type: "income", amount: 125 },
  { id: "b6", month: "May 2026", category: "Infrastructure", description: "Supabase Pro plan", type: "expense", amount: 25 },
  { id: "b7", month: "May 2026", category: "Infrastructure", description: "Vercel Pro plan", type: "expense", amount: 20 },
];
