import { Status, TaskFilterTypes, TaskType } from "@/types";
import { useEffect, useState } from "react";

const useGetAllTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [taskStatus, setTaskStatus] = useState<TaskFilterTypes>("All");

  const getFiltertasks = async (status: TaskFilterTypes) => {
    setStatus("loading");
    try {
      let filteredTasks: TaskType[] = [];
      const url =
        status === "All"
          ? `${process.env.NEXT_PUBLIC_URL_DEV}/api/tasks`
          : `${process.env.NEXT_PUBLIC_URL_DEV}/api/tasks?status=${status}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch Data");
      }
      filteredTasks = await response.json();
      setTasks(filteredTasks);
      setStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      setStatus("error");
    }
  };

  useEffect(() => {
    getFiltertasks(taskStatus);
  }, [taskStatus]);

  return { tasks, status, error, getFiltertasks, taskStatus, setTaskStatus };
};

export default useGetAllTasks;
