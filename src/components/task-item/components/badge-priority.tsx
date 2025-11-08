import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import useTasks from "@/store";
import type { Task } from "@/types";
import { cva } from "class-variance-authority";

import { CheckIcon } from "lucide-react";

type BadgeProps = {
  task: Task;
};

const badgeVariants = cva(
  "flex items-center justify-center rounded-full relative cursor-pointer",
  {
    variants: {
      variant: {
        highCompleted: "bg-red-500/40 border border-red-500",
        mediumCompleted: "bg-amber-500/40 border border-amber-500",
        lowCompleted: "bg-green-500/40 border border-green-500",
        high: "p-1.5 border border-red-500",
        medium: "p-1.5 border border-amber-500",
        low: "p-1.5 border border-green-500",
      },
    },
  }
);

export function BadgePriority({ task }: BadgeProps) {
  const toggleTask = useTasks((state) => state.toggleTask);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            badgeVariants({
              variant: `${task.priority}${task.completed ? "Completed" : ""}`,
            })
          )}
          onClick={() => toggleTask(task)}
        >
          {task.completed && (
            <span>
              <CheckIcon className="w-3 h-3" />
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="text-start">
        <span>
          Status:{" "}
          <span className="font-bold">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </span>
        <br />
        <span>
          Click here to mark as {task.completed ? "pending" : "completed"}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
