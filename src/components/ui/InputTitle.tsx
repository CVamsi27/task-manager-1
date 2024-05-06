import { InputTitleProps } from "@/types";
import { cn } from "@/utils/cn";
import React from "react";

export default function InputTitle({
  className,
  title,
  ...props
}: InputTitleProps) {
  return (
    <span
      className={cn(className, "text-foreground text-sm font-semibold pl-1")}
      {...props}
    >
      {title}
    </span>
  );
}
