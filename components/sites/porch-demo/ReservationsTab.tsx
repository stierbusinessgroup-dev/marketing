"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number; name?: string }>;
};

import { cn } from "@/lib/utils";
import {
  tonightsReservations,
  coversSummary,
  weekAheadCovers,
} from "@/lib/porch-demo-data";
import type { ReservationNote } from "@/lib/porch-demo-data";

// ─── Note pill ────────────────────────────────────────────────────────────────

const notePillStyles: Record<Exclude<ReservationNote, "">, string> = {
  VIP:         "bg-purple-50 text-purple-800 border border-purple-200",
  Allergy:     "bg-red-50    text-red-800    border border-red-200",
  Anniversary: "bg-pink-50   text-pink-800   border border-pink-200",
  Birthday:    "bg-amber-50  text-amber-800  border border-amber-200",
};

function NotePill({ note }: { note: ReservationNote }) {
  if (!note) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        notePillStyles[note]
      )}
    >
      {note}
    </span>
  );
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────

function CoversTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">{payload[0]?.value} covers</p>
    </div>
  );
}

// ─── Derived ──────────────────────────────────────────────────────────────────

const tonightTotal = coversSummary.dinnerCovers + coversSummary.walkInBuffer;

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function ReservationsTab() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-2">Tonight&apos;s Booked Covers</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            {coversSummary.dinnerCovers}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {tonightsReservations.length} reservations
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="eyebrow mb-2 text-amber-700">Walk-in Buffer</p>
          <p className="font-serif text-3xl tracking-tight text-amber-900">
            ~{coversSummary.walkInBuffer}
          </p>
          <p className="text-xs text-amber-700/70 mt-1">Est. walk-ins tonight</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="eyebrow mb-2 text-emerald-700">Total Tonight</p>
          <p className="font-serif text-3xl tracking-tight text-emerald-900">
            ~{tonightTotal}
          </p>
          <p className="text-xs text-emerald-700/70 mt-1">Projected total covers</p>
        </div>
      </div>

      {/* Week-ahead chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="eyebrow mb-1">Week Ahead</p>
        <p className="font-serif text-xl tracking-tight text-foreground mb-4">
          Covers by day
        </p>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weekAheadCovers}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="oklch(0.9 0 0)"
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CoversTooltip />}
                cursor={{ fill: "oklch(0.97 0 0)" }}
              />
              <Bar dataKey="covers" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reservation list */}
      <div className="rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm min-w-[580px]">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 eyebrow">Time</th>
              <th className="text-left px-4 py-3 eyebrow">Name</th>
              <th className="text-center px-4 py-3 eyebrow">Party</th>
              <th className="text-left px-4 py-3 eyebrow">Note</th>
              <th className="text-left px-4 py-3 eyebrow hidden sm:table-cell">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tonightsReservations.map((res) => (
              <tr
                key={res.id}
                className={cn(
                  "transition-colors",
                  res.note === "VIP" ? "bg-purple-50/30" : "hover:bg-muted/20"
                )}
              >
                <td className="px-4 py-3.5 font-medium text-foreground/90 whitespace-nowrap tabular-nums">
                  {res.time}
                </td>
                <td className="px-4 py-3.5 font-medium text-foreground/90 whitespace-nowrap">
                  {res.name}
                </td>
                <td className="px-4 py-3.5 text-center text-muted-foreground tabular-nums">
                  {res.partySize}
                </td>
                <td className="px-4 py-3.5">
                  <NotePill note={res.note} />
                </td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground hidden sm:table-cell max-w-[220px] truncate">
                  {res.noteDetail}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-muted/20">
              <td
                colSpan={2}
                className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Total booked
              </td>
              <td className="px-4 py-3 text-center font-semibold text-foreground tabular-nums">
                {coversSummary.dinnerCovers}
              </td>
              <td colSpan={2} className="px-4 py-3 text-xs text-muted-foreground">
                covers
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
