"use client";
import { ListOfTaskProps } from "@/types";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import BasicText from "../ui/BasicText";

export default function ListOfTasks({
  tasks,
  status,
  error,
  deleteStatus,
  deleteError,
  deleteTask,
}: ListOfTaskProps) {
  if (status === "loading" || status === "" || deleteStatus === "loading")
    return <BasicText text="Loading ..." />;
  if (status === "error" || deleteStatus === "error")
    return (
      <BasicText
        text={`Running into an error: ${error || deleteError}`}
        variant="error"
      />
    );
  if (!tasks || tasks.length === 0)
    return <BasicText text="You have no tasks created yet!" />;
  if (deleteStatus === "success" || deleteStatus === "")
    return tasks.map((task, index) => (
      <div key={task.taskId}>
        <div>
          <div className="grid grid-cols-2 items-center gap-40">
            <div className="flex flex-col gap-1">
              <span
                className={`text-foreground text-2xl font-bold ${task.taskStatus === "Done" ? "line-through" : ""}`}
              >
                {task.taskTitle}
              </span>
              <span
                className={`text-muted-foreground text-sm italic ${task.taskStatus === "Done" ? "line-through" : ""}`}
              >
                {task.taskDescription}
              </span>
            </div>

            <div className="grid grid-cols-2 items-center gap-6">
              <span className="text-muted-foreground font-bold">
                {task.taskStatus}
              </span>
              <div className="flex gap-2 justify-end">
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
                  className="text-primary-foreground bg-primary p-1 rounded"
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
        {tasks.length - 1 === index ? (
          <></>
        ) : (
          <hr className="my-3 h-0.5 border-t-0 bg-border" />
        )}
      </div>
    ));
}
