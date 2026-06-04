"use client";

import { cn } from "@/lib/utils";
import { staffRoster, laborSummary } from "@/lib/porch-demo-data";
import type { ShiftSlot, StaffRole } from "@/lib/porch-demo-data";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = (typeof DAYS)[number];

// ─── Shift pill ───────────────────────────────────────────────────────────────

const shiftStyles: Record<ShiftSlot, string> = {
  AM:  "bg-amber-50  text-amber-800  border border-amber-200",
  PM:  "bg-sky-50    text-sky-800    border border-sky-200",
  Off: "bg-muted/40  text-muted-foreground border border-transparent",
};

function ShiftPill({ slot }: { slot: ShiftSlot }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[11px] font-medium w-10",
        shiftStyles[slot]
      )}
    >
      {slot}
    </span>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

const roleColors: Record<StaffRole, string> = {
  "Sous Chef":              "text-purple-700",
  "Line Cook":              "text-orange-700",
  "Server":                 "text-sky-700",
  "Host":                   "text-teal-700",
  "Dishwasher":             "text-slate-600",
  "Bartender (Beer & Wine)":"text-amber-700",
};

// ─── Derived ──────────────────────────────────────────────────────────────────

const laborPct =
  (laborSummary.estLaborCost / laborSummary.weeklyRevTarget) * 100;

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function SchedulingTab() {
  return (
    <div className="space-y-8">
      {/* Labor summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-2">Scheduled Hrs</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            {laborSummary.totalScheduledHrs}
          </p>
          <p className="text-xs text-muted-foreground mt-1">This week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-2">Est. Labor Cost</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            ${laborSummary.estLaborCost.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Blended wages</p>
        </div>
        <div
          className={cn(
            "rounded-xl border p-5",
            laborPct <= laborSummary.laborTargetPct
              ? "border-emerald-200 bg-emerald-50"
              : "border-amber-200 bg-amber-50"
          )}
        >
          <p
            className={cn(
              "eyebrow mb-2",
              laborPct <= laborSummary.laborTargetPct ? "text-emerald-700" : "text-amber-700"
            )}
          >
            Labor %
          </p>
          <p
            className={cn(
              "font-serif text-3xl tracking-tight",
              laborPct <= laborSummary.laborTargetPct ? "text-emerald-900" : "text-amber-900"
            )}
          >
            {laborPct.toFixed(1)}%
          </p>
          <p
            className={cn(
              "text-xs mt-1",
              laborPct <= laborSummary.laborTargetPct
                ? "text-emerald-700/70"
                : "text-amber-700/70"
            )}
          >
            Target: {laborSummary.laborTargetPct}%
          </p>
        </div>
        <div
          className={cn(
            "rounded-xl border p-5",
            laborSummary.openShifts > 0 ? "border-red-200 bg-red-50" : "border-border bg-card"
          )}
        >
          <p
            className={cn(
              "eyebrow mb-2",
              laborSummary.openShifts > 0 ? "text-red-700" : ""
            )}
          >
            Open Shifts
          </p>
          <p
            className={cn(
              "font-serif text-3xl tracking-tight",
              laborSummary.openShifts > 0 ? "text-red-900" : "text-foreground"
            )}
          >
            {laborSummary.openShifts}
          </p>
          <p
            className={cn(
              "text-xs mt-1",
              laborSummary.openShifts > 0 ? "text-red-700/70" : "text-muted-foreground"
            )}
          >
            {laborSummary.openShifts > 0 ? "Needs coverage" : "Fully covered"}
          </p>
        </div>
      </div>

      {/* Shift grid */}
      <div className="rounded-xl border border-border overflow-x-auto">
        <div className="min-w-[640px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 eyebrow w-40">Staff</th>
                <th className="text-left px-4 py-3 eyebrow w-28">Role</th>
                {DAYS.map((d) => (
                  <th key={d} className="text-center px-2 py-3 eyebrow">{d}</th>
                ))}
                <th className="text-right px-4 py-3 eyebrow">Hrs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staffRoster.map((member) => (
                <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-foreground/90 whitespace-nowrap">
                    {member.name}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={cn("text-xs font-medium", roleColors[member.role])}>
                      {member.role}
                    </span>
                  </td>
                  {DAYS.map((d) => (
                    <td key={d} className="px-2 py-3 text-center">
                      <ShiftPill slot={member.schedule[d as Day]} />
                    </td>
                  ))}
                  <td className="px-4 py-3.5 text-right tabular-nums text-muted-foreground font-medium">
                    {member.hoursThisWeek}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium text-foreground/70">Shift key:</span>
        {(["AM", "PM", "Off"] as ShiftSlot[]).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <ShiftPill slot={s} />
            <span>{s === "AM" ? "Morning (7am–3pm)" : s === "PM" ? "Evening (3pm–close)" : "Day off"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
