export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  description?: string;
}

export type SyncOperation = {
  type: "create" | "update" | "delete";
  task: Task;
};
