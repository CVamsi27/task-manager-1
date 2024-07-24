import { TaskSchema, NewTaskSchema, TaskFilterSchema } from "@/schema";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type TaskType = z.infer<typeof TaskSchema>;

export type NewTaskType = z.infer<typeof NewTaskSchema>;

export type ZodErrorDisplay = {
  for: string | number;
  message: string;
};

export type Status = "loading" | "error" | "success" | "";

export type InputTitleProps = React.HTMLAttributes<HTMLSpanElement> & {
  title: string;
};

export type BasicTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  text: string;
  variant?: "basic" | "error";
};

export type BasicButtonProps = React.HTMLAttributes<HTMLSpanElement> & {
  text: string;
  variant?: "basic" | "error" | "primary";
};

export interface GetTaskType {
  tasks?: TaskType[];
  status?: Status;
  error?: string;
  getFiltertasks?: (statusFilter: TaskFilterTypes) => void;
  getTasks?: () => Promise<void>;
  taskStatus?: TaskFilterTypes;
  setTaskStatus?: Dispatch<SetStateAction<TaskFilterTypes>>;
  refresh: () => void;
}

export interface PostTaskType {
  postResponse?: string;
  postStatus?: Status;
  postTask: (task: TaskType) => Promise<void>;
}

export interface PatchTaskType {
  patchResponse?: string;
  patchStatus?: Status;
  patchTask: (task: NewTaskType, taskId: string) => Promise<void>;
}

export interface FilterVariants {
  All: "primary" | "basic" | "error";
  To_Do: "primary" | "basic" | "error";
  In_Progress: "primary" | "basic" | "error";
  Done: "primary" | "basic" | "error";
}

export type TaskFilterTypes = z.infer<typeof TaskFilterSchema>;

export interface ListOfTaskProps {
  tasks: TaskType[] | undefined;
  status: Status;
  error: string | undefined;
  deleteStatus: Status;
  deleteError: string | undefined;
  deleteTask: (taskId: string) => Promise<void>;
  refresh: () => void;
}
