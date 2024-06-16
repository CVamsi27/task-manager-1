import { useState } from "react";
import { Status } from "@/types";
import { MessageSchema } from "@/schema";
import useGetAllTasks from "./useGetAllTasks";

const useDeleteTask = () => {
  const [deleteStatus, setDeleteStatus] = useState<Status>("");
  const [deleteError, setDeleteError] = useState<string | undefined>("");
  const { refresh } = useGetAllTasks();

  const deleteTask = async (taskId: string) => {
    setDeleteStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_DEV}/api/task?taskId=${taskId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data = await response.json();
      const parsedResult = MessageSchema.parse(data);
      if (parsedResult.message) {
        setDeleteError(parsedResult.message);
        setDeleteStatus("success");
      } else {
        setDeleteError(parsedResult.error);
        setDeleteStatus("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(JSON.stringify(error.message));
      }
      setDeleteStatus("error");
    } finally {
      refresh();
    }
  };

  return { deleteStatus, deleteError, deleteTask, setDeleteStatus };
};

export default useDeleteTask;
