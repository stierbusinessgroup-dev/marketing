import type { Metadata } from "next";
import { metrics, recentActivity } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Overview — Dashboard" };

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function DashboardOverviewPage() {
  return (
    <div className="px-6 sm:px-10 py-10 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow mb-4">Dashboard</p>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
          Overview
        </h1>
        <p className="mt-3 text-base text-foreground/65 max-w-xl leading-relaxed">
          Build Sonoma County businesses through consulting and AI
          infrastructure. Every client is a long-term relationship.
        </p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <MetricCard eyebrow="MRR" value={fmt(metrics.mrr)} />
        <MetricCard
          eyebrow="Active clients"
          value={String(metrics.activeClients)}
        />
        <MetricCard
          eyebrow="Pipeline"
          value={`${metrics.pipeline} leads`}
        />
        <MetricCard
          eyebrow="This month"
          value={fmt(metrics.thisMonthRevenue)}
        />
      </div>

      {/* Recent activity */}
      <div>
        <p className="eyebrow mb-6">Recent activity</p>
        <div className="border-t border-border divide-y divide-border">
          {recentActivity.map((item) => (
            <div key={item.id} className="py-4 flex items-start gap-5">
              <time className="shrink-0 text-xs text-muted-foreground pt-px w-24">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  eyebrow,
  value,
}: {
  eyebrow: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <p className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}
