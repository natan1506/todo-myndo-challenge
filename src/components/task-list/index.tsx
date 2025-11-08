import TaskItem from "../task-item";
import type { Task } from "../../types";

type TaskListProps = {
  tasks: Task[];
  title: string;
};

export default function TaskList({ tasks, title }: TaskListProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">
        {title} ({tasks.length})
      </h2>
      <div className="bg-muted rounded p-2 divide-y">
        {tasks.length === 0 && (
          <div className="p-4 text-sm text-slate-500">No task</div>
        )}
        {tasks.map((t: Task) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </section>
  );
}
