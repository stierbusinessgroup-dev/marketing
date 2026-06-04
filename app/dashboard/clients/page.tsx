import type { Metadata } from "next";
import { clients } from "@/lib/dashboard-data";
import { StatusPill } from "@/components/dashboard/StatusPill";

export const metadata: Metadata = { title: "Clients — Dashboard" };

function fmtMRR(n: number | null) {
  if (n === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(d: string) {
  if (d === "—") return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClientsPage() {
  return (
    <div className="px-6 sm:px-10 py-10 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow mb-4">Dashboard</p>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
          Clients
        </h1>
        <p className="mt-3 text-base text-foreground/65 max-w-xl leading-relaxed">
          Active engagements, pipeline, and onboarding stages.
        </p>
      </div>

      {/* Table — desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <Th>Business</Th>
              <Th>Status</Th>
              <Th>Plan</Th>
              <Th>MRR</Th>
              <Th>Stage</Th>
              <Th>Start</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-foreground">{c.business}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {c.location}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <StatusPill status={c.status} />
                </td>
                <td className="px-5 py-4 text-foreground/75">{c.plan}</td>
                <td className="px-5 py-4 text-foreground/75 tabular-nums">
                  {fmtMRR(c.mrr)}
                </td>
                <td className="px-5 py-4 text-foreground/75">
                  {c.onboardingStage}
                </td>
                <td className="px-5 py-4 text-foreground/75 tabular-nums">
                  {fmtDate(c.startDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card list — mobile */}
      <div className="md:hidden space-y-3">
        {clients.map((c) => (
          <div key={c.id} className="rounded-xl border border-border p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{c.business}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.location}</p>
              </div>
              <StatusPill status={c.status} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <DetailRow label="Plan" value={c.plan} />
              <DetailRow label="MRR" value={fmtMRR(c.mrr)} />
              <DetailRow label="Stage" value={c.onboardingStage} />
              <DetailRow label="Start" value={fmtDate(c.startDate)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left eyebrow text-muted-foreground font-medium">
      {children}
    </th>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-foreground/80">{value}</p>
    </div>
  );
}
