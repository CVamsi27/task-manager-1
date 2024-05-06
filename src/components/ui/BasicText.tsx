import { BasicTextProps } from "@/types";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import React from "react";

export default function BasicText({
  className,
  text,
  variant,
  ...props
}: BasicTextProps) {
  return (
    <span className={cn(className, basicTextVariants({ variant }))} {...props}>
      {text}
    </span>
  );
}

const basicTextVariants = cva("font-bold text-xl", {
  variants: {
    variant: {
      basic: "text-foreground",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "basic",
  },
});
