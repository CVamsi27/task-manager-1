import { MessageSchema } from "@/schema";
import { NewTaskType, Status } from "@/types";
import { useState } from "react";

const usePatchTask = () => {
  const [patchResponse, setPatchResponse] = useState<string>();
  const [patchStatus, setPatchStatus] = useState<Status>("");

  const patchTask = async (task: NewTaskType, taskId: string) => {
    setPatchStatus("loading");
    try {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: taskId,
          ...task,
        }),
      };
      const response = await fetch(`/api/task`, requestOptions);
      const data = await response.json();
      const parsedResult = MessageSchema.parse(data);
      if (parsedResult.message) {
        setPatchResponse(parsedResult.message);
        setPatchStatus("success");
      } else {
        setPatchResponse(parsedResult.error);
        setPatchStatus("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        setPatchResponse(JSON.stringify(error.message));
      }
      setPatchStatus("error");
    }
  };
  return { patchResponse, patchStatus, patchTask };
};

export default usePatchTask;
