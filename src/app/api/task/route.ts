import { prisma } from "@/db";
import { NewTaskSchema, TaskSchema } from "@/schema";
import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextResponse) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const taskId = z.string().parse(searchParams.get("taskId"));
    const task = await prisma.task.findUnique({
      where: {
        taskId: taskId || "",
      },
    });
    if (task) {
      return NextResponse.json({
        taskId: task.taskId,
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        taskStatus: task.taskStatus,
      });
    } else {
      throw new Error("Task doesn't exist");
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextResponse) {
  try {
    const body = await request.json();
    const parseResult = NewTaskSchema.parse(body);
    await prisma.task.create({
      data: parseResult,
    });
    return NextResponse.json({ message: "Task Created Successfully!" });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: NextResponse) {
  try {
    const body = await request.json();
    const { taskId, ...parseResult } = TaskSchema.parse(body);
    await prisma.task.update({
      where: {
        taskId: taskId,
      },
      data: parseResult,
    });
    return NextResponse.json({ message: "Task Updated Successfully!" });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextResponse) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const taskId = z.string().parse(searchParams.get("taskId"));
    await prisma.task.delete({
      where: {
        taskId: taskId || "",
      },
    });
    return NextResponse.json({ message: "Task Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
}
