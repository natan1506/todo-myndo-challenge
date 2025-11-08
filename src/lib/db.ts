import { openDB } from "idb";
import type { Task } from "../types";

const DB_NAME = "todo-db";
const STORE = "tasks";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta");
      }
    },
  });
}

export async function getAllTasks(): Promise<Task[]> {
  const db = await getDB();
  return await db.getAll(STORE);
}

export async function putTask(task: Task): Promise<void> {
  const db = await getDB();
  await db.put(STORE, task);
}

export async function deleteTask(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE, id);
}
