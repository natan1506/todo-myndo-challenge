import { getDB } from "./db";
import type { SyncOperation } from "../types";

const QUEUE_KEY = "sync-queue";

export async function enqueue(op: SyncOperation): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction("meta", "readwrite");
    const store = tx.objectStore("meta");
    let q = ((await store.get(QUEUE_KEY)) as SyncOperation[]) || [];
    q.push(op);
    await store.put(q, QUEUE_KEY);
    await tx.done;
  } catch (e) {
    // fallback
    const q = JSON.parse(
      localStorage.getItem(QUEUE_KEY) || "[]"
    ) as SyncOperation[];
    q.push(op);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  }
}

export async function drainQueue(
  handler: (op: SyncOperation) => Promise<boolean>
): Promise<boolean> {
  try {
    const db = await getDB();
    const tx = db.transaction("meta", "readwrite");
    const store = tx.objectStore("meta");
    let q = ((await store.get(QUEUE_KEY)) as SyncOperation[]) || [];
    while (q.length) {
      const op = q[0];
      const ok = await handler(op);
      if (!ok) break;
      q.shift();
    }
    await store.put(q, QUEUE_KEY);
    await tx.done;
    return q.length === 0;
  } catch (e) {
    const q = JSON.parse(
      localStorage.getItem(QUEUE_KEY) || "[]"
    ) as SyncOperation[];
    let changed = false;
    for (let i = 0; i < q.length; ++i) {
      const op = q[i];
      const ok = await handler(op);
      if (!ok) break;
      q.shift();
      changed = true;
      i--;
    }
    if (changed) localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
    return q.length === 0;
  }
}
