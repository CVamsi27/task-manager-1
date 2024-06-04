"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { NewTaskType, PatchTaskType, PostTaskType } from "@/types";
import usePostTask from "@/hooks/usePostTask";
import { TaskStatusList } from "@/utils";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import usePatchTask from "@/hooks/usePatchTask";
import useGetTask from "@/hooks/useGetTask";
import BasicText from "../ui/BasicText";
import InputTitle from "../ui/InputTitle";

export default function TaskForm({ taskId }: { taskId?: string }) {
  const { postResponse, postError, postStatus, postTask }: PostTaskType =
    usePostTask();
  const { patchResponse, patchError, patchStatus, patchTask }: PatchTaskType =
    usePatchTask();
  const [currentTask, setCurrentTask] = useState<NewTaskType>({
    taskTitle: "",
    taskDescription: "",
    taskStatus: "To Do",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { task, getTaskstatus, getTaskError } =
    taskId !== undefined
      ? useGetTask(taskId)
      : {
          task: currentTask,
          getTaskstatus: "",
          getTaskError: null,
        };
  const router = useRouter();

  useEffect(() => {
    if (task) setCurrentTask(task);
  }, [task, taskId]);

  useEffect(() => {
    if (postStatus === "success" || patchStatus === "success") router.push("/");
    if (postStatus === "error" || patchStatus === "error")
      setErrorMessage(
        `Something went wrong! ${JSON.stringify(postResponse || patchResponse)}`,
      );
  }, [postStatus, patchStatus]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentTask?.taskTitle === undefined)
      setErrorMessage("Title is empty!");
    else if (currentTask?.taskDescription === undefined)
      setErrorMessage("Description is empty!");
    else if (currentTask?.taskStatus === undefined)
      setErrorMessage("Status is empty!");
    else if (currentTask === undefined)
      setErrorMessage("Few Fields are empty!");

    if (taskId === undefined) await postTask(currentTask);
    else await patchTask(currentTask, taskId);
  }

  return (
    <form
      className="bg-background border-border rounded-xl border-2 flex flex-col gap-4 mt-6 items-center"
      method="post"
      onSubmit={handleSubmit}
    >
      {getTaskstatus === "loading" && (
        <BasicText className="p-4" text="Loading ..." />
      )}
      {getTaskstatus === "error" && (
        <BasicText
          text={`Running into an error: ${getTaskError}`}
          variant="error"
        />
      )}
      {(getTaskstatus === "success" || getTaskstatus === "") && (
        <>
          <div className="flex flex-col mx-6 mt-6 px-6 gap-1 w-full">
            <InputTitle title="Title" />
            <input
              className="bg-background border-border border-2 rounded-xl px-3 py-2 text-foreground"
              onChange={(e) =>
                setCurrentTask({ ...currentTask, taskTitle: e.target.value })
              }
              placeholder="Write your task title"
              required={true}
              type="text"
              value={currentTask?.taskTitle}
            />
          </div>

          <div className="flex flex-col mx-6 px-6 gap-1 w-full">
            <InputTitle title="Description" />
            <textarea
              className="bg-background border-border border-2 rounded-xl px-3 py-2 text-foreground"
              onChange={(e) =>
                setCurrentTask({
                  ...currentTask,
                  taskDescription: e.target.value,
                })
              }
              placeholder="Write your task description"
              value={currentTask?.taskDescription}
            />
          </div>
          <div className="flex flex-col mx-6 px-6 w-full gap-1">
            <InputTitle title="Status" />
            <div className="flex justify-start gap-5 items-center ml-1 mb-1">
              {TaskStatusList.map((status) => (
                <div key={status}>
                  <input
                    type="radio"
                    id={status}
                    value={status}
                    checked={currentTask.taskStatus === status}
                    name="Status"
                    onChange={(e) => {
                      if (
                        e.target.value === "To Do" ||
                        e.target.value === "In Progress" ||
                        e.target.value === "Done"
                      )
                        setCurrentTask({
                          ...currentTask,
                          taskStatus: e.target.value,
                        });
                    }}
                    required={true}
                  />
                  <InputTitle title={status} />
                </div>
              ))}
            </div>
          </div>

          {errorMessage !== "" ||
          postError ||
          patchError ||
          postStatus === "error" ||
          patchStatus === "error" ? (
            <span className="text-destructive font-semibold text-lg">
              {errorMessage}
            </span>
          ) : (
            <></>
          )}

          <div className="flex mx-6 px-6 mb-4 gap-28 justify-between w-full">
            <Link
              href="/"
              className="text-destructive-foreground bg-destructive hover:opacity-60 border-border border-2 text-base font-semibold rounded-xl px-4 py-2"
            >
              Cancel
            </Link>
            <button
              className={cn(
                "text-primary-foreground bg-primary hover:opacity-60 border-border border-2 text-base font-semibold rounded-xl px-4 py-2",
                postStatus === "loading" || patchStatus === "loading"
                  ? "opacity-60"
                  : "",
              )}
            >
              {postStatus === "loading" || patchStatus === "loading"
                ? "Loading ..."
                : taskId
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
