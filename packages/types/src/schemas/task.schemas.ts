import {z} from "zod";
import {Status} from "../tables/status.tables";

export const TaskInsertSchema = z.object({
    name: z.string().min(1, { message: 'Task name must be at least 1 character.' }),
    description: z.string().optional(),
    status: z.number(),
    deadline: z.string().optional(),
});

export type TaskInsertType = z.infer<typeof TaskInsertSchema>;

export const TaskIdParamSchema = z.object({
    id: z.string().uuid(),
});

export type TaskIdType = z.infer<typeof TaskIdParamSchema>['id'];

export const TaskUpdateSchema = z.object({
    name: z.string().min(1, { message: 'Task name must be at least 1 character.' }).optional(),
    description: z.string().nullable().optional(),
    status: z.number().optional(),
    deadline: z.string().nullable().optional(),
});

export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;