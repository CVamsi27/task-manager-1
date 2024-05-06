"use client";
import { GetTaskType } from "@/types";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import BasicText from "./ui/BasicText";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import useDeleteTask from "@/hooks/useDeleteTask";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ListOfTasks() {
  const { tasks, status, error, getFiltertasks, taskStatus }: GetTaskType =
    useGetAllTasks();
  const { deleteStatus, deleteError, deleteTask } = useDeleteTask();
  const router = useRouter();

  useEffect(() => {
    if (deleteStatus === "success") {
      getFiltertasks("All");
    }
  }, [deleteStatus, getFiltertasks]);

  useEffect(() => {
    console.log(taskStatus);
    if (taskStatus !== "All") {
      getFiltertasks(taskStatus);
    }
  }, [taskStatus]);

  return (
    <div className="flex flex-col border-border border-2 p-4 rounded-xl mb-10">
      {(status === "loading" ||
        status === "" ||
        deleteStatus === "loading") && <BasicText text="Loading ..." />}
      {status === "error" ||
        (deleteStatus === "error" && (
          <BasicText
            text={`Running into an error: ${error || deleteError}`}
            variant="error"
          />
        ))}
      {status !== "loading" && status !== "error" && tasks.length === 0 && (
        <BasicText text="You have no tasks created yet!" />
      )}
      {(deleteStatus === "success" || deleteStatus === "") &&
        tasks.map((task, index) => (
          <div key={task.taskId}>
            <div>
              <div className="grid grid-cols-2 items-center gap-40">
                <div className="flex flex-col gap-1">
                  <span className="text-foreground text-2xl font-bold">
                    {task.taskTitle}
                  </span>
                  <span className="text-muted-foreground text-sm italic">
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
                      onClick={async () => {
                        await deleteTask(task.taskId || "");
                        router.refresh();
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
        ))}
    </div>
  );
}
