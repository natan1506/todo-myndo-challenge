import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PenIcon, Trash2Icon } from "lucide-react";
import useTasks from "@/store";

type GroupButtonsProps = {
  setEditing: (editing: boolean) => void;
  id: string;
};

export function GroupButtons({ setEditing, id }: GroupButtonsProps) {
  const deleteTask = useTasks((state) => state.deleteTask);
  return (
    <div className="flex shrink-0">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => setEditing(true)}
            className="text-sm"
          >
            <PenIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Task</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => deleteTask(id)}
            className="text-sm text-red-500"
          >
            <Trash2Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Task</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
