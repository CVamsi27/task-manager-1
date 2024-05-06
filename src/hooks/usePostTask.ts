import { NewTaskType, Status } from "@/types";
import { useState } from "react";

const usePostTask = () => {
    const [postResponse, setPostResponse] = useState<string>();
    const [postError, setPostError] = useState<Error | null>(null);
    const [postStatus, setPostStatus] = useState<Status>("");

    const postTask = async (task: NewTaskType) => {
        setPostStatus("loading");
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    createdTask: task
                })
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/api/tasks`, requestOptions);
            const data = await response.json();
            setPostResponse(JSON.stringify(data));
            setPostStatus("success");
        } catch (error) {
            if (error instanceof Error) { setPostError(error); }
            setPostStatus("error");
        }
    };
    return { postResponse, postError, postStatus, postTask };
}

export default usePostTask;