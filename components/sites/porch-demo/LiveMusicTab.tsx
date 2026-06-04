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
import { Music, Star, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { musicActs, musicBookingsByMonth } from "@/lib/porch-demo-data";
import type { MusicActStatus } from "@/lib/porch-demo-data";

// ─── Status pill ──────────────────────────────────────────────────────────────

const musicPillStyles: Record<MusicActStatus, string> = {
  Inquiry:   "bg-amber-50  text-amber-800  border border-amber-200",
  Held:      "bg-violet-50 text-violet-800 border border-violet-200",
  Confirmed: "bg-sky-50    text-sky-800    border border-sky-200",
  Played:    "bg-emerald-50 text-emerald-800 border border-emerald-200",
};

function MusicPill({ status }: { status: MusicActStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        musicPillStyles[status]
      )}
    >
      {status}
    </span>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number }>;
};

function BookingsTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">
        {val} {val === 1 ? "booking" : "bookings"}
      </p>
    </div>
  );
}

// ─── Derived data ─────────────────────────────────────────────────────────────

const confirmedActs = musicActs.filter((a) => a.status === "Confirmed");
const nextUpAct = confirmedActs[0] ?? musicActs[0];
const confirmedCount = musicActs.filter((a) => a.status === "Confirmed").length;
const openInquiries = musicActs.filter((a) => a.status === "Inquiry" || a.status === "Held").length;
const totalFeesBooked = musicActs
  .filter((a) => a.status === "Confirmed" || a.status === "Played")
  .reduce((sum, a) => sum + a.fee, 0);

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function LiveMusicTab() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
          <p className="eyebrow mb-2 text-sky-700">Confirmed Nights</p>
          <p className="font-serif text-3xl tracking-tight text-sky-900">
            {confirmedCount}
          </p>
          <p className="text-xs text-sky-700/70 mt-1">On the calendar</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="eyebrow mb-2 text-amber-700">Open Inquiries</p>
          <p className="font-serif text-3xl tracking-tight text-amber-900">
            {openInquiries}
          </p>
          <p className="text-xs text-amber-700/70 mt-1">Inquiry or held</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-2">Fees Booked</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            ${totalFeesBooked.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Confirmed + played
          </p>
        </div>
      </div>

      {/* Next Up highlight card */}
      {nextUpAct && (
        <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/40 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-lg bg-amber-200/60 flex items-center justify-center shrink-0 mt-0.5">
              <Music className="size-5 text-amber-800" aria-hidden />
            </div>
            <div>
              <p className="eyebrow text-amber-700 mb-1">Next Up</p>
              <p className="font-serif text-xl tracking-tight text-amber-900">
                {nextUpAct.act}
              </p>
              <p className="text-sm text-amber-800/70 mt-0.5">
                {nextUpAct.genre} &nbsp;&middot;&nbsp; {nextUpAct.date}
              </p>
              {nextUpAct.note && (
                <p className="mt-2 text-xs text-amber-700/80 leading-relaxed max-w-sm">
                  {nextUpAct.note}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {nextUpAct.recurring && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/60 px-2.5 py-1 text-[11px] font-medium text-amber-800">
                <RefreshCw className="size-3" aria-hidden />
                Recurring
              </span>
            )}
            <MusicPill status={nextUpAct.status} />
          </div>
        </div>
      )}

      {/* Bookings-per-month mini bar */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="eyebrow mb-1">Bookings by Month</p>
        <p className="font-serif text-xl tracking-tight text-foreground mb-4">
          Live music pipeline
        </p>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={musicBookingsByMonth}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="oklch(0.9 0 0)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={<BookingsTooltip />}
                cursor={{ fill: "oklch(0.97 0 0)" }}
              />
              <Bar dataKey="bookings" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Acts table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 eyebrow">Act</th>
              <th className="text-left px-4 py-3 eyebrow">Genre</th>
              <th className="text-left px-4 py-3 eyebrow hidden md:table-cell">Contact</th>
              <th className="text-left px-4 py-3 eyebrow">Date</th>
              <th className="text-right px-4 py-3 eyebrow hidden sm:table-cell">Fee</th>
              <th className="text-left px-4 py-3 eyebrow">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {musicActs.map((act) => (
              <tr key={act.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-medium text-foreground/90 whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    {act.act}
                    {act.recurring && (
                      <Star
                        className="size-3 fill-amber-400 text-amber-400 shrink-0"
                        aria-label="Recurring"
                      />
                    )}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                  {act.genre}
                </td>
                <td className="px-4 py-3.5 text-muted-foreground hidden md:table-cell whitespace-nowrap">
                  {act.contact}
                </td>
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                  {act.date}
                </td>
                <td className="px-4 py-3.5 tabular-nums text-right font-medium text-foreground/80 hidden sm:table-cell whitespace-nowrap">
                  {act.fee === 0 ? (
                    <span className="text-muted-foreground italic text-xs">House act</span>
                  ) : (
                    `$${act.fee}`
                  )}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <MusicPill status={act.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend note */}
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" aria-hidden />
        Recurring act — booked on a regular basis by Kevin
      </p>
    </div>
  );
}
