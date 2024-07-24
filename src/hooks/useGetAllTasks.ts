import { GetTasksResponseSchema } from "@/schema";
import { Status, TaskFilterTypes, TaskType } from "@/types";
import { isResponseError } from "@/utils";
import { useEffect, useState, useCallback, useRef } from "react";

const useGetAllTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [status, setStatus] = useState<Status>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [taskStatus, setTaskStatus] = useState<TaskFilterTypes>("All");

  const initialRender = useRef(true);

  const getFiltertasks = useCallback(async (status: TaskFilterTypes) => {
    setStatus("loading");
    try {
      const url = status === "All" ? `/api/tasks` : `/api/tasks?status=${status}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
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
        setError(error.message);
      }
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getFiltertasks(taskStatus);
  }, [taskStatus, getFiltertasks]);

  const refresh = useCallback(() => {
    getFiltertasks(taskStatus);
  }, [getFiltertasks, taskStatus]);

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  return {
    tasks,
    status,
    error,
    taskStatus,
    setTaskStatus,
    refresh,
    setTasks
  };
};

export default useGetAllTasks;