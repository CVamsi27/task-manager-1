-- CreateTable
CREATE TABLE "Todo" (
    "taskId" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "taskStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("taskId")
);
