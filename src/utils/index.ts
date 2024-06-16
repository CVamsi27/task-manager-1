import { ErrorSchema } from "@/schema";
import { z } from "zod";

export const TaskStatusList = ["To Do", "In Progress", "Done"];

export const isResponseError = (
  parsedResult: any,
): parsedResult is z.infer<typeof ErrorSchema> => {
  return (
    parsedResult && typeof parsedResult === "object" && "error" in parsedResult
  );
};
