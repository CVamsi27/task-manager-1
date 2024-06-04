import { z } from "zod";

export const TaskStatusSchema = z.enum(["To Do", "In Progress", "Done"]);

export const TaskSchema = z.object({
  taskId: z.string().optional(),
  taskTitle: z.string(),
  taskDescription: z.string(),
  taskStatus: TaskStatusSchema,
});

export const NewTaskSchema = z.object({
  taskTitle: z.string(),
  taskDescription: z.string(),
  taskStatus: TaskStatusSchema,
});
