import { prisma } from "../../db";
import { GET } from "@/app/api/tasks/route";
import { TaskFilterSchema, TaskSchemaArray } from "@/schema";
import { handleError } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

jest.mock("../../db", () => ({
  prisma: {
    task: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock("../../schema", () => ({
  TaskFilterSchema: {
    parse: jest.fn(),
  },
  TaskSchemaArray: {
    parse: jest.fn(),
  },
}));

jest.mock("../../utils/errorHandler", () => ({
  handleError: jest.fn(),
}));

describe("/api/tasks API endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns a list of tasks with specific status", async () => {
    const status = "Done";
    const tasks = [
      {
        taskId: 1,
        taskTitle: "Task 1",
        taskDescription: "Test Description 1",
        taskStatus: status,
      },
      {
        taskId: 2,
        taskTitle: "Task 2",
        taskDescription: "Test Description 2",
        taskStatus: status,
      },
    ];

    (TaskSchemaArray.parse as jest.Mock).mockReturnValue(tasks);
    (prisma.task.findMany as jest.Mock).mockResolvedValue(tasks);

    const req = new NextRequest(`${process.env.DEV_URL}/api/tasks?status=Done`);

    const response = await GET(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual(tasks);
  });

  test('returns a list of all tasks when status is "All"', async () => {
    const tasks = [
      {
        id: 1,
        taskTitle: "Task 1",
        taskDescription: "Test Description 1",
        taskStatus: "To Do",
      },
      {
        id: 2,
        taskTitle: "Task 2",
        taskDescription: "Test Description 2",
        taskStatus: "Done",
      },
    ];

    (TaskSchemaArray.parse as jest.Mock).mockReturnValue(tasks);
    (prisma.task.findMany as jest.Mock).mockResolvedValue(tasks);

    const req = new NextRequest(`${process.env.DEV_URL}/api/tasks?status=All`);

    const response = await GET(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual(tasks);
  });

  test("handles errors correctly", async () => {
    const error = new Error("Something went wrong");
    (TaskFilterSchema.parse as jest.Mock).mockImplementation(() => {
      throw error;
    });

    const req = {
      url: `${process.env.DEV_URL}/tasks`,
    } as unknown as NextRequest;

    const res = {
      json: jest.fn().mockReturnValue({}),
    } as unknown as NextResponse;

    await GET(req);
    expect(handleError).toHaveBeenCalledWith(error);
  });
});
