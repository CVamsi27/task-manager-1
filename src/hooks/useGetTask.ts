import { GetTaskResponseSchema } from "@/schema";
import { Status, TaskType } from "@/types";
import { isResponseError } from "@/utils";
import { useEffect, useState } from "react";

const useGetTask = (taskId: string) => {
  const [task, setTask] = useState<TaskType>({
    taskId: "",
    taskTitle: "",
    taskDescription: "",
    taskStatus: "To Do",
  });
  const [getTaskError, setGetTaskError] = useState<string | undefined>("");
  const [getTaskStatus, setGetTaskStatus] = useState<Status>("");

  useEffect(() => {
    const getTask = async () => {
      if (taskId === "") {
        setGetTaskStatus("success");
        return;
      }
      setGetTaskStatus("loading");
      try {
        const response = await fetch(`/api/task?taskId=${taskId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Data");
        }
        const data = await response.json();
        const parsedResult = GetTaskResponseSchema.parse(data);
        if (isResponseError(parsedResult)) {
          setGetTaskError(parsedResult.error);
          setGetTaskStatus("error");
        } else {
          setTask(parsedResult);
          setGetTaskStatus("success");
        }
      } catch (error) {
        if (error instanceof Error) {
          setGetTaskError(JSON.stringify(error.message));
        }
        setGetTaskStatus("error");
      }
    };
    getTask();
  }, [taskId]);

  return { task, getTaskStatus, getTaskError };
};

export default useGetTask;
