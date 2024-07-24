import { prisma } from "@/db";
import { TaskFilterSchema } from "@/schema";
import { handleError } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const status = TaskFilterSchema.parse(searchParams.get("status"));
    if (status !== "All" && status !== null) {
      const task = await prisma.task.findMany({
        where: {
          taskStatus: status || "",
        },
        orderBy: [
        {
          taskStatus: "desc",
        },
        {
          taskTitle: "asc"
        }],
      });
      return NextResponse.json(task);
    } else {
      const ListOfTasks = await prisma.task.findMany({
        orderBy: [{
          taskStatus: "desc",
        },
        {
          taskTitle: "asc"
        }]
      });
      return NextResponse.json(ListOfTasks);
    }
  } catch (error) {
    return handleError(error);
  }
}
