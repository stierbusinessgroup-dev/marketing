import type { Metadata } from "next";
import { bookkeeping } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Bookkeeping — Dashboard" };

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function BookkeepingPage() {
  // Group by month
  const months = Array.from(new Set(bookkeeping.map((r) => r.month)));

  return (
    <div className="px-6 sm:px-10 py-10 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow mb-4">Dashboard</p>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
          Bookkeeping
        </h1>
        <p className="mt-3 text-base text-foreground/65 max-w-xl leading-relaxed">
          Income and expense summary by month. Placeholder data — wire to
          Supabase once the project is live.
        </p>
      </div>

      <div className="space-y-12">
        {months.map((month) => {
          const rows = bookkeeping.filter((r) => r.month === month);
          const income = rows
            .filter((r) => r.type === "income")
            .reduce((s, r) => s + r.amount, 0);
          const expenses = rows
            .filter((r) => r.type === "expense")
            .reduce((s, r) => s + r.amount, 0);
          const net = income - expenses;

          return (
            <div key={month}>
              <p className="eyebrow mb-5">{month}</p>

              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <Th>Category</Th>
                      <Th>Description</Th>
                      <Th align="right">Amount</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-5 py-3.5 text-foreground/75">
                          {row.category}
                        </td>
                        <td className="px-5 py-3.5 text-foreground/80">
                          {row.description}
                        </td>
                        <td
                          className={`px-5 py-3.5 text-right tabular-nums font-medium ${
                            row.type === "income"
                              ? "text-emerald-700"
                              : "text-foreground/65"
                          }`}
                        >
                          {row.type === "income" ? "+" : "-"}
                          {fmt(row.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Monthly summary */}
                <div className="border-t border-border bg-muted/30 px-5 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-8 text-muted-foreground">
                      <span>
                        Income:{" "}
                        <span className="text-emerald-700 font-medium">
                          +{fmt(income)}
                        </span>
                      </span>
                      <span>
                        Expenses:{" "}
                        <span className="font-medium">{fmt(expenses)}</span>
                      </span>
                    </div>
                    <div className="font-serif text-base tracking-tight">
                      Net:{" "}
                      <span
                        className={
                          net >= 0 ? "text-emerald-700" : "text-destructive"
                        }
                      >
                        {net >= 0 ? "+" : ""}
                        {fmt(net)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 eyebrow text-muted-foreground font-medium ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}
