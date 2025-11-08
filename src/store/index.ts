import type { Task } from "@/types";
import { create } from "zustand";
import { getAllTasks, putTask, deleteTask as deleteTaskFromDB } from "@/lib/db";
import { enqueue } from "@/lib/syncQueue";

type TasksState = {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (task: Task) => Promise<void>;
};

const useTasks = create<TasksState>((set, get) => ({
  tasks: [],

  loadTasks: async () => {
    const all = await getAllTasks();
    set({
      tasks: all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    });
  },

  addTask: async (task: Task) => {
    await putTask(task);
    await enqueue({ type: "create", task });
    set((state) => ({
      tasks: [task, ...state.tasks].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
      ),
    }));
  },

  updateTask: async (task: Task) => {
    await putTask(task);
    await enqueue({ type: "update", task });
    set((state) => ({
      tasks: state.tasks
        .map((t) => (t.id === task.id ? task : t))
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    }));
  },

  deleteTask: async (id: string) => {
    const task = get().tasks.find((t) => t.id === id);
    if (task) {
      await deleteTaskFromDB(id);
      await enqueue({ type: "delete", task });
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    }
  },

  toggleTask: async (task: Task) => {
    const updated = { ...task, completed: !task.completed };
    await putTask(updated);
    await enqueue({ type: "update", task: updated });
    set((state) => ({
      tasks: state.tasks
        .map((t) => (t.id === task.id ? updated : t))
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    }));
  },
}));

export default useTasks;
