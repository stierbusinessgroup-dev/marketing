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

// ─── Scheduling ───────────────────────────────────────────────────────────────

export type StaffRole =
  | "Server"
  | "Line Cook"
  | "Sous Chef"
  | "Host"
  | "Dishwasher"
  | "Bartender (Beer & Wine)";

export type ShiftSlot = "AM" | "PM" | "Off";

export type StaffMember = {
  id: string;
  name: string;
  role: StaffRole;
  hoursThisWeek: number;
  schedule: Record<"Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun", ShiftSlot>;
};

export const staffRoster: StaffMember[] = [
  {
    id: "s01",
    name: "Maria Delgado",
    role: "Sous Chef",
    hoursThisWeek: 42,
    schedule: { Mon: "AM", Tue: "AM", Wed: "AM", Thu: "AM", Fri: "AM", Sat: "AM", Sun: "Off" },
  },
  {
    id: "s02",
    name: "Tyler Nguyen",
    role: "Line Cook",
    hoursThisWeek: 36,
    schedule: { Mon: "PM", Tue: "PM", Wed: "PM", Thu: "PM", Fri: "PM", Sat: "Off", Sun: "PM" },
  },
  {
    id: "s03",
    name: "Jess Okafor",
    role: "Line Cook",
    hoursThisWeek: 32,
    schedule: { Mon: "AM", Tue: "AM", Wed: "Off", Thu: "AM", Fri: "AM", Sat: "PM", Sun: "PM" },
  },
  {
    id: "s04",
    name: "Camille Broussard",
    role: "Server",
    hoursThisWeek: 28,
    schedule: { Mon: "Off", Tue: "PM", Wed: "PM", Thu: "PM", Fri: "PM", Sat: "PM", Sun: "Off" },
  },
  {
    id: "s05",
    name: "Dario Meraz",
    role: "Server",
    hoursThisWeek: 30,
    schedule: { Mon: "PM", Tue: "Off", Wed: "PM", Thu: "PM", Fri: "PM", Sat: "PM", Sun: "AM" },
  },
  {
    id: "s06",
    name: "Sophie Lam",
    role: "Host",
    hoursThisWeek: 24,
    schedule: { Mon: "Off", Tue: "PM", Wed: "PM", Thu: "Off", Fri: "PM", Sat: "AM", Sun: "AM" },
  },
  {
    id: "s07",
    name: "Marcus Webb",
    role: "Bartender (Beer & Wine)",
    hoursThisWeek: 34,
    schedule: { Mon: "PM", Tue: "PM", Wed: "Off", Thu: "PM", Fri: "PM", Sat: "PM", Sun: "PM" },
  },
  {
    id: "s08",
    name: "Rosa Ibarra",
    role: "Dishwasher",
    hoursThisWeek: 26,
    schedule: { Mon: "PM", Tue: "PM", Wed: "PM", Thu: "Off", Fri: "PM", Sat: "PM", Sun: "Off" },
  },
];

export const laborSummary = {
  totalScheduledHrs: staffRoster.reduce((s, m) => s + m.hoursThisWeek, 0),
  estLaborCost: staffRoster.reduce((s, m) => {
    const rate = m.role === "Sous Chef" ? 28 : m.role === "Line Cook" ? 22 : m.role === "Bartender (Beer & Wine)" ? 20 : m.role === "Host" ? 17 : m.role === "Dishwasher" ? 16 : 18;
    return s + m.hoursThisWeek * rate;
  }, 0),
  laborTargetPct: 30,
  weeklyRevTarget: 15600,
  openShifts: 2,
};

// ─── Reservations ─────────────────────────────────────────────────────────────

export type ReservationNote = "VIP" | "Allergy" | "Anniversary" | "Birthday" | "";

export type Reservation = {
  id: string;
  time: string;
  name: string;
  partySize: number;
  note: ReservationNote;
  noteDetail?: string;
};

export const tonightsReservations: Reservation[] = [
  { id: "r01", time: "5:30 PM", name: "Fontaine, Marie",    partySize: 2,  note: "VIP",         noteDetail: "Regular guest — send amuse-bouche" },
  { id: "r02", time: "5:45 PM", name: "Patel, Rohan",       partySize: 4,  note: "Allergy",     noteDetail: "Tree nuts — full table" },
  { id: "r03", time: "6:00 PM", name: "Hernandez, Marco",   partySize: 6,  note: "",            noteDetail: "" },
  { id: "r04", time: "6:15 PM", name: "Okafor, Yemi",       partySize: 2,  note: "Anniversary", noteDetail: "5th anniversary — dessert with candle" },
  { id: "r05", time: "6:30 PM", name: "Takahashi, Kenji",   partySize: 3,  note: "",            noteDetail: "" },
  { id: "r06", time: "7:00 PM", name: "Bradley, Lena",      partySize: 8,  note: "VIP",         noteDetail: "Corporate table — Drake & Associates" },
  { id: "r07", time: "7:15 PM", name: "Nguyen, Linh",       partySize: 4,  note: "Allergy",     noteDetail: "Gluten-free — Linh only" },
  { id: "r08", time: "7:30 PM", name: "Alvarez, Carmen",    partySize: 2,  note: "Birthday",    noteDetail: "Her 40th — complimentary galette" },
  { id: "r09", time: "8:00 PM", name: "Kowalski, Jan",      partySize: 5,  note: "",            noteDetail: "" },
  { id: "r10", time: "8:30 PM", name: "Reed, Harper",       partySize: 2,  note: "VIP",         noteDetail: "Press Democrat writer — treat well" },
];

export const coversSummary = {
  lunchCovers: 0,
  dinnerCovers: tonightsReservations.reduce((s, r) => s + r.partySize, 0),
  walkInBuffer: 12,
};

export type WeekAheadCoversDatum = { day: string; covers: number };

export const weekAheadCovers: WeekAheadCoversDatum[] = [
  { day: "Mon", covers: 18 },
  { day: "Tue", covers: 24 },
  { day: "Wed", covers: 31 },
  { day: "Thu", covers: 38 },
  { day: "Fri (tonight)", covers: coversSummary.dinnerCovers + coversSummary.walkInBuffer },
  { day: "Sat", covers: 74 },
  { day: "Sun", covers: 52 },
];

// ─── Menu & Food Cost ─────────────────────────────────────────────────────────

export type MenuCategory =
  | "Starters"
  | "Mains"
  | "Sides"
  | "Desserts"
  | "Beer"
  | "Wine";

export type FoodCostBand = "good" | "watch" | "high";

export type MenuItem = {
  id: string;
  dish: string;
  category: MenuCategory;
  menuPrice: number;
  plateCost: number;
};

export const menuItems: MenuItem[] = [
  { id: "mi01", dish: "Duck Rillettes Crostini",         category: "Starters", menuPrice: 16,  plateCost: 4.20 },
  { id: "mi02", dish: "Porch Bruschetta",                category: "Starters", menuPrice: 13,  plateCost: 2.80 },
  { id: "mi03", dish: "Little Gem Herb Salad",           category: "Starters", menuPrice: 14,  plateCost: 3.50 },
  { id: "mi04", dish: "Bone-In Short Rib",               category: "Mains",   menuPrice: 42,  plateCost: 13.80 },
  { id: "mi05", dish: "Wood-Roasted Branzino",           category: "Mains",   menuPrice: 38,  plateCost: 14.40 },
  { id: "mi06", dish: "Summer Squash Gratin",            category: "Mains",   menuPrice: 26,  plateCost: 6.20 },
  { id: "mi07", dish: "Roasted Fingerling Potatoes",     category: "Sides",   menuPrice: 10,  plateCost: 2.10 },
  { id: "mi08", dish: "Stone-Fruit Galette",             category: "Desserts",menuPrice: 12,  plateCost: 3.60 },
  { id: "mi09", dish: "Russian River Brewing IPA (pint)",category: "Beer",    menuPrice: 9,   plateCost: 2.70 },
  { id: "mi10", dish: "Sonoma Pinot Noir (glass)",       category: "Wine",    menuPrice: 16,  plateCost: 4.80 },
];

export function foodCostPct(item: MenuItem): number {
  return (item.plateCost / item.menuPrice) * 100;
}

export function foodCostBand(pct: number): FoodCostBand {
  if (pct < 30) return "good";
  if (pct <= 35) return "watch";
  return "high";
}

export const eightySixBoard: string[] = [
  "Wood-Roasted Branzino",
  "Heirloom Tomato Salad (seasonal, out)",
];

export type FoodCostCategoryDatum = { category: string; avgCostPct: number };

export const foodCostByCategory: FoodCostCategoryDatum[] = [
  { category: "Starters",  avgCostPct: 22.4 },
  { category: "Mains",     avgCostPct: 36.1 },
  { category: "Sides",     avgCostPct: 21.0 },
  { category: "Desserts",  avgCostPct: 30.0 },
  { category: "Beer",      avgCostPct: 30.0 },
  { category: "Wine",      avgCostPct: 30.0 },
];

// ─── Sales & Finances ─────────────────────────────────────────────────────────

export type DailySalesDatum = { day: string; sales: number };

export const dailySales: DailySalesDatum[] = [
  { day: "Mon", sales: 1280 },
  { day: "Tue", sales: 1640 },
  { day: "Wed", sales: 1520 },
  { day: "Thu", sales: 2200 },
  { day: "Fri", sales: 2960 },
  { day: "Sat", sales: 3280 },
  { day: "Sun", sales: 2720 },
];

export const weeklyTotal = dailySales.reduce((s, d) => s + d.sales, 0);

export type SalesCategoryDatum = { name: string; value: number };

export const salesByCategory: SalesCategoryDatum[] = [
  { name: "Food",  value: 11700 },
  { name: "Beer",  value: 1890 },
  { name: "Wine",  value: 2010 },
];

export const financeSnapshot = {
  todaySales: 2960,
  weekToDate: weeklyTotal,
  avgCheck: 52,
  foodCostPct: 31.2,
  laborPct: 28.4,
  weeklyPL: {
    revenue: weeklyTotal,
    foodCost: Math.round(weeklyTotal * 0.312),
    labor: Math.round(weeklyTotal * 0.284),
    overhead: 1400,
    get net() {
      return this.revenue - this.foodCost - this.labor - this.overhead;
    },
    get netMarginPct() {
      return ((this.revenue - this.foodCost - this.labor - this.overhead) / this.revenue) * 100;
    },
  },
};

// ─── Ordering & Vendors ───────────────────────────────────────────────────────

export type Vendor = {
  id: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  orderDay: string;
};

export const vendors: Vendor[] = [
  { id: "v01", name: "Locally Grown Farms",     category: "Produce",          contact: "Ben Sauter",     phone: "(707) 555-0142", orderDay: "Mon & Thu" },
  { id: "v02", name: "Bay West Protein Co.",    category: "Proteins & Dairy", contact: "Sarah Kim",      phone: "(415) 555-0381", orderDay: "Tue & Fri" },
  { id: "v03", name: "Mendocino Beverages",     category: "Beer & Wine",      contact: "Tom Ruiz",       phone: "(707) 555-0274", orderDay: "Wednesday" },
  { id: "v04", name: "Pacific Dry Goods",       category: "Dry Goods & Oils", contact: "Ellen Park",     phone: "(510) 555-0917", orderDay: "Monday" },
];

export type POStatus = "Draft" | "Sent" | "Delivered";

export type PurchaseOrder = {
  id: string;
  vendorId: string;
  vendorName: string;
  itemCount: number;
  total: number;
  status: POStatus;
  expectedDate: string;
};

export const openOrders: PurchaseOrder[] = [
  { id: "po01", vendorId: "v01", vendorName: "Locally Grown Farms",  itemCount: 8,  total: 312,  status: "Sent",      expectedDate: "Jun 5" },
  { id: "po02", vendorId: "v02", vendorName: "Bay West Protein Co.", itemCount: 5,  total: 640,  status: "Delivered", expectedDate: "Jun 4" },
  { id: "po03", vendorId: "v03", vendorName: "Mendocino Beverages",  itemCount: 12, total: 870,  status: "Draft",     expectedDate: "Jun 6" },
  { id: "po04", vendorId: "v04", vendorName: "Pacific Dry Goods",    itemCount: 6,  total: 218,  status: "Sent",      expectedDate: "Jun 5" },
];

export type ReorderSuggestion = {
  id: string;
  item: string;
  onHand: string;
  par: string;
  suggestedQty: string;
  vendorName: string;
};

export const reorderSuggestions: ReorderSuggestion[] = [
  { id: "rs01", item: "Unsalted Butter",  onHand: "2 lbs",  par: "6 lbs",     suggestedQty: "8 lbs",      vendorName: "Bay West Protein Co." },
  { id: "rs02", item: "Branzino (whole)", onHand: "0",       par: "8",         suggestedQty: "10 pieces",  vendorName: "Bay West Protein Co." },
  { id: "rs03", item: "Herb Salad Mix",   onHand: "1 lb",   par: "3 lbs",     suggestedQty: "4 lbs",      vendorName: "Locally Grown Farms" },
  { id: "rs04", item: "House Pickles",    onHand: "5 jars",  par: "8 jars",    suggestedQty: "6 jars",     vendorName: "Pacific Dry Goods" },
];

// ─── Calendar / Month Events ──────────────────────────────────────────────────

export type CalendarEventType =
  | "reservation"
  | "catering"
  | "music"
  | "staff"
  | "milestone";

export type CalendarEvent = {
  id: string;
  day: number;           // day of June 2026 (1–30)
  type: CalendarEventType;
  title: string;
  time?: string;
};

export const monthEvents: CalendarEvent[] = [
  // ── Staff / prep days ─────────────────────────────────────────────────────
  { id: "ce01", day: 8,  type: "staff",       title: "All-hands kitchen prep day" },
  { id: "ce02", day: 15, type: "staff",       title: "Pre-opening dry run (full service)" },
  { id: "ce03", day: 17, type: "staff",       title: "Final setup & walk-through" },

  // ── Milestone — Dining Room Opening ───────────────────────────────────────
  { id: "ce04", day: 18, type: "milestone",   title: "Dining Room Opens", time: "5:00 PM" },

  // ── Music nights (from musicActs, June only) ───────────────────────────────
  { id: "ce05", day: 14, type: "music",       title: "Lia Rose", time: "7:00 PM" },
  { id: "ce06", day: 20, type: "music",       title: "Kevin Boisset Trio", time: "7:00 PM" },
  { id: "ce07", day: 27, type: "music",       title: "Sebastopol Sessions", time: "7:00 PM" },

  // ── Catering events (June only from cateringEvents) ───────────────────────
  { id: "ce08", day: 22, type: "catering",    title: "Harvest Moon Winery Dinner", time: "6:00 PM" },

  // ── Large-party reservations ───────────────────────────────────────────────
  { id: "ce09", day: 18, type: "reservation", title: "Opening night — full house",  time: "5:30 PM" },
  { id: "ce10", day: 19, type: "reservation", title: "Party of 14 — Chen family",   time: "7:00 PM" },
  { id: "ce11", day: 20, type: "reservation", title: "Corporate table — Drake & Co.", time: "7:30 PM" },
  { id: "ce12", day: 21, type: "reservation", title: "Party of 12 — Okafor reunion", time: "6:30 PM" },
  { id: "ce13", day: 25, type: "reservation", title: "Birthday party — Alvarez, 10", time: "7:00 PM" },
  { id: "ce14", day: 27, type: "reservation", title: "Anniversary dinner — Patel x2", time: "6:00 PM" },
  { id: "ce15", day: 28, type: "reservation", title: "Fontaine private party — 22",   time: "7:30 PM" },

  // ── Marketing / launch events ──────────────────────────────────────────────
  { id: "ce16", day: 10, type: "staff",       title: "Press Democrat feature deadline" },
  { id: "ce17", day: 14, type: "staff",       title: "IG teaser series goes live" },
  { id: "ce18", day: 16, type: "staff",       title: "Email blast to mailing list" },
];
