"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { weeklyCovers, weeklyRevenue } from "@/lib/porch-demo-data";

// ─── Countdown ring (hand-rolled SVG) ─────────────────────────────────────────

const DAYS_TO_OPEN = 14;
const RING_R = 36;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

function CountdownRing({ days }: { days: number }) {
  const totalDays = 30;
  const elapsed = totalDays - days;
  const progress = Math.min(elapsed / totalDays, 1);
  const dash = progress * RING_CIRCUMFERENCE;
  const gap = RING_CIRCUMFERENCE - dash;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        className="shrink-0"
        aria-label={`${days} days until opening`}
      >
        <circle
          cx="48" cy="48" r={RING_R}
          fill="none" stroke="currentColor" strokeWidth="7"
          className="text-amber-100"
        />
        <circle
          cx="48" cy="48" r={RING_R}
          fill="none" stroke="currentColor" strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          strokeDashoffset={RING_CIRCUMFERENCE / 4}
          className="text-amber-500 transition-all duration-700"
        />
        <text
          x="48" y="44"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 600,
            fontSize: "22px",
            fill: "oklch(0.18 0 0)",
          }}
        >
          {days}
        </text>
        <text
          x="48" y="62"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "inherit",
            fontWeight: 500,
            fontSize: "9px",
            fill: "oklch(0.45 0 0)",
            letterSpacing: "0.1em",
          }}
        >
          DAYS
        </text>
      </svg>
      <p className="text-xs text-amber-700 font-medium">to opening</p>
    </div>
  );
}

// ─── Custom tooltip components ────────────────────────────────────────────────
// Using TooltipProps<number, string> so payload[0].value is number.

function CoversTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">{payload[0]?.value} covers</p>
    </div>
  );
}

function RevenueTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">${val.toLocaleString()}</p>
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export function OverviewCharts() {
  return (
    <div className="space-y-6">
      {/* Countdown ring summary card */}
      <div className="flex items-center gap-6 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5">
        <CountdownRing days={DAYS_TO_OPEN} />
        <div>
          <p className="font-serif text-xl tracking-tight text-amber-900 leading-tight">
            Dining room opens June 18
          </p>
          <p className="text-sm text-amber-700/80 mt-1 leading-relaxed">
            5 of 12 launch milestones complete &mdash; 45% there
          </p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Weekly covers */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-1">Weekly Covers</p>
          <p className="font-serif text-2xl tracking-tight text-foreground mb-4">
            390 this week
          </p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyCovers} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(0.9 0 0)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CoversTooltip />} cursor={{ fill: "oklch(0.97 0 0)" }} />
                <Bar dataKey="covers" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly revenue */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-1">Weekly Revenue</p>
          <p className="font-serif text-2xl tracking-tight text-foreground mb-4">
            $15,600 this week
          </p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyRevenue}
                margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(0.9 0 0)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#78716c"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#78716c", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#d97706", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
