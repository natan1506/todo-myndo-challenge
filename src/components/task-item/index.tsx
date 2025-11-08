import { useState } from "react";
import type { Task } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BadgePriority } from "./components/badge-priority";
import { GroupButtons } from "./components/group-buttons";
import { DescriptionTask } from "./components/description";

import useTasks from "@/store";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const updateTask = useTasks((state) => state.updateTask);

  function save() {
    updateTask({ ...task, title });
    setEditing(false);
  }

  return (
    <div className="flex items-center gap-3 p-2 rounded hover:bg-muted-foreground/10">
      <BadgePriority task={task} />
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex gap-2">
            <Input
              className="flex-1 p-1 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={save}
              className="px-2 rounded bg-slate-800 text-white"
            >
              Salvar
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`font-medium truncate ${
                  task.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {task.title}
              </h3>
              <GroupButtons setEditing={setEditing} id={task.id} />
            </div>

            {task.description && (
              <DescriptionTask description={task.description} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
