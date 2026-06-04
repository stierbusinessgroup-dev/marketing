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
    eyebrow: "Tonight's Covers",
    value: "48",
    subtext: "Reservations confirmed",
    highlight: false,
  },
  {
    eyebrow: "Par Items Low",
    value: "3",
    subtext: "Needs attention before service",
    highlight: true,
  },
  {
    eyebrow: "Open Prep Tasks",
    value: "5 / 12",
    subtext: "7 completed today",
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
    message: "Logged: 86'd the branzino — sold out during dinner service",
    type: "log",
  },
  {
    id: "a3",
    time: "Yesterday 4:07 pm",
    message: "Prep note saved: hollandaise breaks after 90 min — flagged for chef review",
    type: "info",
  },
  {
    id: "a4",
    time: "Yesterday 11:30 am",
    message: "Inventory count recorded: walk-in audit complete, duck confit at par",
    type: "log",
  },
];

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

// ─── Inventory ────────────────────────────────────────────────────────────────

export const inventoryRows: InventoryRow[] = [
  { id: "i01", item: "Duck Confit (portions)",     par: "12",      onHand: "12",    status: "OK" },
  { id: "i02", item: "Unsalted Butter",            par: "6 lbs",   onHand: "2 lbs", status: "Low" },
  { id: "i03", item: "Heirloom Tomatoes",          par: "10 lbs",  onHand: "8 lbs", status: "OK" },
  { id: "i04", item: "House Pickles (qt jars)",    par: "8",       onHand: "5",     status: "Low" },
  { id: "i05", item: "Sourdough Levain",           par: "4 loaves",onHand: "4 loaves", status: "OK" },
  { id: "i06", item: "Branzino (whole, 1 lb)",     par: "8",       onHand: "0",     status: "Critical" },
  { id: "i07", item: "Heavy Cream",                par: "2 qt",    onHand: "2 qt",  status: "OK" },
  { id: "i08", item: "Herb Salad Mix",             par: "3 lbs",   onHand: "1 lb",  status: "Low" },
  { id: "i09", item: "Bone-In Short Rib",          par: "10 lbs",  onHand: "10 lbs",status: "OK" },
  { id: "i10", item: "Seasonal Citrus (Meyer Lemon)", par: "2 doz", onHand: "2 doz", status: "OK" },
];
