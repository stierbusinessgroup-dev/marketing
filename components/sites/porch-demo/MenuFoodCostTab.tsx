"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number; name?: string }>;
};

import { cn } from "@/lib/utils";
import {
  menuItems,
  eightySixBoard,
  foodCostByCategory,
  foodCostPct,
  foodCostBand,
} from "@/lib/porch-demo-data";
import type { FoodCostBand } from "@/lib/porch-demo-data";

// ─── Food cost pill ───────────────────────────────────────────────────────────

const bandStyles: Record<FoodCostBand, string> = {
  good:  "bg-emerald-50 text-emerald-800 border border-emerald-200",
  watch: "bg-amber-50   text-amber-800   border border-amber-200",
  high:  "bg-red-50     text-red-800     border border-red-200",
};

const bandLabels: Record<FoodCostBand, string> = {
  good:  "Good",
  watch: "Watch",
  high:  "High",
};

function FoodCostPill({ pct }: { pct: number }) {
  const band = foodCostBand(pct);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        bandStyles[band]
      )}
    >
      {pct.toFixed(1)}% &mdash; {bandLabels[band]}
    </span>
  );
}

// ─── Bar chart colors ─────────────────────────────────────────────────────────

function barColor(pct: number) {
  const b = foodCostBand(pct);
  return b === "good" ? "#059669" : b === "watch" ? "#d97706" : "#dc2626";
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function FoodCostTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">Avg food cost: {val.toFixed(1)}%</p>
    </div>
  );
}

// ─── Derived summary ──────────────────────────────────────────────────────────

const allPcts = menuItems.map((m) => foodCostPct(m));
const avgFoodCostPct = allPcts.reduce((s, p) => s + p, 0) / allPcts.length;

const bestMarginItem = menuItems.reduce((best, m) => {
  const margin = m.menuPrice - m.plateCost;
  const bestMargin = best.menuPrice - best.plateCost;
  return margin > bestMargin ? m : best;
}, menuItems[0]);

const itemsToReprice = menuItems.filter((m) => foodCostBand(foodCostPct(m)) === "high");

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function MenuFoodCostTab() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className={cn(
            "rounded-xl border p-5",
            avgFoodCostPct < 30
              ? "border-emerald-200 bg-emerald-50"
              : avgFoodCostPct <= 35
              ? "border-amber-200 bg-amber-50"
              : "border-red-200 bg-red-50"
          )}
        >
          <p className="eyebrow mb-2">Avg Food Cost %</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            {avgFoodCostPct.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Across all menu items</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="eyebrow mb-2 text-emerald-700">Best Margin Dish</p>
          <p className="font-serif text-xl tracking-tight text-emerald-900 leading-tight">
            {bestMarginItem.dish}
          </p>
          <p className="text-xs text-emerald-700/70 mt-1">
            ${(bestMarginItem.menuPrice - bestMarginItem.plateCost).toFixed(2)} margin per plate
          </p>
        </div>
        <div
          className={cn(
            "rounded-xl border p-5",
            itemsToReprice.length > 0 ? "border-red-200 bg-red-50" : "border-border bg-card"
          )}
        >
          <p
            className={cn(
              "eyebrow mb-2",
              itemsToReprice.length > 0 ? "text-red-700" : ""
            )}
          >
            Items to Re-price
          </p>
          <p
            className={cn(
              "font-serif text-3xl tracking-tight",
              itemsToReprice.length > 0 ? "text-red-900" : "text-foreground"
            )}
          >
            {itemsToReprice.length}
          </p>
          <p
            className={cn(
              "text-xs mt-1",
              itemsToReprice.length > 0 ? "text-red-700/70" : "text-muted-foreground"
            )}
          >
            Food cost {">"}35%
          </p>
        </div>
      </div>

      {/* 86 Board */}
      {eightySixBoard.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="eyebrow mb-3 text-red-700">86 Board &mdash; Out Today</p>
          <ul className="space-y-1.5">
            {eightySixBoard.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-red-800">
                <span className="size-1.5 rounded-full bg-red-400 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Food cost by category chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="eyebrow mb-1">Food Cost % by Category</p>
        <p className="font-serif text-xl tracking-tight text-foreground mb-4">
          Color = cost band
        </p>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={foodCostByCategory}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="oklch(0.9 0 0)"
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.45 0 0)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
                domain={[0, 45]}
              />
              <Tooltip
                content={<FoodCostTooltip />}
                cursor={{ fill: "oklch(0.97 0 0)" }}
              />
              <Bar dataKey="avgCostPct" radius={[4, 4, 0, 0]}>
                {foodCostByCategory.map((entry, idx) => (
                  <Cell key={idx} fill={barColor(entry.avgCostPct)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-emerald-600 shrink-0" />
            Good (&lt;30%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-amber-600 shrink-0" />
            Watch (30–35%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-red-600 shrink-0" />
            High (&gt;35%)
          </span>
        </div>
      </div>

      {/* Menu items table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 eyebrow">Dish</th>
              <th className="text-left px-4 py-3 eyebrow">Category</th>
              <th className="text-right px-4 py-3 eyebrow">Menu Price</th>
              <th className="text-right px-4 py-3 eyebrow">Plate Cost</th>
              <th className="text-left px-4 py-3 eyebrow">Food Cost %</th>
              <th className="text-right px-4 py-3 eyebrow">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {menuItems.map((item) => {
              const pct = foodCostPct(item);
              const band = foodCostBand(pct);
              const margin = item.menuPrice - item.plateCost;
              return (
                <tr
                  key={item.id}
                  className={cn(
                    "transition-colors",
                    band === "high"
                      ? "bg-red-50/40"
                      : band === "watch"
                      ? "bg-amber-50/30"
                      : "hover:bg-muted/20"
                  )}
                >
                  <td className="px-4 py-3.5 font-medium text-foreground/90">{item.dish}</td>
                  <td className="px-4 py-3.5 text-muted-foreground text-xs">{item.category}</td>
                  <td className="px-4 py-3.5 tabular-nums text-right text-foreground/80">
                    ${item.menuPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5 tabular-nums text-right text-muted-foreground">
                    ${item.plateCost.toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5">
                    <FoodCostPill pct={pct} />
                  </td>
                  <td className="px-4 py-3.5 tabular-nums text-right font-medium text-foreground/80">
                    ${margin.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
