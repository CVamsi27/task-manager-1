"use client";
import Link from "next/link";
import FilterPane from "./FilterPane";
import ListOfTasks from "./ListOfTasks";
import { GetTaskType } from "@/types";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import useDeleteTask from "@/hooks/useDeleteTask";
import { useEffect } from "react";

const Home = () => {
  const { tasks, status, error, setTaskStatus, refresh }: GetTaskType = useGetAllTasks();
  const { deleteStatus, deleteError, deleteTask } = useDeleteTask();

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="flex flex-col justify-between mt-4 mb-6 gap-4 font-bold text-foreground">
        <div className="flex flex-row items-center justify-center gap-28">
          <span className="text-3xl">My Tasks</span>
          <Link
            className="text-primary-foreground bg-primary px-3 py-1 rounded text-xl"
            href="/new"
          >
            + Add Task
          </Link>
        </div>
        <FilterPane setTaskStatus={setTaskStatus} />
      </header>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 p-4 rounded-xl mx-2">
        <ListOfTasks
          tasks={tasks}
          status={status}
          error={error}
          deleteStatus={deleteStatus}
          deleteError={deleteError}
          deleteTask={deleteTask}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

export default Home;
