import { DashboardShell } from "@/components/dashboard/DashboardShell";

/**
 * Dashboard chrome. The auth gate lives in middleware.ts — it redirects
 * unauthenticated visitors to /login before this layout ever renders.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
