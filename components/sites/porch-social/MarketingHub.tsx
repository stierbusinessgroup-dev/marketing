"use client";

import { useState } from "react";
import { ChefHat, Users2, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PorchGroup } from "@/lib/porch-groups";
import { GroupsTab } from "./GroupManagerClient";
import { PlaybookTab } from "./PlaybookTab";

type Tab = "groups" | "playbook";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "groups", label: "Facebook Groups", icon: Users2 },
  { id: "playbook", label: "Marketing Playbook", icon: ListChecks },
];

export function MarketingHub({ initialGroups }: { initialGroups: PorchGroup[] }) {
  const [tab, setTab] = useState<Tab>("groups");

  return (
    <div className="min-h-screen bg-background">
      {/* Brand header + tabs */}
      <header className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="flex items-center gap-3 py-6">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ChefHat className="size-5 text-primary" aria-hidden />
            </div>
            <div>
              <p className="font-serif text-lg leading-tight tracking-tight text-foreground">
                The Porch Kitchen
              </p>
              <p className="eyebrow text-muted-foreground/70">Marketing Hub</p>
            </div>
          </div>

          <nav className="-mb-px flex gap-1" aria-label="Marketing Hub sections">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  tab === id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Active tab */}
      <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
        {tab === "groups" && <GroupsTab initialGroups={initialGroups} />}
        {tab === "playbook" && <PlaybookTab />}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-6 pb-10 sm:px-10">
        <div className="border-t border-border pt-5">
          <p className="text-[10px] leading-relaxed text-muted-foreground/50">
            Powered by Stier Business Group
          </p>
        </div>
      </footer>
    </div>
  );
}
