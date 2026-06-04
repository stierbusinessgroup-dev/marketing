"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  MessageSquarePlus,
  Menu,
  X,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskChecklist } from "@/components/dashboard/TaskChecklist";
import { prepTasks, statCards, agentActivity, inventoryRows } from "@/lib/porch-demo-data";
import type { PrepTaskItem, InventoryStatus } from "@/lib/porch-demo-data";

// ─── Tab definition ───────────────────────────────────────────────────────────

type Tab = "overview" | "prep" | "inventory" | "capture";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview",   label: "Overview",      icon: LayoutDashboard },
  { id: "prep",       label: "Prep & SOPs",   icon: ClipboardList },
  { id: "inventory",  label: "Inventory",     icon: Package },
  { id: "capture",    label: "Capture",       icon: MessageSquarePlus },
];

// ─── Status pill (inventory-specific — independent of CRM StatusPill) ────────

const inventoryPillStyles: Record<InventoryStatus, string> = {
  OK:       "bg-emerald-50 text-emerald-800 border border-emerald-200",
  Low:      "bg-amber-50  text-amber-800  border border-amber-200",
  Critical: "bg-red-50    text-red-800    border border-red-200",
};

function InventoryPill({ status }: { status: InventoryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        inventoryPillStyles[status]
      )}
    >
      {status}
    </span>
  );
}

// ─── Activity type dot ────────────────────────────────────────────────────────

const activityDotStyles = {
  flag: "bg-amber-400",
  log:  "bg-emerald-400",
  info: "bg-sky-400",
};

// ─── Section: Overview ────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <div className="space-y-10">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div
            key={card.eyebrow}
            className={cn(
              "rounded-xl border p-6 flex flex-col gap-2 transition-shadow hover:shadow-sm",
              card.highlight
                ? "border-amber-200 bg-amber-50"
                : "border-border bg-card"
            )}
          >
            <p
              className={cn(
                "eyebrow",
                card.highlight ? "text-amber-700" : ""
              )}
            >
              {card.eyebrow}
            </p>
            <p
              className={cn(
                "font-serif text-4xl tracking-tight",
                card.highlight ? "text-amber-900" : "text-foreground"
              )}
            >
              {card.value}
            </p>
            {card.subtext && (
              <p
                className={cn(
                  "text-xs",
                  card.highlight ? "text-amber-700/80" : "text-muted-foreground"
                )}
              >
                {card.subtext}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Recent agent activity */}
      <div>
        <p className="eyebrow mb-5">Recent from your agent</p>
        <div className="border-t border-border divide-y divide-border">
          {agentActivity.map((item) => (
            <div key={item.id} className="py-4 flex items-start gap-4">
              <div className="mt-1.5 shrink-0">
                <span
                  className={cn(
                    "block size-2 rounded-full",
                    activityDotStyles[item.type]
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {item.message}
                </p>
              </div>
              <time className="shrink-0 text-xs text-muted-foreground pt-0.5 whitespace-nowrap">
                {item.time}
              </time>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Prep & SOPs ─────────────────────────────────────────────────────

function PrepSection() {
  // TaskChecklist expects TaskItem from dashboard-data shape — our PrepTaskItem
  // is compatible (same fields: id, label, done, group).
  const items: PrepTaskItem[] = prepTasks;
  return <TaskChecklist initialTasks={items} />;
}

// ─── Section: Inventory ───────────────────────────────────────────────────────

function InventorySection() {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground eyebrow">
                Item
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground eyebrow">
                Par
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground eyebrow">
                On Hand
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground eyebrow">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventoryRows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "transition-colors",
                  row.status === "Critical"
                    ? "bg-red-50/60"
                    : row.status === "Low"
                    ? "bg-amber-50/40"
                    : "hover:bg-muted/30"
                )}
              >
                <td className="px-4 py-3.5 font-medium text-foreground/90">
                  {row.item}
                </td>
                <td className="px-4 py-3.5 text-muted-foreground tabular-nums">
                  {row.par}
                </td>
                <td
                  className={cn(
                    "px-4 py-3.5 tabular-nums",
                    row.status === "Critical"
                      ? "text-red-700 font-semibold"
                      : row.status === "Low"
                      ? "text-amber-700 font-medium"
                      : "text-foreground/80"
                  )}
                >
                  {row.onHand}
                </td>
                <td className="px-4 py-3.5">
                  <InventoryPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Capture ────────────────────────────────────────────────────────

function CaptureSection() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (!value.trim()) return;
    setSent(true);
    setValue("");
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <p className="font-serif text-xl tracking-tight text-foreground mb-1">
          Tell your agent anything
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Observations, 86s, recipe notes, vendor issues — your agent captures
          it, categorizes it, and follows up when needed.
        </p>
      </div>

      <textarea
        className="w-full min-h-[160px] rounded-xl border border-input bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none leading-relaxed"
        placeholder={`"We ran out of duck last night — need to bump par to 16"\n"Add bone-in short rib to next week's menu"\n"The hollandaise breaks after 90 min — ask chef about fix"\n"Butter delivery was 2 lbs short, call vendor tomorrow"`}
        value={value}
        onChange={(e) => { setValue(e.target.value); setSent(false); }}
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim()}
          className={cn(
            "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium transition-all",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            "disabled:opacity-40 disabled:pointer-events-none"
          )}
        >
          Send to agent
        </button>

        {sent && (
          <p className="text-sm text-emerald-700 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
            Saved — your agent will follow up.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export function PorchDemoShell() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTabLabel = tabs.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-60 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-200",
          "lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Wordmark */}
        <div className="px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ChefHat className="size-4 text-primary" aria-hidden />
            </div>
            <div>
              <p className="font-serif text-[0.9rem] tracking-tight text-foreground leading-tight">
                The Porch Kitchen
              </p>
              <p className="text-[10px] eyebrow text-muted-foreground/70 tracking-[0.16em] mt-0.5">
                Agent Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5" aria-label="Demo navigation">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left",
                activeTab === id
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-foreground/65 hover:bg-accent/60 hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer credit */}
        <div className="px-6 py-4 border-t border-sidebar-border">
          <p className="text-[10px] text-muted-foreground/50 leading-relaxed">
            Powered by Stier Business Group
          </p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-background sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-primary/10 flex items-center justify-center">
              <ChefHat className="size-3.5 text-primary" aria-hidden />
            </div>
            <span className="font-serif text-[0.9rem] tracking-tight text-foreground">
              The Porch Kitchen
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </header>

        {/* Preview banner — must be visible on screen */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-amber-400 shrink-0" aria-hidden />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-semibold">Sales Preview</span>
            {" — "}
            interactive mock
            {" · "}
            Your live agent will run at{" "}
            <span className="font-medium">my.stierbusinessgroup.com</span>
          </p>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 sm:px-10 py-10 max-w-5xl">
            {/* Page header */}
            <div className="mb-8">
              <p className="eyebrow mb-3">The Porch Kitchen</p>
              <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
                {activeTabLabel}
              </h1>
            </div>

            {/* Tab content */}
            {activeTab === "overview"   && <OverviewSection />}
            {activeTab === "prep"       && <PrepSection />}
            {activeTab === "inventory"  && <InventorySection />}
            {activeTab === "capture"    && <CaptureSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
