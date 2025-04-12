import { z } from "zod";
import {Tables, TablesInsert, TablesUpdate} from "../supabase.generated";
import {Status} from "./status.tables";

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.number().nullable(),
  created_at: z.string(),
  deadline: z.string().nullable(),
});

export type Task = Tables<"task">;
export type InsertTask = TablesInsert<"task">;
export type UpdateTask = TablesUpdate<"task">;
