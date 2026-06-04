"use client";

import { cn } from "@/lib/utils";
import { kanbanCards } from "@/lib/porch-demo-data";
import type { KanbanColumn, KanbanCard } from "@/lib/porch-demo-data";

// ─── Column config ─────────────────────────────────────────────────────────────

const COLUMNS: KanbanColumn[] = ["Ideas", "Planned", "In Progress", "Live"];

const columnStyles: Record<KanbanColumn, { header: string; dot: string; count: string }> = {
  Ideas: {
    header: "text-muted-foreground",
    dot: "bg-slate-300",
    count: "bg-slate-100 text-slate-600",
  },
  Planned: {
    header: "text-amber-800",
    dot: "bg-amber-400",
    count: "bg-amber-50 text-amber-700",
  },
  "In Progress": {
    header: "text-sky-800",
    dot: "bg-sky-400",
    count: "bg-sky-50 text-sky-700",
  },
  Live: {
    header: "text-emerald-800",
    dot: "bg-emerald-400",
    count: "bg-emerald-50 text-emerald-700",
  },
};

// ─── Tag colors (rotate through a warm palette) ───────────────────────────────

const tagPalette: string[] = [
  "bg-amber-50 text-amber-700 border border-amber-200",
  "bg-violet-50 text-violet-700 border border-violet-200",
  "bg-sky-50 text-sky-700 border border-sky-200",
  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "bg-rose-50 text-rose-700 border border-rose-200",
  "bg-orange-50 text-orange-700 border border-orange-200",
];

const tagColorMap: Record<string, string> = {};
let tagColorIndex = 0;
function tagColor(tag: string): string {
  if (!tagColorMap[tag]) {
    tagColorMap[tag] = tagPalette[tagColorIndex % tagPalette.length];
    tagColorIndex++;
  }
  return tagColorMap[tag];
}

// Pre-assign colors deterministically
for (const card of kanbanCards) {
  tagColor(card.tag);
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function KanbanCardItem({ card }: { card: KanbanCard }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3.5 shadow-sm hover:shadow-md transition-shadow space-y-2.5">
      <p className="text-sm font-medium text-foreground/90 leading-snug">{card.title}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            tagColor(card.tag)
          )}
        >
          {card.tag}
        </span>
        {card.dueChip && (
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground border border-border">
            Due {card.dueChip}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Column ────────────────────────────────────────────────────────────────────

function KanbanColumnComponent({ column }: { column: KanbanColumn }) {
  const cards = kanbanCards.filter((c) => c.column === column);
  const styles = columnStyles[column];

  return (
    <div className="flex flex-col min-w-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("size-2 rounded-full shrink-0", styles.dot)} />
        <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", styles.header)}>
          {column}
        </p>
        <span
          className={cn(
            "ml-auto inline-flex items-center justify-center rounded-full w-5 h-5 text-xs font-semibold",
            styles.count
          )}
        >
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-2.5 min-h-[120px]">
        {cards.map((card) => (
          <KanbanCardItem key={card.id} card={card} />
        ))}
        {cards.length === 0 && (
          <div className="rounded-lg border border-dashed border-border h-20 flex items-center justify-center">
            <p className="text-xs text-muted-foreground/50">Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Exported tab ─────────────────────────────────────────────────────────────

export function MarketingTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          Track every marketing initiative from idea to live. Items move left to right as they progress.
        </p>
      </div>

      {/* Desktop: 4-column grid; mobile: 2-column then 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {COLUMNS.map((col) => (
          <KanbanColumnComponent key={col} column={col} />
        ))}
      </div>
    </div>
  );
}
