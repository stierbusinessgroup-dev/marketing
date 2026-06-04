"use client";

import { cn } from "@/lib/utils";
import {
  vendors,
  openOrders,
  reorderSuggestions,
} from "@/lib/porch-demo-data";
import type { POStatus } from "@/lib/porch-demo-data";

// ─── PO status pill ───────────────────────────────────────────────────────────

const poStyles: Record<POStatus, string> = {
  Draft:     "bg-muted/60     text-muted-foreground border border-border",
  Sent:      "bg-sky-50       text-sky-800           border border-sky-200",
  Delivered: "bg-emerald-50   text-emerald-800       border border-emerald-200",
};

function POStatusPill({ status }: { status: POStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        poStyles[status]
      )}
    >
      {status}
    </span>
  );
}

// ─── Derived ──────────────────────────────────────────────────────────────────

const weekOrderingTotal = openOrders.reduce((s, o) => s + o.total, 0);

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function OrderingTab() {
  return (
    <div className="space-y-8">
      {/* Summary card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="eyebrow mb-2 text-amber-700">This Week&apos;s Ordering</p>
          <p className="font-serif text-3xl tracking-tight text-amber-900">
            ${weekOrderingTotal.toLocaleString()}
          </p>
          <p className="text-xs text-amber-700/70 mt-1">
            Across {openOrders.length} open orders
          </p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="eyebrow mb-2 text-red-700">Reorder Needed</p>
          <p className="font-serif text-3xl tracking-tight text-red-900">
            {reorderSuggestions.length}
          </p>
          <p className="text-xs text-red-700/70 mt-1">Items below par</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="eyebrow mb-2">Vendors</p>
          <p className="font-serif text-3xl tracking-tight text-foreground">
            {vendors.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Active supplier accounts</p>
        </div>
      </div>

      {/* Par-based reorder suggestions */}
      <div className="rounded-xl border border-red-200 bg-red-50/40 p-5">
        <p className="eyebrow mb-1 text-red-700">Par-Based Reorder Suggestions</p>
        <p className="text-sm text-red-800/70 mb-4">
          Items currently below par — agent-suggested order quantities
        </p>
        <div className="overflow-x-auto rounded-lg border border-red-200">
          <table className="w-full text-sm min-w-[520px] bg-white/60">
            <thead>
              <tr className="border-b border-red-200 bg-red-50/60">
                <th className="text-left px-4 py-3 eyebrow">Item</th>
                <th className="text-center px-4 py-3 eyebrow">On Hand</th>
                <th className="text-center px-4 py-3 eyebrow">Par</th>
                <th className="text-center px-4 py-3 eyebrow">Suggested Order</th>
                <th className="text-left px-4 py-3 eyebrow">Vendor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {reorderSuggestions.map((s) => (
                <tr key={s.id} className="hover:bg-red-50/40 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-foreground/90">{s.item}</td>
                  <td className="px-4 py-3.5 text-center text-red-700 font-semibold tabular-nums">
                    {s.onHand}
                  </td>
                  <td className="px-4 py-3.5 text-center text-muted-foreground tabular-nums">
                    {s.par}
                  </td>
                  <td className="px-4 py-3.5 text-center font-medium text-foreground tabular-nums">
                    {s.suggestedQty}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground">{s.vendorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Open orders / POs */}
      <div>
        <p className="eyebrow mb-4">Open Orders / POs</p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm min-w-[540px]">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 eyebrow">Vendor</th>
                <th className="text-center px-4 py-3 eyebrow">Items</th>
                <th className="text-right px-4 py-3 eyebrow">Total</th>
                <th className="text-left px-4 py-3 eyebrow">Status</th>
                <th className="text-left px-4 py-3 eyebrow">Expected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {openOrders.map((order) => (
                <tr
                  key={order.id}
                  className={cn(
                    "transition-colors",
                    order.status === "Delivered"
                      ? "bg-emerald-50/30"
                      : "hover:bg-muted/20"
                  )}
                >
                  <td className="px-4 py-3.5 font-medium text-foreground/90">{order.vendorName}</td>
                  <td className="px-4 py-3.5 text-center tabular-nums text-muted-foreground">
                    {order.itemCount}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums font-medium text-foreground/80">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <POStatusPill status={order.status} />
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                    {order.expectedDate}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-muted/20">
                <td className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Week total
                </td>
                <td />
                <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                  ${weekOrderingTotal.toLocaleString()}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Vendors */}
      <div>
        <p className="eyebrow mb-4">Vendor Directory</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vendors.map((v) => (
            <div key={v.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-medium text-foreground/90">{v.name}</p>
                <span className="text-xs bg-muted rounded-full px-2 py-0.5 text-muted-foreground shrink-0">
                  {v.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{v.contact} · {v.phone}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Order days: {v.orderDay}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
