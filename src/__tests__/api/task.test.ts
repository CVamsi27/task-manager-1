import { GET, POST, PATCH, DELETE } from "../../app/api/task/route";
import { prisma } from "../../db";
import { MessageSchema, NewTaskSchema, TaskSchema } from "../../schema";
import { NextRequest } from "next/server";

jest.mock("../../db", () => ({
  prisma: {
    task: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock("../../schema", () => ({
  TaskFilterSchema: {
    parse: jest.fn(),
  },
  NewTaskSchema: {
    parse: jest.fn(),
  },
  TaskSchema: {
    parse: jest.fn(),
  },
  MessageSchema: {
    parse: jest.fn(),
  },
}));

describe("/api/task API endpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET returns a task with a specific taskId", async () => {
    const task = {
      taskId: "1",
      taskTitle: "Test Task",
      taskDescription: "Test Description",
      taskStatus: "Done",
    };

    (TaskSchema.parse as jest.Mock).mockReturnValue(task);
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(task);

    const req = new NextRequest(`${process.env.DEV_URL}/api/task?taskId=1`);

    const response = await GET(req);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual(task);
  });

  test("GET returns an error if the task does not exist", async () => {
    const taskId = "1";

    (TaskSchema.parse as jest.Mock).mockReturnValue(taskId);
    (prisma.task.findUnique as jest.Mock).mockResolvedValue(null);

    const req = new NextRequest(`${process.env.DEV_URL}/api/task?taskId=1`);

    const response = await GET(req);

    expect(response.status).toBe(500);
  });

  test("POST creates a new task", async () => {
    const newTask = {
      taskTitle: "New Task",
      taskDescription: "New Description",
      taskStatus: "To Do",
    };

    (NewTaskSchema.parse as jest.Mock).mockReturnValue(newTask);
    (prisma.task.create as jest.Mock).mockResolvedValue(newTask);

    const req = new NextRequest(`${process.env.DEV_URL}/api/task`, {
      method: "POST",
      body: JSON.stringify(newTask),
    });

    const response = await POST(req);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ message: "Task Created Successfully!" });
  });

  test("PATCH updates an existing task", async () => {
    const taskUpdate = {
      taskId: "1",
      taskTitle: "Updated Task",
      taskDescription: "Updated Description",
      taskStatus: "Completed",
    };

    (TaskSchema.parse as jest.Mock).mockReturnValue(taskUpdate);
    (prisma.task.update as jest.Mock).mockResolvedValue(taskUpdate);

    const req = new NextRequest(`${process.env.DEV_URL}/api/task`, {
      method: "PATCH",
      body: JSON.stringify(taskUpdate),
    });

    const response = await PATCH(req);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ message: "Task Updated Successfully!" });
  });

  test("DELETE removes a task", async () => {
    const taskId = "1";

    (MessageSchema.parse as jest.Mock).mockReturnValue(taskId);
    (prisma.task.delete as jest.Mock).mockResolvedValue({});

    const req = new NextRequest(`${process.env.DEV_URL}/api/task?taskId=1`, {
      method: "DELETE",
    });

    const response = await DELETE(req);

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ message: "Task Deleted Successfully!" });
  });
});
