"use client";

import { useState } from "react";
import { FileText, Users, CheckCircle2, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { proposals, sampleProposal } from "@/lib/porch-demo-data";
import type { ProposalStatus } from "@/lib/porch-demo-data";

// ─── Status pill ──────────────────────────────────────────────────────────────

const proposalPillStyles: Record<ProposalStatus, string> = {
  Draft:    "bg-muted    text-muted-foreground border border-border",
  Sent:     "bg-sky-50   text-sky-800          border border-sky-200",
  Accepted: "bg-emerald-50 text-emerald-800    border border-emerald-200",
  Declined: "bg-red-50   text-red-700          border border-red-200",
};

function ProposalPill({ status }: { status: ProposalStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        proposalPillStyles[status]
      )}
    >
      {status}
    </span>
  );
}

// ─── Derived summary stats ────────────────────────────────────────────────────

const openProposals = proposals.filter(
  (p) => p.status === "Sent" || p.status === "Draft"
);
const acceptedThisMonth = proposals.filter((p) => p.status === "Accepted");
const closedProposals = proposals.filter(
  (p) => p.status === "Accepted" || p.status === "Declined"
);
const winRate =
  closedProposals.length > 0
    ? Math.round((acceptedThisMonth.length / closedProposals.length) * 100)
    : 0;
const openValue = openProposals.reduce((sum, p) => sum + p.value, 0);
const acceptedValue = acceptedThisMonth.reduce((sum, p) => sum + p.value, 0);

// ─── Sample proposal preview component ───────────────────────────────────────

function SampleProposalPreview() {
  // Compute totals from line items
  const subtotalFood = sampleProposal.lineItems.reduce(
    (sum, li) => sum + li.units * li.ratePerUnit,
    0
  );
  const serviceCharge = Math.round(subtotalFood * (sampleProposal.servicePct / 100));
  const total = subtotalFood + serviceCharge;

  // Group menu items by category
  const menuByCategory = sampleProposal.menu.reduce<Record<string, string[]>>(
    (acc, mi) => {
      if (!acc[mi.category]) acc[mi.category] = [];
      acc[mi.category].push(mi.item);
      return acc;
    },
    {}
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Proposal letterhead */}
      <div className="bg-foreground/[0.03] border-b border-border px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">Catering Proposal</p>
          <p className="font-serif text-2xl tracking-tight text-foreground">
            {sampleProposal.event}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {sampleProposal.client} &nbsp;&middot;&nbsp; {sampleProposal.contactName}
          </p>
        </div>
        <div className="text-xs text-muted-foreground text-left sm:text-right shrink-0 space-y-0.5">
          <p className="font-medium text-foreground/80">{sampleProposal.preparedBy}</p>
          <p>Prepared {sampleProposal.preparedDate}</p>
        </div>
      </div>

      <div className="px-6 py-5 space-y-6">
        {/* Event details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/40 px-4 py-3">
            <p className="eyebrow text-[10px] mb-1">Event Date</p>
            <p className="text-sm font-medium text-foreground/90">
              {sampleProposal.eventDate}
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 px-4 py-3">
            <p className="eyebrow text-[10px] mb-1">Guest Count</p>
            <p className="text-sm font-medium text-foreground/90">
              {sampleProposal.guests} guests
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 px-4 py-3">
            <p className="eyebrow text-[10px] mb-1">Service Style</p>
            <p className="text-sm font-medium text-foreground/90">
              Family-style dinner
            </p>
          </div>
        </div>

        {/* Proposed menu */}
        <div>
          <p className="eyebrow mb-3">Proposed Menu</p>
          <div className="space-y-3">
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  {category}
                </p>
                <ul className="space-y-1 pl-0">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-foreground/80 flex items-start gap-2"
                    >
                      <span className="mt-1.5 size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing table */}
        <div>
          <p className="eyebrow mb-3">Pricing Breakdown</p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-2.5 eyebrow text-[10px]">Description</th>
                  <th className="text-right px-4 py-2.5 eyebrow text-[10px] hidden sm:table-cell">Units</th>
                  <th className="text-right px-4 py-2.5 eyebrow text-[10px] hidden sm:table-cell">Rate</th>
                  <th className="text-right px-4 py-2.5 eyebrow text-[10px]">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sampleProposal.lineItems.map((li, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-foreground/80">{li.description}</td>
                    <td className="px-4 py-3 tabular-nums text-right text-muted-foreground hidden sm:table-cell">
                      {li.units} {li.unitLabel}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-right text-muted-foreground hidden sm:table-cell">
                      ${li.ratePerUnit}/ea
                    </td>
                    <td className="px-4 py-3 tabular-nums text-right font-medium text-foreground/80">
                      ${(li.units * li.ratePerUnit).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/10">
                  <td colSpan={3} className="px-4 py-2.5 text-xs text-muted-foreground">
                    Subtotal
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-right text-muted-foreground text-xs">
                    ${subtotalFood.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-t border-border bg-muted/10">
                  <td colSpan={3} className="px-4 py-2.5 text-xs text-muted-foreground">
                    Service charge ({sampleProposal.servicePct}%)
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-right text-muted-foreground text-xs">
                    ${serviceCharge.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-t-2 border-border bg-muted/30">
                  <td colSpan={3} className="px-4 py-3 font-semibold text-foreground">
                    Total
                  </td>
                  <td className="px-4 py-3 tabular-nums text-right font-bold text-foreground">
                    ${total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground/60 tabular-nums text-right">
            ${(total / sampleProposal.guests).toFixed(0)} per guest all-in
          </p>
        </div>

        {/* Footer terms */}
        <div className="rounded-lg bg-muted/30 border border-border px-4 py-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {sampleProposal.footer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function ProposalsTab() {
  const [draftStarted, setDraftStarted] = useState(false);
  const [showProposal, setShowProposal] = useState(true);

  return (
    <div className="space-y-8">
      {/* Summary stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-amber-700 shrink-0" aria-hidden />
            <p className="eyebrow text-amber-700">Open Proposals</p>
          </div>
          <p className="font-serif text-3xl tracking-tight text-amber-900">
            ${openValue.toLocaleString()}
          </p>
          <p className="text-xs text-amber-700/70">
            {openProposals.length} proposals pending
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-700 shrink-0" aria-hidden />
            <p className="eyebrow text-emerald-700">Accepted This Month</p>
          </div>
          <p className="font-serif text-3xl tracking-tight text-emerald-900">
            ${acceptedValue.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-700/70">
            {acceptedThisMonth.length} proposal{acceptedThisMonth.length !== 1 ? "s" : ""} won
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-foreground/60 shrink-0" aria-hidden />
            <p className="eyebrow">Win Rate</p>
          </div>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            {winRate}%
          </p>
          <p className="text-xs text-muted-foreground">
            Based on {closedProposals.length} closed proposals
          </p>
        </div>
      </div>

      {/* Pipeline table + New Proposal button */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="eyebrow mb-0.5">Proposal Pipeline</p>
            <p className="font-serif text-xl tracking-tight text-foreground">
              Active &amp; recent proposals
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDraftStarted(true)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors shrink-0",
              draftStarted
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default"
                : "bg-foreground text-background hover:bg-foreground/85 border border-transparent"
            )}
            disabled={draftStarted}
          >
            {draftStarted ? (
              <>
                <CheckCircle2 className="size-4" aria-hidden />
                Draft started
              </>
            ) : (
              <>
                <FileText className="size-4" aria-hidden />
                New proposal
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 eyebrow">Event</th>
                <th className="text-left px-4 py-3 eyebrow hidden sm:table-cell">Client</th>
                <th className="text-left px-4 py-3 eyebrow">Date</th>
                <th className="text-right px-4 py-3 eyebrow hidden md:table-cell">Guests</th>
                <th className="text-right px-4 py-3 eyebrow">Value</th>
                <th className="text-left px-4 py-3 eyebrow">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {proposals.map((p) => (
                <tr
                  key={p.id}
                  className={cn(
                    "transition-colors",
                    p.status === "Declined"
                      ? "opacity-50 hover:opacity-70"
                      : "hover:bg-muted/30"
                  )}
                >
                  <td className="px-4 py-3.5 font-medium text-foreground/90">
                    {p.event}
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                    {p.client}
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                    {p.date}
                  </td>
                  <td className="px-4 py-3.5 tabular-nums text-right text-muted-foreground hidden md:table-cell">
                    {p.guests}
                  </td>
                  <td className="px-4 py-3.5 tabular-nums text-right font-medium text-foreground/80 whitespace-nowrap">
                    ${p.value.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <ProposalPill status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-muted/20">
                <td
                  colSpan={4}
                  className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Pipeline total
                </td>
                <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                  $
                  {proposals
                    .reduce((sum, p) => sum + p.value, 0)
                    .toLocaleString()}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Sample proposal preview — collapsible */}
      <div>
        <button
          type="button"
          onClick={() => setShowProposal((v) => !v)}
          className="flex items-center gap-2 mb-4 group"
        >
          <div>
            <p className="eyebrow mb-0.5 text-left">Sample Proposal</p>
            <p className="font-serif text-xl tracking-tight text-foreground text-left group-hover:text-foreground/75 transition-colors">
              Harvest Winery Vineyard Dinner
            </p>
          </div>
          <div className="ml-auto shrink-0">
            {showProposal ? (
              <ChevronUp className="size-5 text-muted-foreground" aria-hidden />
            ) : (
              <ChevronDown className="size-5 text-muted-foreground" aria-hidden />
            )}
          </div>
        </button>

        {showProposal && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              This is the kind of polished proposal the tool generates for Kevin to send
              directly to the client — event details, full menu, and an itemized quote.
            </p>
            <SampleProposalPreview />
          </div>
        )}
      </div>
    </div>
  );
}
