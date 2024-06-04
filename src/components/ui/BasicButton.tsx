import { BasicButtonProps } from "@/types";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import React from "react";

export default function BasicButton({
  className,
  text,
  variant,
  ...props
}: BasicButtonProps) {
  return (
    <button
      className={cn(className, basicTextVariants({ variant }))}
      {...props}
    >
      {text}
    </button>
  );
}

const basicTextVariants = cva("px-3 py-1 rounded text-xl hover:opacity-60", {
  variants: {
    variant: {
      basic: "bg-muted text-muted-foreground",
      primary: "bg-primary text-primary-foreground",
      error: "bg-destructive text-primary-foreground",
    },
  },
  defaultVariants: {
    variant: "basic",
  },
});
