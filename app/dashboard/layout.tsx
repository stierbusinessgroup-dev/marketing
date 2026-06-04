import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

/**
 * Auth gate for the operating dashboard. When Supabase is configured, an
 * unauthenticated visitor is redirected to /login. The isSupabaseConfigured()
 * guard means a missing-env environment falls open (renders) rather than
 * crashing or locking everyone out.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
