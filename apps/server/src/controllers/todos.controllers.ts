import {addToDo, deleteToDoById, getToDos, updateToDoById} from "../db/todo-queries";
import {Request, Response} from "express";
import {TaskIdParamSchema, TaskInsertSchema, TaskUpdateSchema} from "to-do-types";

export const fetchTodos = async (req: Request, res: Response) => {
    try {
        const todos = await getToDos();
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
}

export const createTodo = async (req: Request, res: Response) => {
    try {
        const task = TaskInsertSchema.parse(req.body);
        const insertedTask = await addToDo(task);
        res.status(201).json(insertedTask);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Failed to create todo" });
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = TaskIdParamSchema.parse(req.params);
    try {
        const taskUpdate = TaskUpdateSchema.parse(req.body);
        const updatedTodo = await updateToDoById(taskUpdate, id);
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Failed to update todo" });
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = TaskIdParamSchema.parse(req.params);
    try {
        const deletedTodo = await deleteToDoById(id);
        res.status(200).json(deletedTodo);
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}