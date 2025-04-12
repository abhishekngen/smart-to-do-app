import {Status, Task, TaskIdType, TaskUpdateType} from "to-do-types";
import {create} from "zustand/react";

interface TodosStore {
    tasks: Task[],
    addTask: (task: Task) => void,
    modifyTask: (task: TaskUpdateType, taskId: TaskIdType) => void,
    deleteTask: (taskId: TaskIdType) => void,
    selectTasksByStatus: (status: Status) => Task[],
    setTasks: (tasks: Task[]) => void,
}

export const useTodoStore = create<TodosStore>((set, get) => ({
    tasks: [],
    addTask: (task: Task) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                task,
            ],
        })),
    modifyTask: (task: TaskUpdateType, taskId: TaskIdType) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === taskId ? { ...t, ...task } : t
            ),
        })),
    deleteTask: (taskId: TaskIdType) =>
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
    selectTasksByStatus: (status) =>
        get().tasks.filter((t) => t.status === status),
    setTasks: (tasks: Task[]) => set((state) => ({...state, tasks: tasks})),
}));
