"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TaskItem } from "@/lib/dashboard-data";

export function TaskChecklist({
  initialTasks,
}: {
  initialTasks: TaskItem[];
}) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  function toggle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  // Group tasks
  const groups = Array.from(new Set(tasks.map((t) => t.group)));

  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const groupTasks = tasks.filter((t) => t.group === group);
        const done = groupTasks.filter((t) => t.done).length;
        return (
          <div key={group}>
            <div className="flex items-center justify-between mb-5">
              <p className="eyebrow">{group}</p>
              <span className="text-xs text-muted-foreground tabular-nums">
                {done}/{groupTasks.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full rounded-full bg-muted mb-5 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${(done / groupTasks.length) * 100}%`,
                }}
              />
            </div>

            <div className="border-t border-border divide-y divide-border">
              {groupTasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-4 py-3.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggle(task.id)}
                    className="size-4 rounded border-input accent-primary cursor-pointer shrink-0"
                  />
                  <span
                    className={cn(
                      "text-sm leading-relaxed transition-colors",
                      task.done
                        ? "line-through text-muted-foreground"
                        : "text-foreground/85 group-hover:text-foreground"
                    )}
                  >
                    {task.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
