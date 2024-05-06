import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const status = searchParams.get("status");
    if (status !== "All" && status !== null) {
        try {
            const task = await prisma.task.findMany({
                where: {
                    taskStatus: searchParams.get("status") || ""
                }
            });
            return NextResponse.json(task)
        } catch {
            return new NextResponse('Internal Server Error', { status: 500 })
        }
    } else {
        try {
            const ListOfTasks = await prisma.task.findMany();
            return NextResponse.json(ListOfTasks)
        } catch {
            return new NextResponse('Internal Server Error', { status: 500 })
        }
    }

}

export async function POST(request: NextResponse) {
    const body = await request.json();
    try {
        const CreatedTask = await prisma.task.create({
            data: body.createdTask
        });
        return NextResponse.json(CreatedTask)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function PATCH(request: NextResponse) {
    const body = await request.json();
    try {
        const UpdatedTask = await prisma.task.update(
            {
                where: {
                    taskId: body.taskId,
                },
                data: body.createdTask
            }
        );
        return NextResponse.json(UpdatedTask)
    } catch {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}