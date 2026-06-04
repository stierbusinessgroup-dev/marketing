"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  BookOpen,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/tasks", label: "Tasks & SOPs", icon: CheckSquare },
  { href: "/dashboard/bookkeeping", label: "Bookkeeping", icon: BookOpen },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleSignOut() {
    try {
      const { createClient, isSupabaseConfigured } = await import(
        "@/lib/supabase/client"
      );
      if (isSupabaseConfigured()) {
        const supabase = await createClient();
        await supabase.auth.signOut();
      }
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
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
          <Link
            href="/"
            className="font-serif text-base tracking-tight text-foreground hover:text-primary transition-colors"
          >
            {site.shortName}
          </Link>
          <p className="mt-0.5 text-[10px] eyebrow text-muted-foreground/70 tracking-[0.18em]">
            Operating Dashboard
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5" aria-label="Dashboard">
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-foreground/65 hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/65 hover:bg-accent/60 hover:text-foreground transition-colors"
          >
            <LogOut className="size-4 shrink-0" aria-hidden />
            Sign out
          </button>
          <p className="px-3 mt-3 text-xs text-muted-foreground/60">{site.name}</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-background sticky top-0 z-10">
          <Link
            href="/"
            className="font-serif text-base tracking-tight text-foreground"
          >
            {site.shortName}
          </Link>
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
