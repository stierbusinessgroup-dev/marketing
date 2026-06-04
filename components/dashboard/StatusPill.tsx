import { cn } from "@/lib/utils";
import type { ClientStatus } from "@/lib/dashboard-data";

const labels: Record<ClientStatus, string> = {
  lead: "Lead",
  closing: "Closing",
  onboarding: "Onboarding",
  active: "Active",
  paused: "Paused",
};

const styles: Record<ClientStatus, string> = {
  lead: "bg-muted text-muted-foreground border border-border",
  closing: "bg-amber-50 text-amber-800 border border-amber-200",
  onboarding: "bg-blue-50 text-blue-800 border border-blue-200",
  active: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  paused: "bg-muted text-muted-foreground border border-border opacity-70",
};

export function StatusPill({ status }: { status: ClientStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
