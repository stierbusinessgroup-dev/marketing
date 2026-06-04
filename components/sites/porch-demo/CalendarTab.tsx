"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { monthEvents } from "@/lib/porch-demo-data";
import type { CalendarEvent, CalendarEventType } from "@/lib/porch-demo-data";

// ─── Calendar layout constants ────────────────────────────────────────────────
// June 2026: June 1 = Monday. In a Sun–Sat grid, Monday = column index 1.
// Leading blank cells: 1 (Sunday of that week).
// June 30 = Tuesday = column index 2. Trailing blank cells: 4 (Wed–Sat).

const JUNE_DAYS = 30;
const LEADING_BLANKS = 1;
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Event-type palette ───────────────────────────────────────────────────────

type TypeConfig = {
  label: string;
  chip: string;        // chip background + text
  dot: string;         // dot color for legend
};

const TYPE_CONFIG: Record<CalendarEventType, TypeConfig> = {
  milestone:   { label: "Opening / Milestone", chip: "bg-amber-500 text-white",          dot: "bg-amber-500" },
  catering:    { label: "Catering Event",       chip: "bg-violet-600 text-white",         dot: "bg-violet-600" },
  music:       { label: "Live Music",           chip: "bg-sky-500 text-white",            dot: "bg-sky-500" },
  reservation: { label: "Large Party / Res.",   chip: "bg-emerald-600 text-white",        dot: "bg-emerald-600" },
  staff:       { label: "Staff / Operations",   chip: "bg-slate-500 text-white",          dot: "bg-slate-500" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function eventsForDay(day: number): CalendarEvent[] {
  return monthEvents.filter((e) => e.day === day);
}

// Next N events from now (day 4, since today is June 4 2026 per system context)
const TODAY_DAY = 4;

const upcomingEvents: CalendarEvent[] = monthEvents
  .filter((e) => e.day >= TODAY_DAY)
  .sort((a, b) => a.day - b.day)
  .slice(0, 6);

// ─── Sub-components ───────────────────────────────────────────────────────────

function EventChip({ event, compact = false }: { event: CalendarEvent; compact?: boolean }) {
  const cfg = TYPE_CONFIG[event.type];
  const isMilestone = event.type === "milestone";
  return (
    <span
      className={cn(
        "flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-medium leading-tight truncate w-full",
        cfg.chip,
        isMilestone && "ring-1 ring-amber-300/60"
      )}
      title={event.time ? `${event.title} — ${event.time}` : event.title}
    >
      {isMilestone && (
        <Star className="size-2.5 shrink-0 fill-white text-white" aria-hidden />
      )}
      <span className="truncate">{compact ? event.title.split(" ")[0] : event.title}</span>
    </span>
  );
}

function DayCell({
  day,
  isSelected,
  onClick,
}: {
  day: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const events = eventsForDay(day);
  const isToday = day === TODAY_DAY;
  const hasOpeningDay = events.some((e) => e.type === "milestone");
  const CHIP_LIMIT = 2;
  const visible = events.slice(0, CHIP_LIMIT);
  const overflow = events.length - CHIP_LIMIT;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative min-h-[80px] sm:min-h-[96px] w-full text-left rounded-lg border p-1.5 sm:p-2 transition-all flex flex-col gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        hasOpeningDay
          ? "border-amber-300 bg-amber-50/60 shadow-sm"
          : isSelected
          ? "border-primary/40 bg-accent/60"
          : isToday
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:bg-muted/40 hover:border-border"
      )}
    >
      {/* Day number */}
      <span
        className={cn(
          "text-xs font-semibold leading-none mb-0.5 shrink-0",
          hasOpeningDay
            ? "text-amber-700"
            : isToday
            ? "text-primary"
            : "text-foreground/70"
        )}
      >
        {day}
        {isToday && (
          <span className="ml-1 text-[9px] font-medium text-primary/70 tracking-tight">today</span>
        )}
      </span>

      {/* Event chips */}
      <div className="flex flex-col gap-0.5 min-w-0 w-full">
        {visible.map((ev) => (
          <EventChip key={ev.id} event={ev} />
        ))}
        {overflow > 0 && (
          <span className="text-[10px] text-muted-foreground font-medium pl-0.5">
            +{overflow} more
          </span>
        )}
      </div>

      {/* Opening day star badge */}
      {hasOpeningDay && (
        <Star
          className="absolute top-1.5 right-1.5 size-3 fill-amber-400 text-amber-400"
          aria-hidden
        />
      )}
    </button>
  );
}

function DayDetailPanel({
  day,
  onClose,
}: {
  day: number | null;
  onClose: () => void;
}) {
  if (day === null) return null;
  const events = eventsForDay(day);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-4 sm:p-5 relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
        aria-label="Close day detail"
      >
        <X className="size-4 text-muted-foreground" aria-hidden />
      </button>

      <p className="eyebrow mb-1">June {day}, 2026</p>
      {events.length === 0 ? (
        <p className="text-sm text-muted-foreground italic mt-2">No events scheduled</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {events.map((ev) => {
            const cfg = TYPE_CONFIG[ev.type];
            return (
              <li key={ev.id} className="flex items-start gap-3">
                <span className={cn("mt-1 size-2 rounded-full shrink-0", cfg.dot)} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground/90 leading-snug">
                    {ev.title}
                    {ev.type === "milestone" && (
                      <Star className="inline-block ml-1 size-3 fill-amber-400 text-amber-400 align-middle" aria-hidden />
                    )}
                  </p>
                  {ev.time && (
                    <p className="text-xs text-muted-foreground mt-0.5">{ev.time}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5 capitalize">
                    {cfg.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Main exported tab ────────────────────────────────────────────────────────

export function CalendarTab() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  function handleDayClick(day: number) {
    setSelectedDay((prev) => (prev === day ? null : day));
  }

  // Build the full grid cells array: leading blanks + day cells
  const totalCells = LEADING_BLANKS + JUNE_DAYS;
  // Pad to a full week row if needed
  const trailingBlanks = (7 - (totalCells % 7)) % 7;

  return (
    <div className="space-y-8">

      {/* ── Legend ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {(Object.entries(TYPE_CONFIG) as [CalendarEventType, TypeConfig][]).map(
          ([, cfg]) => (
            <span key={cfg.label} className="flex items-center gap-1.5 text-xs text-foreground/70">
              <span className={cn("size-2.5 rounded-full shrink-0", cfg.dot)} />
              {cfg.label}
            </span>
          )
        )}
        <span className="flex items-center gap-1.5 text-xs text-foreground/70">
          <Star className="size-2.5 fill-amber-400 text-amber-400 shrink-0" aria-hidden />
          Hero milestone
        </span>
      </div>

      {/* ── Month heading ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl tracking-tight">June 2026</p>
        <span className="text-xs text-muted-foreground">
          Dining room opens Jun 18
        </span>
      </div>

      {/* ── Calendar grid — scrollable on mobile ─────────────────────────────── */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="min-w-[420px]">
          {/* Day-of-week header row */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_HEADERS.map((h) => (
              <div
                key={h}
                className="py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60"
              >
                {h}
              </div>
            ))}
          </div>

          {/* Grid of cells */}
          <div className="grid grid-cols-7 gap-1">
            {/* Leading blank cells */}
            {Array.from({ length: LEADING_BLANKS }).map((_, i) => (
              <div key={`lead-${i}`} className="min-h-[80px] sm:min-h-[96px]" />
            ))}

            {/* Day cells 1–30 */}
            {Array.from({ length: JUNE_DAYS }, (_, i) => i + 1).map((day) => (
              <DayCell
                key={day}
                day={day}
                isSelected={selectedDay === day}
                onClick={() => handleDayClick(day)}
              />
            ))}

            {/* Trailing blank cells to complete the final row */}
            {Array.from({ length: trailingBlanks }).map((_, i) => (
              <div key={`trail-${i}`} className="min-h-[80px] sm:min-h-[96px]" />
            ))}
          </div>
        </div>
      </div>

      {/* ── Day detail panel (below grid) ───────────────────────────────────── */}
      {selectedDay !== null && (
        <DayDetailPanel day={selectedDay} onClose={() => setSelectedDay(null)} />
      )}

      {/* ── Upcoming events list ─────────────────────────────────────────────── */}
      <div>
        <p className="eyebrow mb-4">Upcoming</p>
        <div className="divide-y divide-border border-t border-border">
          {upcomingEvents.map((ev) => {
            const cfg = TYPE_CONFIG[ev.type];
            return (
              <div key={ev.id} className="py-3.5 flex items-start gap-3">
                <span className={cn("mt-1.5 size-2 rounded-full shrink-0", cfg.dot)} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground/90 leading-snug">
                    {ev.title}
                    {ev.type === "milestone" && (
                      <Star
                        className="inline-block ml-1 size-3 fill-amber-400 text-amber-400 align-middle"
                        aria-hidden
                      />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Jun {ev.day}
                    {ev.time ? ` · ${ev.time}` : ""}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                    cfg.chip
                  )}
                >
                  {cfg.label.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
