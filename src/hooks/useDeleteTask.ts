import { useState } from "react";
import { Status } from "@/types";
import { MessageSchema } from "@/schema";
import useGetAllTasks from "./useGetAllTasks";

const useDeleteTask = () => {
  const [deleteStatus, setDeleteStatus] = useState<Status>("");
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined);
  const { setTasks } = useGetAllTasks();

  const deleteTask = async (taskId: string) => {
    setDeleteStatus("loading");
    try {
      const response = await fetch(`/api/task?taskId=${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data = await response.json();
      const parsedResult = MessageSchema.parse(data);
      if (parsedResult.message) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId),
        );
        setDeleteStatus("success");
      } else {
        setDeleteError(parsedResult.error);
        setDeleteStatus("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      }
      setDeleteStatus("error");
    }
  };

  return { deleteStatus, deleteError, deleteTask, setDeleteStatus };
};

export default useDeleteTask;
