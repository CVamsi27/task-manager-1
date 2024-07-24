"use client";
import { useState, useCallback } from "react";
import { FilterVariants, TaskFilterTypes } from "@/types";
import BasicButton from "../ui/BasicButton";

export default function FilterPane({
  setTaskStatus,
}: {
  setTaskStatus: (statusFilter: TaskFilterTypes) => void;
}) {
  const [variants, setVariants] = useState<FilterVariants>({
    All: "primary",
    To_Do: "basic",
    In_Progress: "basic",
    Done: "basic",
  });

  const handleFilterClick = useCallback((filter: keyof FilterVariants) => {
    const updatedVariants: FilterVariants = {
      All: "basic",
      To_Do: "basic",
      In_Progress: "basic",
      Done: "basic",
      [filter]: "primary",
    };
    setVariants(updatedVariants);
    setTaskStatus(getNewFilter(filter));
  }, [setTaskStatus]);

  const getNewFilter = useCallback((filter: string): TaskFilterTypes => {
    const data =
      filter === "To_Do"
        ? "To Do"
        : filter === "In_Progress"
        ? "In Progress"
        : filter;
    return data as TaskFilterTypes;
  }, []);

  return (
    <div className="flex flex-row gap-3 m-2">
      {Object.keys(variants).map((filter) => (
        <BasicButton
          key={filter}
          variant={variants[filter as keyof FilterVariants]}
          text={getNewFilter(filter) ?? ""}
          onClick={() => handleFilterClick(filter as keyof FilterVariants)}
        />
      ))}
    </div>
  );
}
