import type { Task } from "@/types";

export function sortTasks(tasks: Task[]) {
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  return tasks.sort((a: Task, b: Task) => {
    const priorityDiff =
      (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    if (priorityDiff !== 0) return priorityDiff;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
