"use client";
import { useState } from "react";
import BasicButton from "./ui/BasicButton";
import { FilterVariants, GetTaskType, TaskFilterTypes } from "@/types";
import useGetAllTasks from "@/hooks/useGetAllTasks";

export default function FilterPane() {
  const { setTaskStatus }: GetTaskType = useGetAllTasks();
  const [variants, setVariants] = useState<FilterVariants>({
    All: "primary",
    To_Do: "basic",
    In_Progress: "basic",
    Done: "basic",
  });

  const handleFilterClick = (filter: keyof FilterVariants) => {
    const updatedVariants: FilterVariants = {
      All: "basic",
      To_Do: "basic",
      In_Progress: "basic",
      Done: "basic",
      [filter]: "primary",
    };
    setVariants(updatedVariants);
  };

  const getNewFilter = (filter: string): TaskFilterTypes => {
    const data =
      filter === "To_Do"
        ? "To Do"
        : filter === "In_Progress"
        ? "In Progress"
        : filter;
    return data as TaskFilterTypes;
  };

  return (
    <div className="flex flex-row gap-3 m-2">
      {Object.keys(variants).map((filter) => (
        <BasicButton
          key={filter}
          variant={variants[filter as keyof FilterVariants]}
          text={getNewFilter(filter)}
          onClick={() => {
            handleFilterClick(filter as keyof FilterVariants);
            setTaskStatus(getNewFilter(filter));
          }}
        />
      ))}
    </div>
  );
}
