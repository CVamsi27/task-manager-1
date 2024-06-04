import { prisma } from "@/db";
import { NewTaskSchema } from "@/schema";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const status = searchParams.get("status");
  if (status !== "All" && status !== null) {
    try {
      const task = await prisma.task.findMany({
        where: {
          taskStatus: searchParams.get("status") || "",
        },
        orderBy: {
          taskStatus: "desc",
        },
      });
      return NextResponse.json(task);
    } catch {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    try {
      const ListOfTasks = await prisma.task.findMany({
        orderBy: {
          taskStatus: "desc",
        },
      });
      return NextResponse.json(ListOfTasks);
    } catch {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function POST(request: NextResponse) {
  try {
    const body = await request.json();
    const parseResult = NewTaskSchema.safeParse(body);
    if (!parseResult.success) {
      return new NextResponse("Incorrect Input", { status: 400 });
    }
    const newTask = await prisma.task.create({
      data: parseResult.data,
    });
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: NextResponse) {
  const body = await request.json();
  try {
    const UpdatedTask = await prisma.task.update({
      where: {
        taskId: body.taskId,
      },
      data: body.createdTask,
    });
    return NextResponse.json(UpdatedTask);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
