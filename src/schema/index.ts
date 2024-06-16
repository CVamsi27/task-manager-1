import { z } from "zod";

export const TaskStatusSchema = z.enum(["To Do", "In Progress", "Done"]);

export const TaskFilterSchema = z
  .enum(["All", "To Do", "In Progress", "Done"])
  .nullable();

export const TaskSchema = z.object({
  taskId: z.string().optional(),
  taskTitle: z.string(),
  taskDescription: z.string(),
  taskStatus: TaskStatusSchema,
});

export const NewTaskSchema = z.object({
  taskTitle: z.string().min(1),
  taskDescription: z.string(),
  taskStatus: TaskStatusSchema,
});

export const MessageSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export const ErrorSchema = z.object({ error: z.string().optional() });

export const GetTasksResponseSchema = z.union([
  z.array(TaskSchema),
  ErrorSchema,
]);
export const GetTaskResponseSchema = z.union([TaskSchema, ErrorSchema]);

export const NewTaskResponseSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  taskDescription: z.string(),
  taskStatus: z.string(),
  createdAt: z.date(),
});
