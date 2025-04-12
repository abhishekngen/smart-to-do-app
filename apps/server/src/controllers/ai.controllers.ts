import {Request, Response} from "express";
import {getToDos} from "../db/todo-queries";
import OpenAI from "openai";

export const getTasksSummary = async (req: Request, res: Response) => {
    try {
        const tasks = await getToDos();
        const client = new OpenAI();
        const response = await client.responses.create({
            model: "gpt-4o",
            input: `Give a short linguistic summary of these tasks (ie do not list out the tasks verbatim but say what needs to be done, what is in progress, etc): ${JSON.stringify(tasks)}`,
        });

        res.status(200).json({summary: response.output_text});
    } catch (error) {
        console.error("Error fetching task summary:", error);
        res.status(500).json({ error: "Failed to fetch task summary" });
    }
}
