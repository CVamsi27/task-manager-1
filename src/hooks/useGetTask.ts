import { Status, TaskType } from "@/types";
import { useEffect, useState } from "react";

const useGetTask = (taskId: string) => {
  const [task, setTask] = useState<TaskType>({
    taskId: "",
    taskTitle: "",
    taskDescription: "",
    taskStatus: "To Do",
  });
  const [getTaskError, setGetTaskError] = useState<Error | null>(null);
  const [getTaskstatus, setGetTaskStatus] = useState<Status>("");

  useEffect(() => {
    const getTask = async () => {
      setGetTaskStatus("loading");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_DEV}/api/task?taskId=${taskId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Data");
        }
        const data = await response.json();
        setTask(data);
        setGetTaskStatus("success");
      } catch (error) {
        if (error instanceof Error) {
          setGetTaskError(error);
        }
        setGetTaskStatus("error");
      }
    };
    getTask();
  }, [taskId]);

  return { task, getTaskstatus, getTaskError };
};

export default useGetTask;
