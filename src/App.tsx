import { DiolagNewTask } from "./components/modal-new-task";
import { Navbar } from "./components/navbar";
import { useEffect, useState } from "react";
import TaskList from "./components/task-list";
import { drainQueue } from "./lib/syncQueue";
import type { SyncOperation } from "./types";
import useTasks from "./store";
import { sortTasks } from "./components/hook/sort-tasks-priority";

function App() {
  const [openedModal, setOpenedModal] = useState(false);
  const tasks = useTasks((state) => state.tasks);
  const loadTasks = useTasks((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();

    async function tryDrain() {
      await drainQueue(async (_op: SyncOperation) => {
        return true;
      });
    }

    window.addEventListener("online", tryDrain);
    return () => window.removeEventListener("online", tryDrain);
  }, [loadTasks]);

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="min-h-screen w-full">
      <Navbar openedModal={() => setOpenedModal(true)} />
      <DiolagNewTask state={openedModal} onOpenChange={setOpenedModal} />

      <div className="px-3 pt-4 flex flex-col gap-5">
        <TaskList title="Pending Tasks" tasks={sortTasks(pending)} />

        <TaskList title="Conclusion Tasks" tasks={sortTasks(completed)} />
      </div>
    </div>
  );
}

export default App;
