import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  try {
    const task = await prisma.task.findUnique({
      where: {
        taskId: searchParams.get("taskId") || "",
      },
    });
    return NextResponse.json(task);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextResponse) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  try {
    const task = await prisma.task.delete({
      where: {
        taskId: searchParams.get("taskId") || "",
      },
    });
    return NextResponse.json(task);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
