import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {Status, Task as TaskType} from "to-do-types";
import Task from "@/components/tasks/task.tsx";
import { useTodoStore } from "@/store/todos.store.ts";

interface TasksCardProps {
  status: Status;
  title: string;
}

export default function TasksCard(props: TasksCardProps) {
  const { status, title } = props;

  const allTasks = useTodoStore((state) => state.tasks);
  const selectedTasks = allTasks.filter((task: TaskType) => task.status === status);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-y-2">
        {selectedTasks.map((task: TaskType) => (
          <Task key={task.id} task={task} />
        ))}
          </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
