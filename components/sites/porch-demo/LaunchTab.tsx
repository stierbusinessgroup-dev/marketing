"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { milestones } from "@/lib/porch-demo-data";
import type { Milestone, MilestoneCategory } from "@/lib/porch-demo-data";

// ─── Big countdown ring (hand-rolled SVG) ─────────────────────────────────────

const DAYS = 14;
const TOTAL = 30;
const R = 72;
const CIRC = 2 * Math.PI * R;

function BigCountdownRing() {
  const elapsed = TOTAL - DAYS;
  const progress = elapsed / TOTAL;
  const dash = progress * CIRC;
  const gap = CIRC - dash;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width="192"
        height="192"
        viewBox="0 0 192 192"
        aria-label="14 days until dining room opens"
        className="drop-shadow-sm"
      >
        {/* Outer decorative ring */}
        <circle cx="96" cy="96" r="88" fill="none" stroke="oklch(0.9 0 0)" strokeWidth="1" />
        {/* Track */}
        <circle
          cx="96" cy="96" r={R}
          fill="none"
          stroke="#fef3c7"
          strokeWidth="12"
        />
        {/* Progress */}
        <circle
          cx="96" cy="96" r={R}
          fill="none"
          stroke="#d97706"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          strokeDashoffset={CIRC / 4}
          style={{ transition: "stroke-dasharray 0.7s ease" }}
        />
        {/* Inner fill */}
        <circle cx="96" cy="96" r="58" fill="oklch(1 0 0)" />
        {/* Day count */}
        <text
          x="96" y="84"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "52px", fill: "oklch(0.18 0 0)" }}
        >
          {DAYS}
        </text>
        {/* Label */}
        <text
          x="96" y="116"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontFamily: "inherit", fontWeight: 600, fontSize: "11px", fill: "#b45309", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          DAYS TO OPEN
        </text>
      </svg>
      <div className="text-center">
        <p className="font-serif text-xl tracking-tight text-foreground">June 18, 2026</p>
        <p className="text-sm text-muted-foreground mt-0.5">Dining room opens — Sebastopol</p>
      </div>
    </div>
  );
}

// ─── Category colors ──────────────────────────────────────────────────────────

const categoryColors: Record<MilestoneCategory, { bar: string; badge: string; label: string }> = {
  Kitchen: {
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    label: "Kitchen",
  },
  "Front of House": {
    bar: "bg-sky-500",
    badge: "bg-sky-50 text-sky-800 border border-sky-200",
    label: "Front of House",
  },
  Marketing: {
    bar: "bg-violet-500",
    badge: "bg-violet-50 text-violet-800 border border-violet-200",
    label: "Marketing",
  },
  "Permits & Admin": {
    bar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 border border-amber-200",
    label: "Permits & Admin",
  },
};

// ─── Category group ────────────────────────────────────────────────────────────

function MilestoneGroup({
  category,
  items,
  onToggle,
}: {
  category: MilestoneCategory;
  items: Milestone[];
  onToggle: (id: string) => void;
}) {
  const done = items.filter((m) => m.done).length;
  const pct = Math.round((done / items.length) * 100);
  const colors = categoryColors[category];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", colors.badge)}>
            {colors.label}
          </span>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums font-medium">
          {done}/{items.length} &mdash; {pct}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted mb-4 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colors.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="divide-y divide-border">
        {items.map((m) => (
          <label key={m.id} className="flex items-center gap-3 py-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={m.done}
              onChange={() => onToggle(m.id)}
              className="size-4 rounded border-input accent-primary cursor-pointer shrink-0"
            />
            <span
              className={cn(
                "text-sm leading-relaxed transition-colors",
                m.done
                  ? "line-through text-muted-foreground"
                  : "text-foreground/85 group-hover:text-foreground"
              )}
            >
              {m.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── Exported tab ─────────────────────────────────────────────────────────────

const CATEGORY_ORDER: MilestoneCategory[] = ["Kitchen", "Front of House", "Marketing", "Permits & Admin"];

export function LaunchTab() {
  const [items, setItems] = useState<Milestone[]>(milestones);

  function toggle(id: string) {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  }

  const totalDone = items.filter((m) => m.done).length;
  const totalPct = Math.round((totalDone / items.length) * 100);

  return (
    <div className="space-y-10">
      {/* Hero countdown */}
      <div className="flex flex-col items-center py-4">
        <BigCountdownRing />
      </div>

      {/* Overall progress summary */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-amber-900">Overall launch progress</p>
          <span className="text-sm font-semibold text-amber-800 tabular-nums">{totalDone}/{items.length} tasks &mdash; {totalPct}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-amber-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${totalPct}%` }}
          />
        </div>
      </div>

      {/* Grouped milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CATEGORY_ORDER.map((cat) => (
          <MilestoneGroup
            key={cat}
            category={cat}
            items={items.filter((m) => m.category === cat)}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
