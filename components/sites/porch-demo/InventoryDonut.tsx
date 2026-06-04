"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number; name?: string }>;
};
import { inventoryRows } from "@/lib/porch-demo-data";

// ─── Derive counts ────────────────────────────────────────────────────────────

const counts = {
  OK:       inventoryRows.filter((r) => r.status === "OK").length,
  Low:      inventoryRows.filter((r) => r.status === "Low").length,
  Critical: inventoryRows.filter((r) => r.status === "Critical").length,
};

const donutData = [
  { name: "OK",       value: counts.OK,       color: "#10b981" },
  { name: "Low",      value: counts.Low,      color: "#f59e0b" },
  { name: "Critical", value: counts.Critical, color: "#ef4444" },
];

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function DonutTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border bg-background shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-foreground">{item?.name}</p>
      <p className="text-muted-foreground">{item?.value} items</p>
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export function InventoryDonut() {
  const total = inventoryRows.length;

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row items-center gap-6 mb-6">
      {/* Donut */}
      <div className="shrink-0 w-[140px] h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={62}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {donutData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-2.5">
        <p className="eyebrow mb-3">Inventory Status</p>
        {donutData.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <span
              className="size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-sm text-foreground/80 flex-1">{d.name}</span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {d.value}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
        <div className="pt-1 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Total items tracked</span>
          <span className="text-sm font-semibold tabular-nums text-foreground">{total}</span>
        </div>
      </div>
    </div>
  );
}
