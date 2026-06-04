"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number; name?: string }>;
};

import { dailySales, salesByCategory, financeSnapshot } from "@/lib/porch-demo-data";

// ─── Chart tooltips ───────────────────────────────────────────────────────────

function SalesTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">${val.toLocaleString()}</p>
    </div>
  );
}

function DonutTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  const name = payload[0]?.name ?? "";
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{name}</p>
      <p className="text-muted-foreground">${val.toLocaleString()}</p>
    </div>
  );
}

// ─── Donut colors ─────────────────────────────────────────────────────────────

const DONUT_COLORS = ["#78716c", "#d97706", "#7c3aed"];

// ─── P&L derived ──────────────────────────────────────────────────────────────

const pl = financeSnapshot.weeklyPL;
const netVal = pl.revenue - pl.foodCost - pl.labor - pl.overhead;
const netMargin = (netVal / pl.revenue) * 100;

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function SalesFinancesTab() {
  return (
    <div className="space-y-8">
      {/* KPI stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 sm:col-span-1">
          <p className="eyebrow mb-2">Today&apos;s Sales</p>
          <p className="font-serif text-2xl tracking-tight text-foreground">
            ${financeSnapshot.todaySales.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Friday dinner</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 sm:col-span-1">
          <p className="eyebrow mb-2 text-amber-700">Week to Date</p>
          <p className="font-serif text-2xl tracking-tight text-amber-900">
            ${financeSnapshot.weekToDate.toLocaleString()}
          </p>
          <p className="text-xs text-amber-700/70 mt-1">Mon–Fri</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 sm:col-span-1">
          <p className="eyebrow mb-2">Avg Check</p>
          <p className="font-serif text-2xl tracking-tight text-foreground">
            ${financeSnapshot.avgCheck}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Per person</p>
        </div>
        <div
          className="rounded-xl border p-5 sm:col-span-1"
          style={{
            borderColor: financeSnapshot.foodCostPct < 30 ? "#6ee7b7" : financeSnapshot.foodCostPct <= 35 ? "#fcd34d" : "#fca5a5",
            backgroundColor: financeSnapshot.foodCostPct < 30 ? "#f0fdf4" : financeSnapshot.foodCostPct <= 35 ? "#fffbeb" : "#fef2f2",
          }}
        >
          <p className="eyebrow mb-2">Food Cost %</p>
          <p className="font-serif text-2xl tracking-tight text-foreground">
            {financeSnapshot.foodCostPct}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Target &lt;32%</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 sm:col-span-1">
          <p className="eyebrow mb-2 text-emerald-700">Labor %</p>
          <p className="font-serif text-2xl tracking-tight text-emerald-900">
            {financeSnapshot.laborPct}%
          </p>
          <p className="text-xs text-emerald-700/70 mt-1">Target &lt;30%</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Daily sales bar */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-1">Daily Sales</p>
          <p className="font-serif text-xl tracking-tight text-foreground mb-4">
            This week
          </p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailySales}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
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
                <Tooltip
                  content={<SalesTooltip />}
                  cursor={{ fill: "oklch(0.97 0 0)" }}
                />
                <Bar dataKey="sales" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by category donut */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-1">Sales by Category</p>
          <p className="font-serif text-xl tracking-tight text-foreground mb-4">
            This week
          </p>
          <div className="h-[200px] flex items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {salesByCategory.map((_entry, idx) => (
                    <Cell key={idx} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex-1 space-y-2.5 pl-2">
              {salesByCategory.map((cat, idx) => {
                const pct = ((cat.value / financeSnapshot.weekToDate) * 100).toFixed(1);
                return (
                  <div key={cat.name} className="flex items-center gap-2 text-xs">
                    <span
                      className="size-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }}
                    />
                    <span className="text-muted-foreground flex-1">{cat.name}</span>
                    <span className="tabular-nums font-medium text-foreground/80">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly P&L snapshot */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="eyebrow mb-1">Weekly P&amp;L Snapshot</p>
        <p className="font-serif text-xl tracking-tight text-foreground mb-5">
          This week
        </p>
        <div className="space-y-0 divide-y divide-border">
          {[
            { label: "Revenue",    value: pl.revenue,   type: "positive" as const },
            { label: "Food Cost",  value: pl.foodCost,  type: "cost" as const },
            { label: "Labor",      value: pl.labor,     type: "cost" as const },
            { label: "Overhead",   value: pl.overhead,  type: "cost" as const },
          ].map(({ label, value, type }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span
                className={
                  type === "cost"
                    ? "tabular-nums text-sm font-medium text-red-700"
                    : "tabular-nums text-sm font-medium text-foreground/90"
                }
              >
                {type === "cost" ? "−" : ""}${value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t-2 border-foreground/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Net</span>
          <div className="text-right">
            <span
              className={`tabular-nums text-lg font-bold ${netVal >= 0 ? "text-emerald-700" : "text-red-700"}`}
            >
              ${netVal.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              ({netMargin.toFixed(1)}% margin)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
