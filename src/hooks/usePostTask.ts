import { MessageSchema } from "@/schema";
import { NewTaskType, Status } from "@/types";
import { useState } from "react";

const usePostTask = () => {
  const [postResponse, setPostResponse] = useState<string>();
  const [postStatus, setPostStatus] = useState<Status>("");

  const postTask = async (task: NewTaskType) => {
    setPostStatus("loading");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      };
      const response = await fetch(`/api/task`, requestOptions);
      const data = await response.json();
      const parsedResult = MessageSchema.parse(data);
      if (parsedResult.message) {
        setPostResponse(parsedResult.message);
        setPostStatus("success");
      } else {
        setPostResponse(parsedResult.error);
        setPostStatus("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        setPostResponse(JSON.stringify(error.message));
      }
      setPostStatus("error");
    }
  };
  return { postResponse, postStatus, postTask };
};

export default usePostTask;
