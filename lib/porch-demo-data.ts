// All mock data for the Porch Kitchen sales demo.
// Typed independently — do NOT import from lib/dashboard-data (that is Chris's CRM).

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatCard = {
  eyebrow: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
};

export type AgentActivity = {
  id: string;
  time: string;
  message: string;
  type: "flag" | "log" | "info";
};

export type PrepTaskItem = {
  id: string;
  label: string;
  done: boolean;
  group: string;
};

export type InventoryStatus = "OK" | "Low" | "Critical";

export type InventoryRow = {
  id: string;
  item: string;
  par: string;
  onHand: string;
  status: InventoryStatus;
};

// ─── Overview ────────────────────────────────────────────────────────────────

export const statCards: StatCard[] = [
  {
    eyebrow: "Days to Open",
    value: "14",
    subtext: "Dining room opens June 18",
    highlight: true,
  },
  {
    eyebrow: "Par Items Low",
    value: "3",
    subtext: "Needs attention before service",
    highlight: false,
  },
  {
    eyebrow: "Open Launch Tasks",
    value: "7 / 12",
    subtext: "5 completed, 7 remaining",
    highlight: false,
  },
];

export const agentActivity: AgentActivity[] = [
  {
    id: "a1",
    time: "9:14 am",
    message: "Flagged: butter below par — 2 lbs on hand, par is 6 lbs",
    type: "flag",
  },
  {
    id: "a2",
    time: "8:42 pm",
    message: "Grand-opening announcement drafted and queued for your review",
    type: "log",
  },
  {
    id: "a3",
    time: "Yesterday 4:07 pm",
    message: "Catering inquiry logged: Harvest Winery dinner, Sept 20, ~60 guests",
    type: "info",
  },
  {
    id: "a4",
    time: "Yesterday 11:30 am",
    message: "Beer & wine list finalized — 8 wines, 6 local craft beers noted",
    type: "log",
  },
  {
    id: "a5",
    time: "Yesterday 9:00 am",
    message: "Press Democrat feature pitch sent — awaiting response",
    type: "info",
  },
];

// ─── Weekly covers (Mon–Sun) ──────────────────────────────────────────────────

export type WeeklyBarDatum = { day: string; covers: number };

export const weeklyCovers: WeeklyBarDatum[] = [
  { day: "Mon", covers: 32 },
  { day: "Tue", covers: 41 },
  { day: "Wed", covers: 38 },
  { day: "Thu", covers: 55 },
  { day: "Fri", covers: 74 },
  { day: "Sat", covers: 82 },
  { day: "Sun", covers: 68 },
];

// ─── Weekly revenue ───────────────────────────────────────────────────────────

export type WeeklyLineDatum = { day: string; revenue: number };

export const weeklyRevenue: WeeklyLineDatum[] = [
  { day: "Mon", revenue: 1280 },
  { day: "Tue", revenue: 1640 },
  { day: "Wed", revenue: 1520 },
  { day: "Thu", revenue: 2200 },
  { day: "Fri", revenue: 2960 },
  { day: "Sat", revenue: 3280 },
  { day: "Sun", revenue: 2720 },
];

// ─── Launch milestones ────────────────────────────────────────────────────────

export type MilestoneCategory = "Kitchen" | "Front of House" | "Marketing" | "Permits & Admin";

export type Milestone = {
  id: string;
  category: MilestoneCategory;
  label: string;
  done: boolean;
};

export const milestones: Milestone[] = [
  // Kitchen
  { id: "m01", category: "Kitchen", label: "Finalize dinner menu", done: true },
  { id: "m02", category: "Kitchen", label: "Line equipment check complete", done: true },
  { id: "m03", category: "Kitchen", label: "Prep schedule built and posted", done: false },

  // Front of House
  { id: "m04", category: "Front of House", label: "Hire 3 servers", done: false },
  { id: "m05", category: "Front of House", label: "POS system training complete", done: true },
  { id: "m06", category: "Front of House", label: "Beer & wine list finalized", done: true },
  { id: "m07", category: "Front of House", label: "Table layout set and measured", done: false },

  // Marketing
  { id: "m08", category: "Marketing", label: "Grand-opening announcement published", done: false },
  { id: "m09", category: "Marketing", label: "Mailing-list invite sent", done: false },

  // Permits & Admin
  { id: "m10", category: "Permits & Admin", label: "Health permit final inspection", done: true },
  { id: "m11", category: "Permits & Admin", label: "Beer & wine license confirmed", done: true },
  { id: "m12", category: "Permits & Admin", label: "Signage installed", done: false },
];

// ─── Marketing kanban ─────────────────────────────────────────────────────────

export type KanbanColumn = "Ideas" | "Planned" | "In Progress" | "Live";

export type KanbanCard = {
  id: string;
  column: KanbanColumn;
  title: string;
  tag: string;
  dueChip?: string;
};

export const kanbanCards: KanbanCard[] = [
  // Ideas
  { id: "k01", column: "Ideas", title: "Beer & wine pairing nights", tag: "Events" },
  { id: "k02", column: "Ideas", title: "Loyalty punch card program", tag: "Retention" },
  { id: "k03", column: "Ideas", title: "Local farm collab dinner series", tag: "Community" },

  // Planned
  { id: "k04", column: "Planned", title: "Grand-opening IG teaser series", tag: "Social", dueChip: "Jun 14" },
  { id: "k05", column: "Planned", title: "Email blast to mailing list", tag: "Email", dueChip: "Jun 16" },

  // In Progress
  { id: "k06", column: "In Progress", title: "Press Democrat feature pitch", tag: "PR", dueChip: "Jun 10" },
  { id: "k07", column: "In Progress", title: "Google Business profile refresh", tag: "Local SEO" },

  // Live
  { id: "k08", column: "Live", title: "Opening-week prix fixe announced", tag: "Menu" },
];

// ─── Catering ─────────────────────────────────────────────────────────────────

export type CateringStatus = "Inquiry" | "Confirmed" | "Complete";

export type CateringEvent = {
  id: string;
  date: string;
  client: string;
  headcount: number;
  status: CateringStatus;
  revenue: number;
};

export const cateringEvents: CateringEvent[] = [
  { id: "c01", date: "Jun 22", client: "Harvest Moon Winery",   headcount: 60,  status: "Confirmed", revenue: 4800 },
  { id: "c02", date: "Jul 11", client: "Redwood Credit Union",  headcount: 35,  status: "Confirmed", revenue: 2800 },
  { id: "c03", date: "Aug 3",  client: "Hernandez Wedding Rehearsal", headcount: 45, status: "Inquiry", revenue: 3600 },
  { id: "c04", date: "Sep 13", client: "Sebastopol Community Fund Gala", headcount: 90, status: "Inquiry", revenue: 7200 },
  { id: "c05", date: "Oct 4",  client: "Private Birthday — Fontaine", headcount: 20, status: "Complete", revenue: 1600 },
];

export type CateringBarDatum = { client: string; revenue: number };

export const cateringBarData: CateringBarDatum[] = cateringEvents.map((e) => ({
  client: e.client.split(" ").slice(0, 2).join(" "),
  revenue: e.revenue,
}));

// ─── Prep & SOPs ──────────────────────────────────────────────────────────────

export const prepTasks: PrepTaskItem[] = [
  // Morning Prep
  { id: "p1", group: "Morning Prep", label: "Count walk-in stock & note any low items", done: true },
  { id: "p2", group: "Morning Prep", label: "Pull and prep sauces for service", done: true },
  { id: "p3", group: "Morning Prep", label: "Confirm specials with chef", done: true },
  { id: "p4", group: "Morning Prep", label: "Set the line by 11am", done: false },

  // EOD Close
  { id: "e1", group: "EOD Close", label: "Record waste log in agent", done: false },
  { id: "e2", group: "EOD Close", label: "Check walk-in temps & log readings", done: false },
  { id: "e3", group: "EOD Close", label: "Pull tomorrow's prep list from agent", done: false },
  { id: "e4", group: "EOD Close", label: "Cash drawer reconciled", done: false },
];

// ─── Live Music ───────────────────────────────────────────────────────────────

export type MusicActStatus = "Inquiry" | "Held" | "Confirmed" | "Played";

export type MusicAct = {
  id: string;
  act: string;
  genre: string;
  contact: string;
  date: string;
  fee: number;
  status: MusicActStatus;
  recurring?: boolean;
  note?: string;
};

export const musicActs: MusicAct[] = [
  {
    id: "mu01",
    act: "Kevin Boisset Trio",
    genre: "Jazz-funk",
    contact: "Kevin Boisset",
    date: "Jun 20",
    fee: 0,
    status: "Confirmed",
    recurring: true,
    note: "House act — recurring monthly residency",
  },
  {
    id: "mu02",
    act: "Sebastopol Sessions",
    genre: "Open jazz jam",
    contact: "Dario Meraz",
    date: "Jun 27",
    fee: 150,
    status: "Confirmed",
    recurring: true,
    note: "Weekly Thursday jam — beer & wine pairing flight runs all night",
  },
  {
    id: "mu03",
    act: "Russian River Ramblers",
    genre: "Bluegrass",
    contact: "Pam Okello",
    date: "Jul 11",
    fee: 300,
    status: "Confirmed",
  },
  {
    id: "mu04",
    act: "Sage & Vine",
    genre: "Folk duo",
    contact: "Claire Hagen",
    date: "Jul 19",
    fee: 250,
    status: "Held",
  },
  {
    id: "mu05",
    act: "Lia Rose",
    genre: "Indie folk",
    contact: "Lia Rose",
    date: "Jun 14",
    fee: 200,
    status: "Played",
  },
  {
    id: "mu06",
    act: "Marqui & the Moonlight",
    genre: "Soul / R&B",
    contact: "Marqui Delacroix",
    date: "Aug 2",
    fee: 400,
    status: "Inquiry",
  },
  {
    id: "mu07",
    act: "The Gravenstein Stomp",
    genre: "Americana",
    contact: "Reed Halverson",
    date: "Aug 16",
    fee: 350,
    status: "Inquiry",
  },
];

export type MusicBookingDatum = { month: string; bookings: number };

export const musicBookingsByMonth: MusicBookingDatum[] = [
  { month: "Mar", bookings: 2 },
  { month: "Apr", bookings: 3 },
  { month: "May", bookings: 4 },
  { month: "Jun", bookings: 5 },
  { month: "Jul", bookings: 4 },
  { month: "Aug", bookings: 3 },
];

// ─── Proposals ────────────────────────────────────────────────────────────────

export type ProposalStatus = "Draft" | "Sent" | "Accepted" | "Declined";

export type Proposal = {
  id: string;
  event: string;
  client: string;
  date: string;
  guests: number;
  value: number;
  status: ProposalStatus;
};

export const proposals: Proposal[] = [
  {
    id: "pr01",
    event: "Harvest Winery Vineyard Dinner",
    client: "Harvest Moon Winery",
    date: "Sep 6",
    guests: 60,
    value: 6840,
    status: "Accepted",
  },
  {
    id: "pr02",
    event: "Fontaine Private Birthday",
    client: "Marie Fontaine",
    date: "Jun 28",
    guests: 22,
    value: 2090,
    status: "Sent",
  },
  {
    id: "pr03",
    event: "Sebastopol Community Fund Gala",
    client: "SCF Board",
    date: "Oct 11",
    guests: 90,
    value: 9450,
    status: "Sent",
  },
  {
    id: "pr04",
    event: "Redwood Credit Union Team Lunch",
    client: "RCU HR Dept.",
    date: "Jul 19",
    guests: 35,
    value: 2625,
    status: "Draft",
  },
  {
    id: "pr05",
    event: "Hernandez Wedding Rehearsal Dinner",
    client: "Marco Hernandez",
    date: "Aug 23",
    guests: 45,
    value: 4140,
    status: "Declined",
  },
];

export type ProposalMenuItem = {
  category: string;
  item: string;
};

export type ProposalLineItem = {
  description: string;
  unitLabel: string;
  units: number;
  ratePerUnit: number;
};

export type SampleProposal = {
  id: string;
  event: string;
  client: string;
  contactName: string;
  eventDate: string;
  guests: number;
  preparedBy: string;
  preparedDate: string;
  menu: ProposalMenuItem[];
  lineItems: ProposalLineItem[];
  servicePct: number;
  footer: string;
};

export const sampleProposal: SampleProposal = {
  id: "pr01",
  event: "Harvest Winery Vineyard Dinner",
  client: "Harvest Moon Winery",
  contactName: "Dana Okafor, Events Director",
  eventDate: "Saturday, September 6, 2025 — 6:00 PM",
  guests: 60,
  preparedBy: "Kevin Boisset, The Porch Kitchen",
  preparedDate: "June 4, 2025",
  menu: [
    { category: "Reception Bites", item: "Porch bruschetta — heirloom tomato, basil oil, grilled levain" },
    { category: "Reception Bites", item: "Duck rillettes crostini with fig mostarda" },
    { category: "Salad (family-style)", item: "Little gem & herb salad, champagne vinaigrette, shaved Dry Jack" },
    { category: "Mains (family-style)", item: "Slow-braised bone-in short rib, natural jus" },
    { category: "Mains (family-style)", item: "Wood-roasted branzino, Meyer lemon salsa verde" },
    { category: "Mains (family-style)", item: "Summer squash gratin with Gruyère & fresh thyme" },
    { category: "Sides", item: "Crusty sourdough with cultured butter" },
    { category: "Sides", item: "Roasted fingerling potatoes, herb chimichurri" },
    { category: "Beer & Wine Pairing", item: "3 wines (Sonoma County whites & reds) — curated by The Porch" },
    { category: "Beer & Wine Pairing", item: "2 local craft beers — Bear Republic & Russian River Brewing" },
    { category: "Dessert", item: "Seasonal stone-fruit galette, crème fraîche" },
  ],
  lineItems: [
    { description: "Food — per person", unitLabel: "guest", units: 60, ratePerUnit: 85 },
    { description: "Beer & wine pairing — per person", unitLabel: "guest", units: 60, ratePerUnit: 22 },
    { description: "Staffing (4 servers, 1 chef)", unitLabel: "staff-hours", units: 20, ratePerUnit: 28 },
    { description: "Equipment rental & linen", unitLabel: "flat", units: 1, ratePerUnit: 400 },
  ],
  servicePct: 18,
  footer:
    "Proposal valid for 14 days. A 50% deposit confirms the date. Remaining balance due 7 days prior to event. Beer & wine only — no spirits service. Menu subject to seasonal availability.",
};

// ─── Inventory ────────────────────────────────────────────────────────────────

export const inventoryRows: InventoryRow[] = [
  { id: "i01", item: "Duck Confit (portions)",        par: "12",       onHand: "12",     status: "OK" },
  { id: "i02", item: "Unsalted Butter",               par: "6 lbs",    onHand: "2 lbs",  status: "Low" },
  { id: "i03", item: "Heirloom Tomatoes",             par: "10 lbs",   onHand: "8 lbs",  status: "OK" },
  { id: "i04", item: "House Pickles (qt jars)",       par: "8",        onHand: "5",      status: "Low" },
  { id: "i05", item: "Sourdough Levain",              par: "4 loaves", onHand: "4 loaves", status: "OK" },
  { id: "i06", item: "Branzino (whole, 1 lb)",        par: "8",        onHand: "0",      status: "Critical" },
  { id: "i07", item: "Heavy Cream",                   par: "2 qt",     onHand: "2 qt",   status: "OK" },
  { id: "i08", item: "Herb Salad Mix",                par: "3 lbs",    onHand: "1 lb",   status: "Low" },
  { id: "i09", item: "Bone-In Short Rib",             par: "10 lbs",   onHand: "10 lbs", status: "OK" },
  { id: "i10", item: "Seasonal Citrus (Meyer Lemon)", par: "2 doz",    onHand: "2 doz",  status: "OK" },
];
