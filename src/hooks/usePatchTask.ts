import { NewTaskType, Status } from "@/types";
import { useState } from "react";

const usePatchTask = () => {
    const [patchResponse, setPatchResponse] = useState<string>();
    const [patchError, setPatchError] = useState<Error | null>(null);
    const [patchStatus, setPatchStatus] = useState<Status>("");

    const patchTask = async (task: NewTaskType, taskId: string) => {
        setPatchStatus("loading");
        try {
            const requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    taskId: taskId,
                    createdTask: task
                })
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/api/tasks`, requestOptions);
            const data = await response.json();
            setPatchResponse(JSON.stringify(data));
            setPatchStatus("success");
        } catch (error) {
            if (error instanceof Error) { setPatchError(error); }
            setPatchStatus("error");
        }
    };
    return { patchResponse, patchError, patchStatus, patchTask };
}

export default usePatchTask;