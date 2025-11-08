import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/types";
import useTasks from "@/store";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "The task needs a name"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    message: "Please select a priority",
  }),
});

type DiolagNewTaskProps = {
  state: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DiolagNewTask({ state, onOpenChange }: DiolagNewTaskProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: "low",
    },
  });

  const addTask = useTasks((state) => state.addTask);

  async function handleSubmit(data: {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
  }) {
    const task: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      completed: false,
      createdAt: Date.now(),
    };
    await addTask(task);
  }

  return (
    <Dialog
      open={state}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              await handleSubmit(data);
              form.reset();
              onOpenChange(false);
            })}
          >
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>
                Add a new task in your backlog.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Check emails..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your task here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="p-1 bg-green-500 rounded-full"></div>
                          Low
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="p-1 bg-amber-500 rounded-full"></div>
                          Medium
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="p-1 bg-red-500 rounded-full"></div>
                          High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
