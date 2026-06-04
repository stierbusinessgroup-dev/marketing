import type { Metadata } from "next";
import { TaskChecklist } from "@/components/dashboard/TaskChecklist";
import { tasks } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Tasks & SOPs — Dashboard" };

export default function TasksPage() {
  return (
    <div className="px-6 sm:px-10 py-10 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow mb-4">Dashboard</p>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
          Tasks &amp; SOPs
        </h1>
        <p className="mt-3 text-base text-foreground/65 max-w-xl leading-relaxed">
          Onboarding checklists and daily operating procedures. Check items off
          as you go — state resets on refresh until wired to Supabase.
        </p>
      </div>

      <TaskChecklist initialTasks={tasks} />
    </div>
  );
}
