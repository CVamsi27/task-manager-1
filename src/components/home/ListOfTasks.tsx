"use client";
import { ListOfTaskProps } from "@/types";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import BasicText from "../ui/BasicText";
import { useEffect, useState } from "react";

export default function ListOfTasks({
  tasks,
  status,
  error,
  deleteStatus,
  deleteError,
  deleteTask,
  refresh,
}: ListOfTaskProps) {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (deleteStatus === "success") {
      setIsDeleteLoading(true);
      refresh();
      setIsDeleteLoading(false);
    }
  }, [deleteStatus, refresh]);

  if (status === "loading" || deleteStatus === "loading" || isDeleteLoading) {
    return <BasicText text="Loading ..." />;
  }
  if (status === "error" || deleteStatus === "error") {
    return (
      <BasicText
        text={`Running into an error: ${error || deleteError}`}
        variant="error"
      />
    );
  }
  if (!tasks || tasks.length === 0) {
    if (status === "success") {
      return <BasicText text="You have no tasks created yet!" />;
    } else {
      return <BasicText text="Loading ..." />;
    }
  }

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.taskId}
          className="border-border border-2 rounded-xl p-4"
        >
          <div>
            <div className="grid grid-cols-8 items-center gap-30">
              <div className="flex flex-col gap-4 col-span-5">
                <span
                  className={`text-foreground text-2xl font-bold ${
                    task.taskStatus === "Done" ? "line-through" : ""
                  }`}
                >
                  {task.taskTitle}
                </span>
                <span
                  className={`text-muted-foreground text-sm italic ${
                    task.taskStatus === "Done" ? "line-through" : ""
                  }`}
                >
                  {task.taskDescription}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4 col-span-3">
                <span className="text-muted-foreground font-bold col-span-2">
                  {task.taskStatus}
                </span>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <Link
                    className="text-primary-foreground bg-primary p-1 rounded"
                    href={{
                      pathname: "/edit",
                      query: { taskId: task.taskId },
                    }}
                  >
                    <Pencil />
                  </Link>
                  <button
                    className="text-destructive-foreground bg-destructive p-1 rounded"
                    onClick={() => {
                      deleteTask(task.taskId || "");
                    }}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
