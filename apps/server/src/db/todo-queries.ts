import supabase from "../lib/supabase";
import {InsertTask, Task, TaskSchema, UpdateTask} from "to-do-types";
import { z } from "zod";

export async function getToDos() {
  const { data, error } = await supabase.from("task").select("*");
  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  const tasks: Task[] = z.array(TaskSchema).parse(data);
  return tasks;
}

export async function addToDo(task: InsertTask) {
  const { data, error} = await supabase.from("task").insert([task]).select().single();
  if (error) {
    console.log(error);
    console.error("Error fetching tasks:", error);
    throw error;
  }
  const insertedTask: Task = TaskSchema.parse(data);
  return insertedTask;
}

export async function updateToDoById(task: UpdateTask, id: string) {
  const {data, error} = await supabase.from("task").update(task).eq('id', id).select().single();
  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  const updatedTask: Task = TaskSchema.parse(data);
  return updatedTask;
}

export async function deleteToDoById(id: string) {
  const {data, error} = await supabase.from("task").delete().eq('id', id).select().single();
  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  const deletedTask: Task = TaskSchema.parse(data);
  return deletedTask;
}
