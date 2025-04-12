import {Status, Task as TaskType} from "to-do-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight, TrashIcon} from "lucide-react";
import { useTodoStore } from "@/store/todos.store.ts";

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const modifyTask = useTodoStore((state) => state.modifyTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);

  const moveTask = async (taskId: string, direction: "left" | "right") => {
    const newStatus: number =
      direction === "left" ? task.status! - 1 : task.status! + 1;
    try {
      if (newStatus < 1 || newStatus > 3) {
        throw new Error("Invalid status");
      }
      const response = await fetch(
        `http://localhost:3000/todos/update/${taskId}`,
        {
          method: "PUT",
          body: JSON.stringify({ status: newStatus }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      modifyTask({ status: newStatus }, taskId);
    } catch (e) {
      console.error(e);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/delete/${taskId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteTask(taskId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">{task.name}</h2>
      </CardHeader>
      <CardContent>
        <p className="break-words">{task.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(task.created_at).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button
        variant="ghost"
        onClick={() => {
            removeTask(task.id);
        }}>
          <TrashIcon />
        </Button>
        <Button
          variant="ghost"
          disabled={task.status === Status.Todo}
          onClick={() => {
            moveTask(task.id, "left");
          }}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          disabled={task.status === Status.Done}
          onClick={() => {
            moveTask(task.id, "right");
          }}
        >
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
