// One-time seed for The Porch Kitchen Facebook Group Manager.
//
//   node --env-file=.env.local scripts/seed-porch-groups.mjs
//   node --env-file=.env.local scripts/seed-porch-groups.mjs --force   (wipe + reseed)
//
// Uses the service-role key (bypasses RLS). Refuses to run if the table already
// has rows, unless --force is passed. ASCII-only on purpose.

import { createClient } from "@supabase/supabase-js";

const TABLE = "porch_facebook_groups";
const force = process.argv.includes("--force");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Run with --env-file=.env.local");
  process.exit(1);
}

// Listed in Chris's priority order. created_at is staggered below so the page
// (ordered by created_at asc) shows them in exactly this order.
const groups = [
  {
    name: "Sonoma County Foodies",
    memberCount: 70900,
    focus: "Public - Food, Sonoma County - very active (~18 posts/day)",
    postingRequirements: [
      "Advertising: business owners/staff may promote their business or specials no more than once per week",
      "Joining requires answering a question",
      "Must be about food in Sonoma County (alcohol-focused and political posts removed)",
      "Be kind, helpful, courteous; no food shaming or yucking others' yum",
      "Honest reviews OK; no personal attacks, pile-ons, or anonymous reviews",
      "Admins approve/decline at their discretion",
    ],
    joinUrl: "https://www.facebook.com/groups/sonomafoodies",
  },
  {
    name: "Save Sonoma County Restaurants!",
    memberCount: 27500,
    focus: "Public - Locally owned restaurants (~11 posts/day)",
    postingRequirements: [
      "New members asked to Like the pinned post after reading the rules",
      "Post only about locally owned restaurants/eateries",
      "No debates; keep discussion civil and food-related",
      "Be kind and courteous",
    ],
    joinUrl: "https://www.facebook.com/groups/SaveSoCoRestaurants",
  },
  {
    name: "Sonoma County Grapevine - Buy Sell and Events",
    memberCount: 22300,
    focus: "Public - Buy/sell & events - very active (~339 posts/day)",
    postingRequirements: [
      "Read the rules before posting any items (no further detailed rules published)",
    ],
    joinUrl: "https://www.facebook.com/groups/589277901102477",
  },
  {
    name: "Sonoma County Living and Events",
    memberCount: 10400,
    focus: "Public - Living & events (~47 posts/day)",
    postingRequirements: [
      "Keep topics related to Sonoma County; be kind and courteous",
      "No political discussions",
      "No scams (instant ban); no duplicate posts; no doxing",
      "Posts about alleged criminal activity are generally declined",
    ],
    joinUrl: "https://www.facebook.com/groups/226892461188533",
  },
  {
    name: "Sonoma County (General)",
    memberCount: 9400,
    focus: "Public - General county (~11 posts/day)",
    postingRequirements: ["No rules published in the rules section"],
    joinUrl: "https://www.facebook.com/groups/1414603482118688",
  },
  {
    name: "West Sonoma County Hub: Events, Businesses, and Resources",
    memberCount: 5000,
    focus: "Public - Events/business/resources - explicitly business-friendly (~25 posts/day)",
    postingRequirements: [
      "Explicitly business-friendly",
      "Be kind and courteous",
      "No hate speech or bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/westsonomacountyhub",
  },
  {
    name: "Sonoma Sweet Deals",
    memberCount: 4500,
    focus: "Public - Deals - extremely active (~161 posts/day)",
    postingRequirements: ["No rules published; sellers asked to be honest and detailed"],
    joinUrl: "https://www.facebook.com/groups/480532211992367",
  },
  {
    name: "Sonoma County Food Trucks!",
    memberCount: 4300,
    focus: "Public - Food trucks - relevant for to-gos, mobile orders, pop-ups, events (~1-2 posts/day)",
    postingRequirements: [
      "Food truck content only; local (Sonoma County) only",
      "Positivity only; no politics, hate speech, or bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/671434810539740",
  },
  {
    name: "Sonoma County Free/Barter/Sell",
    memberCount: 4200,
    focus: "Public - Free/barter/sell - low activity (~1 post/day)",
    postingRequirements: [
      "Self-promo: no promotions or spam ('give more than you take')",
      "Limit 1 post per week; delete old posts",
      "Be kind; Sonoma County-related only",
      "Suspicious/new accounts may be rejected; maintain/delete your own listings",
    ],
    joinUrl: "https://www.facebook.com/groups/sonomacountyfreebartersell",
  },
  {
    name: "Sonoma County Small Business Help and Recommendations",
    memberCount: 3800,
    focus: "Public - Small business help & recommendations (~2 posts/day)",
    postingRequirements: [
      "Self-promotion of your own business allowed once per week (recommending others can be more frequent)",
      "Must answer all membership/join questions to be approved",
      "Refer only Sonoma County small businesses",
      "No individual item sales or live sales",
      "Be kind; no hate speech/bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/1584009775097992",
  },
  {
    name: "What's up Sebastopol",
    memberCount: 15400,
    focus: "Public - Sebastopol community - business promo restricted",
    postingRequirements: [
      "Business promo restricted: moderators may delete business/client promo, free items, jobs, housing",
      "Community gathering posts only",
      "Posting frequency ~3 or fewer posts/week; each event posted no more than twice",
      "Be kind; no hate speech/bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/whatsupsebastopol",
  },
  {
    name: "Sebastopol Families",
    memberCount: 4500,
    focus: "Public - Sebastopol families/events",
    postingRequirements: [
      "Current Sebastopol events; memories/pictures of Sebastopol",
      "Be kind; no hate speech/bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/495180572362772",
  },
  {
    name: "Sebastopol and West County Bargains",
    memberCount: 5900,
    focus: "Private - Bargains/buy-sell",
    postingRequirements: [
      "No detailed rules listed",
      "About note: no animals for sale",
    ],
    joinUrl: "https://www.facebook.com/groups/277733239080609",
  },
  {
    name: "Sebastopol, California Buy and Sell Page",
    memberCount: 4000,
    focus: "Private - Buy/sell",
    postingRequirements: [
      "Self-promotion not allowed (no promotions or spam)",
      "Be kind; no hate speech/bullying; respect privacy",
    ],
    joinUrl: "https://www.facebook.com/groups/1382261532054763",
  },
  {
    name: "Sebastopol Women Entrepreneurs",
    memberCount: 285,
    focus: "Public - Women entrepreneurs - small/low activity (~8 posts/month)",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/SEBWE",
  },
  {
    name: "Santa Rosa, CA Community Page",
    memberCount: 29000,
    focus: "Public - Santa Rosa community - one of the largest on the list",
    postingRequirements: [
      "Self-promo only on the weekly self-promotion thread (must reply to 2 other comments there)",
      "Keep it local to Santa Rosa CA; be kind; no hate speech/bullying",
      "Must have a profile picture; no AI posts/images; no posts about minors; no puppies for sale",
    ],
    joinUrl: "https://www.facebook.com/groups/santarosacommunity",
  },
  {
    name: "Santa Rosa Foodie Group",
    memberCount: 632,
    focus: "Public - Santa Rosa food - small",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/424879426744837",
  },
  {
    name: "Santa Rosa California",
    memberCount: 901,
    focus: "Public - Santa Rosa general - small",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/289214245041396",
  },
  {
    name: "Sonoma County Community",
    memberCount: 2100,
    focus: "Public - Community/flea market - very active (~73 posts/day)",
    postingRequirements: [
      "No hate speech/bullying",
      "No inappropriate content",
    ],
    joinUrl: "https://www.facebook.com/groups/fleamarketinsonomacounty",
  },
  {
    name: "Russian River Resources And Information",
    memberCount: 9800,
    focus: "Public - West County resources",
    postingRequirements: [
      "Business posts limited to 1/week (delete expired posts)",
      "Posts must pertain to West Sonoma County",
      "No bashing local businesses; be kind; no hate speech/bullying",
      "Local politics only / no party bashing; light banter only",
    ],
    joinUrl: "https://www.facebook.com/groups/russianriverresourcesandinformation",
  },
  {
    name: "Residents and Fans of Guerneville, California",
    memberCount: 849,
    focus: "Public - Guerneville community - small",
    postingRequirements: ["Be kind; no hate speech/bullying; respect privacy"],
    joinUrl: "https://www.facebook.com/groups/1176791424171087",
  },
  {
    name: "Guerneville Locals!!!",
    memberCount: 5900,
    focus: "Private - Guerneville locals - residency required",
    postingRequirements: [
      "Local-residency requirement: must live in or own a home in the area",
      "No name calling/profanity; no non-local posts/spam",
    ],
    joinUrl: "https://www.facebook.com/groups/286589061778538",
  },
  {
    name: "Guerneville - Up With Downtown",
    memberCount: 4100,
    focus: "Public - Guerneville downtown",
    postingRequirements: [
      "Be kind; no hate speech/bullying; no gossip/rumor/shaming",
      "Keep on point; no bashing (auto removal); verify before posting",
      "Admins may remove posts without explanation",
    ],
    joinUrl: "https://www.facebook.com/groups/136633536400878",
  },
  {
    name: "Forestville CA & Local Families",
    memberCount: 1800,
    focus: "Private - Forestville families - promotion restricted",
    postingRequirements: [
      "Promotion restricted: no solicitation",
      "No politics; no GoFundMe",
      "Be kind; no hate speech/bullying; respect privacy",
    ],
    joinUrl: "https://www.facebook.com/groups/3937487052963143",
  },
  {
    name: "Petaluma: I Love Petaluma! (ILP!)",
    memberCount: 12700,
    focus: "Private - Petaluma community - promo one day/month only",
    postingRequirements: [
      "Promo only on the last Saturday of each month using #PetalumaSBS (small business owners)",
      "Must answer join questions",
      "Ad-free otherwise: no spam/commercial/rehoming posts",
      "Family-friendly/no profanity; no religion/politics; no GoFundMe",
      "No DMing members for business",
    ],
    joinUrl: "https://www.facebook.com/groups/ilovepetaluma",
  },
  {
    name: "Petaluma Foodies",
    memberCount: 9000,
    focus: "Private - Petaluma food - very restrictive for promotion",
    postingRequirements: [
      "Restaurant owners limited to special events/one-offs only - no regular specials",
      "New members can't post/comment for 2 weeks",
      "Keep it local & food-related; contact a restaurant directly before any negative post",
      "No shaming; be cordial; no bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/petalumafoodies",
  },
  {
    name: "I Love Petaluma",
    memberCount: 7000,
    focus: "Public - Petaluma (distinct from the private ILP! group)",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/1936813656498218",
  },
  {
    name: "We Love All Petaluma",
    memberCount: 1700,
    focus: "Public - Petaluma",
    postingRequirements: [
      "Self-promotion not allowed (no promotions or spam)",
      "Keep it Petaluma-centric; no hate speech/bullying",
    ],
    joinUrl: "https://www.facebook.com/groups/797038810629205",
  },
  {
    name: "Hey Neighbor in Sonoma and Mendocino Counties",
    memberCount: 2400,
    focus: "Public - Sonoma & Mendocino - self-promo restricted",
    postingRequirements: [
      "Self-promo restricted (no promotions or spam)",
      "Be kind; no hate speech/bullying; respect privacy",
    ],
    joinUrl: "https://www.facebook.com/groups/heyneighborinsonomaandmendocinocounties",
  },
  {
    name: "Sonoma County helping Sonoma County. Buy, Sale, Ask, Talk",
    memberCount: 2300,
    focus: "Public - Buy/sell/ask/talk - self-promo restricted",
    postingRequirements: [
      "Self-promo restricted (no promotions or spam)",
      "Be kind; no hate speech/bullying; respect privacy",
    ],
    joinUrl: "https://www.facebook.com/groups/1609252422859677",
  },
  {
    name: "Best of Sonoma County Living!",
    memberCount: 1000,
    focus: "Public - Food & drink events, shopping - active (~29 posts/day)",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/bestofsonomacountyliving",
  },
  {
    name: "Sonoma County Happy Hour Hoppers Club",
    memberCount: 457,
    focus: "Public - Happy hours/specials - niche/low activity",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/484834114118250",
  },
  {
    name: "Sonoma County's Best Restaurant's!",
    memberCount: 70,
    focus: "Public - Restaurants - very small/nearly inactive (~5 posts/month)",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/381197628717745",
  },
  {
    name: "Sonoma County Food",
    memberCount: 12,
    focus: "Public - Food - brand new (created Jan 2026), essentially empty",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/1326617966148535",
  },
  {
    name: "Sonoma County Restaurant Professionals",
    memberCount: 9,
    focus: "Public - Industry/jobs - effectively dead; geared to jobs, not promotion",
    postingRequirements: ["No rules listed"],
    joinUrl: "https://www.facebook.com/groups/660112877779091",
  },
];

const admin = createClient(url, key, { auth: { persistSession: false } });

// Guard: don't clobber existing data unless --force.
const { count, error: countErr } = await admin
  .from(TABLE)
  .select("id", { count: "exact", head: true });

if (countErr) {
  console.error("Table check failed:", countErr.message);
  console.error("Has the table been created? Run the CREATE TABLE SQL in Supabase first.");
  process.exit(1);
}

if (count && count > 0) {
  if (!force) {
    console.error(`Table already has ${count} row(s). Refusing to seed (pass --force to wipe + reseed).`);
    process.exit(1);
  }
  console.log(`--force: deleting ${count} existing row(s)...`);
  const { error: delErr } = await admin.from(TABLE).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) {
    console.error("Delete failed:", delErr.message);
    process.exit(1);
  }
}

// Stagger created_at so insertion order is preserved on the page.
const base = new Date("2026-06-06T12:00:00Z").getTime();
const rows = groups.map((g, i) => ({
  name: g.name,
  member_count: g.memberCount,
  focus: g.focus,
  posting_requirements: g.postingRequirements,
  join_url: g.joinUrl,
  created_at: new Date(base + i * 60000).toISOString(),
}));

const { error: insErr } = await admin.from(TABLE).insert(rows);
if (insErr) {
  console.error("Insert failed:", insErr.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} groups into ${TABLE}.`);
