"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ExternalLink, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const CHECKS_KEY = "porch-playbook-checks";

// ─── Checklist data ─────────────────────────────────────────────────────────

type ChecklistItem = { id: string; label: string };
type Phase = { title: string; blurb: string; items: ChecklistItem[] };

const PHASES: Phase[] = [
  {
    title: "Phase 0 — Foundation: own your listings (do this FIRST)",
    blurb:
      "Listings feed directly into search visibility. Nothing else performs well until these are claimed, accurate, and active. All free.",
    items: [
      { id: "gbp", label: "Claim & verify Google Business Profile (controls Maps/Search; add hours, menu link, photos)" },
      { id: "yelp", label: "Claim the Yelp business page; add photos, hours, menu" },
      { id: "tripadvisor", label: "Claim the TripAdvisor listing (matters in wine country / tourist traffic)" },
      { id: "listings-current", label: "Keep photos, hours, and menu current across all three" },
      { id: "reviews", label: "Respond to reviews consistently — review activity boosts search ranking" },
    ],
  },
  {
    title: "Phase 1 — Local presence: claim channels & start the habits",
    blurb: "Get the local channels live and lock in the posting habits.",
    items: [
      { id: "nextdoor", label: "Claim the free Nextdoor Business Page (business.nextdoor.com) — reaches verified local residents" },
      { id: "nextdoor-deals", label: "Set up Nextdoor Local Deals (neighborhood-targeted specials)" },
      { id: "nextdoor-recs", label: "Encourage neighbor recommendations (word-of-mouth that resurfaces in feeds)" },
      { id: "eventbrite", label: "Create an Eventbrite organizer; list tastings, events, opening night" },
      { id: "ig-follow", label: "Follow & engage @biteclubeats, @sonomacountyfoodblog, @sonomamag" },
      { id: "ig-tag", label: 'Tag location "Sebastopol, Ca" and "The Porch" on every post' },
      { id: "ig-hashtags", label: "Use the canonical hashtag block (below) on local posts" },
      { id: "chamber", label: "Join the Sebastopol Chamber of Commerce" },
      { id: "downtown", label: "Join the Sebastopol Downtown Association" },
    ],
  },
  {
    title: "Phase 2 — Outreach: earn local press (time-sensitive)",
    blurb:
      "A new opening has a narrow press window and awards seasons are calendar-bound. One feature gets shared across all of an outlet's channels.",
    items: [
      { id: "pitch-irwin", label: "Email Heather Irwin (@biteclubeats) an intro pitch — the most influential food gatekeeper in the county (use the template below)" },
      { id: "press-democrat", label: 'Get onto the Press Democrat "New and upcoming restaurants" roundup' },
      { id: "tourism", label: "Get listed with Sonoma County Tourism (sonomacounty.com); pitch chef picks / guides" },
      { id: "sonoma-com", label: "Get a Sonoma.com restaurant-guide listing" },
      { id: "seb-times", label: "Pitch the Sebastopol Times a new-opening mention" },
      { id: "sonoma-mag", label: 'Angle for Sonoma Magazine lists ("Best New Restaurants", "Most Instagrammable")' },
      { id: "bohemian-biz", label: "Pitch North Bay Bohemian and NorthBay biz" },
      { id: "best-of", label: "Get nominated for Best of Sonoma County; rally customers to vote when the window opens" },
    ],
  },
  {
    title: "Phase 3 — Ongoing & in-store",
    blurb: "Keep the flywheel turning once the foundation is set.",
    items: [
      { id: "table-card", label: "Table card / QR code making it easy for customers to tag you + leave reviews" },
      { id: "reddit", label: "Be a helpful, non-spammy presence in r/sonoma and r/santarosa" },
      { id: "restaurant-week", label: "Participate in Sonoma County Restaurant Week when the window opens" },
    ],
  },
];

const ALL_IDS = PHASES.flatMap((p) => p.items.map((i) => i.id));

const HASHTAGS =
  "#sebastopoleats #sonomacounty #sonomacountyeats #sonomacountyfoodie #santarosaeats #petalumaeats #winecountry #sonomacountyfoodblog";

const PITCH_TEMPLATE = `To: Heather Irwin (email listed at the bottom of her Press Democrat / Sonoma Magazine articles)
Subject: New in Sebastopol — The Porch (quick intro + an invitation)

Hi Heather,

I wanted to introduce The Porch, a new dine-in restaurant that just opened in Sebastopol from the team behind The Cook & The Drummer, led by chef-owner Lisa Boisset.

[One or two sentences on the concept — what makes it distinctive: the food, the room, the local sourcing, the story.]

I know you're the person Sonoma County turns to for where to eat, and I'd love for you to experience it firsthand. Could I host you for a meal at a time that works for you? No expectations — I'd just be glad to have you in.

Happy to send our menu, photos, and opening details if useful.

Warmly,
[Your name]
The Porch · [address] · [phone] · [website / Instagram @handle]`;

// ─── Directories ────────────────────────────────────────────────────────────

const IG_ACCOUNTS: { handle: string; who: string }[] = [
  { handle: "@biteclubeats", who: "Heather Irwin — Dining Editor, Sonoma Magazine + Press Democrat" },
  { handle: "@sonomacountyfoodblog", who: "Local foodie account that features restaurants" },
  { handle: "@sonomamag", who: "Sonoma Magazine" },
];

const MEDIA: { name: string; url: string; target: string }[] = [
  { name: "Press Democrat", url: "https://www.pressdemocrat.com", target: 'New/upcoming roundups; Best of Sonoma awards (pressdemocrat.com/best)' },
  { name: "Sonoma Magazine", url: "https://www.sonomamag.com", target: '"Best New Restaurants", "Most Instagrammable"' },
  { name: "Sonoma County Tourism", url: "https://www.sonomacounty.com", target: "Guides, chef picks, business listing" },
  { name: "Sonoma.com", url: "https://www.sonoma.com", target: "Restaurant guide listing" },
  { name: "North Bay Bohemian", url: "https://bohemian.com", target: "Alt-weekly dining coverage" },
  { name: "NorthBay biz", url: "https://www.northbaybiz.com", target: "Local business monthly" },
];

const ORGS: { name: string; use: string }[] = [
  { name: "Sebastopol Chamber of Commerce", use: "Top cross-promo partner — join" },
  { name: "Sebastopol Downtown Association", use: "Top cross-promo partner — join" },
  { name: "Visit Sebastopol", use: "Listing / visitor guides" },
  { name: "Sebastopol Times", use: "New-opening mention" },
  { name: "City of Sebastopol", use: "Follow / community calendar" },
  { name: "Sebastopol Community Cultural Center", use: "Events / partnerships" },
  { name: "Gather Sebastopol", use: "New local hub — follow / partner" },
];

const STRATEGIES: string[] = [
  "Partner with nearby wineries & tasting rooms — wine-country diners move between dining and tasting constantly (highest-fit partnership).",
  "Cross-refer with breweries, hotels, and local Airbnbs whose guests need where to eat.",
  "Invite local food bloggers/influencers for a tasting visit — one good repost outperforms dozens of self-posts.",
  "Layer in countywide programs (Restaurant Week, Best of Sonoma awards) when their windows open.",
  "Make tags & reviews frictionless with the table card / QR; ask at the right moment.",
];

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted"
    >
      {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ─── Section heading ────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 font-serif text-2xl tracking-tight text-foreground">{children}</h2>;
}

// ─── Tab ──────────────────────────────────────────────────────────────────────

export function PlaybookTab() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  // Load saved checks after mount (avoids hydration mismatch — first render is empty).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHECKS_KEY);
      if (raw) setChecked(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
  }, []);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(CHECKS_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const doneCount = ALL_IDS.filter((id) => checked.has(id)).length;
  const pct = Math.round((doneCount / ALL_IDS.length) * 100);

  return (
    <div className="space-y-12">
      {/* Intro + progress */}
      <div>
        <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Marketing playbook</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A do-this-in-order plan for building local visibility. Work top to bottom — the
          foundation phases make every later campaign more effective. Your checkmarks save
          in this browser.
        </p>
        <div className="mt-5 max-w-md">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="tabular-nums">
              {doneCount} / {ALL_IDS.length} ({pct}%)
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist */}
      <section className="space-y-8">
        {PHASES.map((phase) => (
          <div key={phase.title}>
            <h3 className="font-serif text-xl tracking-tight text-foreground">{phase.title}</h3>
            <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">{phase.blurb}</p>
            <ul className="space-y-1.5">
              {phase.items.map((item) => {
                const isDone = checked.has(item.id);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3.5 text-left transition-colors hover:bg-muted/40"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                          isDone
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background"
                        )}
                      >
                        {isDone && <Check className="size-3.5" />}
                      </span>
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          isDone ? "text-muted-foreground line-through" : "text-foreground/90"
                        )}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      {/* Hashtags */}
      <section>
        <SectionHeading>Hashtags — copy &amp; paste</SectionHeading>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">Use on local posts. Plus tag &quot;Sebastopol, Ca&quot; and &quot;The Porch&quot;.</p>
            <CopyButton text={HASHTAGS} label="Copy hashtags" />
          </div>
          <p className="rounded-md bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground/90">
            {HASHTAGS}
          </p>
        </div>
      </section>

      {/* Pitch template */}
      <section>
        <SectionHeading>Pitch template — dining editor</SectionHeading>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="size-3.5" />
              Review &amp; personalize the [bracketed] parts before sending.
            </p>
            <CopyButton text={PITCH_TEMPLATE} label="Copy pitch" />
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-muted/50 p-4 font-sans text-sm leading-relaxed text-foreground/90">
            {PITCH_TEMPLATE}
          </pre>
        </div>
      </section>

      {/* Networking strategies */}
      <section>
        <SectionHeading>Networking strategies</SectionHeading>
        <ul className="space-y-2.5">
          {STRATEGIES.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Reference directories */}
      <section className="space-y-8">
        <SectionHeading>Reference</SectionHeading>

        <div>
          <p className="eyebrow mb-3">Instagram — follow &amp; tag</p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {IG_ACCOUNTS.map((a) => (
              <div key={a.handle} className="rounded-lg border border-border bg-card p-3.5">
                <p className="font-medium text-foreground/90">{a.handle}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.who}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">Media &amp; publications</p>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {MEDIA.map((m) => (
                  <tr key={m.name} className="hover:bg-muted/30">
                    <td className="px-4 py-3 align-top">
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80"
                      >
                        {m.name}
                        <ExternalLink className="size-3" aria-hidden />
                      </a>
                    </td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{m.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">Sebastopol organizations</p>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {ORGS.map((o) => (
                  <tr key={o.name} className="hover:bg-muted/30">
                    <td className="px-4 py-3 align-top font-medium text-foreground/90">{o.name}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{o.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
