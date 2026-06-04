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
import { cateringEvents, cateringBarData } from "@/lib/porch-demo-data";
import type { CateringStatus } from "@/lib/porch-demo-data";

// ─── Catering status pill ─────────────────────────────────────────────────────

const cateringPillStyles: Record<CateringStatus, string> = {
  Inquiry:   "bg-amber-50  text-amber-800  border border-amber-200",
  Confirmed: "bg-sky-50    text-sky-800    border border-sky-200",
  Complete:  "bg-emerald-50 text-emerald-800 border border-emerald-200",
};

function CateringPill({ status }: { status: CateringStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        cateringPillStyles[status]
      )}
    >
      {status}
    </span>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function CateringTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">${val.toLocaleString()}</p>
    </div>
  );
}

// ─── Derived totals ───────────────────────────────────────────────────────────

const totalRevenue = cateringEvents.reduce((sum, e) => sum + e.revenue, 0);
const confirmedRevenue = cateringEvents
  .filter((e) => e.status === "Confirmed" || e.status === "Complete")
  .reduce((sum, e) => sum + e.revenue, 0);

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function CateringTab() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-2">Pipeline Revenue</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Across {cateringEvents.length} events
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="eyebrow mb-2 text-emerald-700">Confirmed Revenue</p>
          <p className="font-serif text-3xl tracking-tight text-emerald-900">
            ${confirmedRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-700/70 mt-1">Booked &amp; complete</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="eyebrow mb-2 text-amber-700">Open Inquiries</p>
          <p className="font-serif text-3xl tracking-tight text-amber-900">
            {cateringEvents.filter((e) => e.status === "Inquiry").length}
          </p>
          <p className="text-xs text-amber-700/70 mt-1">Pending confirmation</p>
        </div>
      </div>

      {/* Revenue by event */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="eyebrow mb-1">Revenue by Event</p>
        <p className="font-serif text-xl tracking-tight text-foreground mb-4">
          Catering pipeline
        </p>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={cateringBarData}
              margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="oklch(0.9 0 0)"
              />
              <XAxis
                dataKey="client"
                tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                content={<CateringTooltip />}
                cursor={{ fill: "oklch(0.97 0 0)" }}
              />
              <Bar dataKey="revenue" fill="#78716c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 eyebrow">Date</th>
              <th className="text-left px-4 py-3 eyebrow">Client</th>
              <th className="text-left px-4 py-3 eyebrow">Guests</th>
              <th className="text-left px-4 py-3 eyebrow">Status</th>
              <th className="text-right px-4 py-3 eyebrow">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cateringEvents.map((event) => (
              <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                  {event.date}
                </td>
                <td className="px-4 py-3.5 font-medium text-foreground/90">
                  {event.client}
                </td>
                <td className="px-4 py-3.5 tabular-nums text-muted-foreground">
                  {event.headcount}
                </td>
                <td className="px-4 py-3.5">
                  <CateringPill status={event.status} />
                </td>
                <td className="px-4 py-3.5 tabular-nums text-right font-medium text-foreground/80">
                  ${event.revenue.toLocaleString()}
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
                Total pipeline
              </td>
              <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                ${totalRevenue.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
