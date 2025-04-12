import TasksCard from "@/components/tasks/tasks-card.tsx";
import { Status, Task, TaskSchema } from "to-do-types";
import { useEffect } from "react";
import { z } from "zod";
import { useTodoStore } from "@/store/todos.store.ts";
import AddTask from "@/components/tasks/add-task.tsx";
import TaskSummary from "@/components/tasks/task-summary.tsx";

function App() {
  const setTasks = useTodoStore((state) => state.setTasks);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos/fetch");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      const tasks: Task[] = z.array(TaskSchema).parse(responseData);
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-2 m-4">
        <TasksCard title="To do" status={Status.Todo} />
        <TasksCard title="Doing" status={Status.Doing} />
        <TasksCard title="Done" status={Status.Done} />
      </div>
      <AddTask />
      <TaskSummary />
    </>
  );
}

export default App;
