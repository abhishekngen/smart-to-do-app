import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Status, TaskInsertSchema, TaskInsertType, TaskSchema} from "to-do-types";
import {useTodoStore} from "@/store/todos.store.ts";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

export default function AddTask() {
    const addTask = useTodoStore(state => state.addTask);

    const form = useForm<TaskInsertType>({
        resolver: zodResolver(TaskInsertSchema),
        defaultValues: {
            deadline: undefined,
            status: Status.Todo
        },
    });

    const onSubmit = async (values: TaskInsertType)=> {
        try {
            const response = await fetch(
                `http://localhost:3000/todos/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                },
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json()
            const task = TaskSchema.parse(responseData);

            addTask(task);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-4 items-center">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Name</FormLabel>
                            <FormControl>
                                <Input className="w-96" placeholder="New Task" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Description</FormLabel>
                            <FormControl>
                                <Textarea className="w-96" placeholder="Task Description (Optional)" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-80" type="submit">Submit</Button>
            </form>
        </Form>
    )
}