// TODO: enable auth gate once Supabase is live.
// Uncomment the block below and add middleware.ts at the repo root.
//
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server";
//
// export default async function DashboardLayout(...) {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) redirect("/login");
//   ...
// }

import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
