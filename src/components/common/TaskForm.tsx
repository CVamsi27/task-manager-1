"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  NewTaskType,
  PatchTaskType,
  PostTaskType,
  ZodErrorDisplay,
} from "@/types";
import usePostTask from "@/hooks/usePostTask";
import { TaskStatusList } from "@/utils";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import usePatchTask from "@/hooks/usePatchTask";
import useGetTask from "@/hooks/useGetTask";
import BasicText from "../ui/BasicText";
import InputTitle from "../ui/InputTitle";
import { NewTaskSchema } from "@/schema";

export default function TaskForm({ taskId }: { taskId?: string }) {
  const { postResponse, postStatus, postTask }: PostTaskType = usePostTask();
  const { patchResponse, patchStatus, patchTask }: PatchTaskType =
    usePatchTask();
  const [currentTask, setCurrentTask] = useState<NewTaskType>({
    taskTitle: "",
    taskDescription: "",
    taskStatus: "To Do",
  });
  const [backendErrorMessage, setBackendErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<ZodErrorDisplay[] | undefined>();

  const { task, getTaskStatus, getTaskError } = useGetTask(taskId ?? "");
  const router = useRouter();

  useEffect(() => {
    if (taskId && Object.keys(task).length !== 0) setCurrentTask(task);
  }, [task, taskId]);

  useEffect(() => {
    if (postStatus === "success" || patchStatus === "success") router.push("/");
    if ((postStatus === "error" && taskId) || patchStatus === "error")
      setBackendErrorMessage(
        `Something went wrong! ${JSON.stringify(postResponse || patchResponse)}`,
      );
  }, [postStatus, patchStatus, postResponse, patchResponse, taskId, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parseResult = NewTaskSchema.safeParse(currentTask);

    if (!parseResult.success) {
      let errArr: ZodErrorDisplay[] = [];
      const { errors: err } = parseResult.error;
      for (var i = 0; i < err.length; i++) {
        errArr.push({ for: err[i].path[0], message: err[i].message });
      }
      setErrors(errArr);
      return;
    }

    if (taskId === undefined) await postTask(currentTask);
    else await patchTask(currentTask, taskId);
  }

  return (
    <form
      className="bg-background border-border rounded-xl border-2 flex flex-col gap-4 mt-6 items-center mx-2 md:mx-0"
      method="post"
      onSubmit={handleSubmit}
    >
      {getTaskStatus === "loading" && (
        <BasicText className="p-4" text="Loading ..." />
      )}
      {getTaskStatus === "error" && (
        <BasicText
          text={`Running into an error: ${getTaskError}`}
          variant="error"
        />
      )}
      {(getTaskStatus === "success" || getTaskStatus === "") && (
        <>
          <div className="flex flex-col mx-6 mt-6 px-6 gap-1 w-full">
            <div>
              <InputTitle title="Title" />
              <span className="text-red-500"> *</span>
            </div>
            <input
              className="bg-background border-border border-2 rounded-xl px-3 py-2 text-foreground"
              onChange={(e) =>
                setCurrentTask({ ...currentTask, taskTitle: e.target.value })
              }
              placeholder="Write your task title"
              type="text"
              value={currentTask?.taskTitle}
            />
            <div className="mt-1 text-xs text-red-500">
              {errors &&
                errors.find((error) => error.for === "taskTitle")?.message}
            </div>
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
            <div className="mt-1 text-xs text-red-500">
              {errors &&
                errors.find((error) => error.for === "taskDescription")
                  ?.message}
            </div>
          </div>
          <div className="flex flex-col mx-6 px-6 w-full gap-1">
            <div>
              <InputTitle title="Status" />
              <span className="text-red-500"> *</span>
            </div>
            <div className="flex justify-between items-center mx-2 my-1">
              {TaskStatusList.map((status) => (
                <div key={status} className="flex items-center justify-center">
                  <label
                    className="text-foreground flex items-center text-sm font-semibold"
                    htmlFor={status}
                  >
                    <input
                      className="mr-2"
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
                    {status}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-1 text-xs text-red-500">
              {errors &&
                errors.find((error) => error.for === "taskStatus")?.message}
            </div>
          </div>
          {backendErrorMessage !== "" ||
          postStatus === "error" ||
          patchStatus === "error" ? (
            <div className="flex justify-center items-center mx-4">
              <span className="text-destructive font-semibold text-lg">
                {backendErrorMessage}
              </span>
            </div>
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
