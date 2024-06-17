import { GetTasksResponseSchema } from "@/schema";
import { Status, TaskFilterTypes, TaskType } from "@/types";
import { isResponseError } from "@/utils";
import { useEffect, useState } from "react";

const useGetAllTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>();
  const [status, setStatus] = useState<Status>("");
  const [error, setError] = useState<string | undefined>("");
  const [taskStatus, setTaskStatus] = useState<TaskFilterTypes>("All");

  const getFiltertasks = async (status: TaskFilterTypes) => {
    setStatus("loading");
    try {
      const url =
        status === "All"
          ? `/api/tasks`
          : `/api/tasks?status=${status}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Data");
      }
      const data = await response.json();
      const parsedResult = GetTasksResponseSchema.parse(data);
      if (isResponseError(parsedResult)) {
        setError(parsedResult.error);
        setStatus("error");
      } else {
        setTasks(parsedResult);
        setStatus("success");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(JSON.stringify(error.message));
      }
      setStatus("error");
    }
  };

  const refresh = () => {
    getFiltertasks(taskStatus);
  };

  useEffect(() => {
    getFiltertasks(taskStatus);
  }, [taskStatus]);

  return {
    tasks,
    status,
    error,
    getFiltertasks,
    taskStatus,
    setTaskStatus,
    refresh,
  };
};

export default useGetAllTasks;
