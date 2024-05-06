import { useState } from "react";
import { Status } from "@/types";

const useDeleteTask = () => {
    const [deleteStatus, setDeleteStatus] = useState<Status>("");
    const [deleteError, setDeleteError] = useState<Error | null>(null);

    const deleteTask = async (taskId: string) => {
        setDeleteStatus("loading");
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/api/task?taskId=${taskId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            setDeleteStatus("success");
        } catch (error) {
            if (error instanceof Error) {
                setDeleteError(error);
            }
            setDeleteStatus("error");
        }
    };

    return { deleteStatus, deleteError, deleteTask };
};

export default useDeleteTask;
