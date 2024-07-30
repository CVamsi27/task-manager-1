export const prisma = {
  tasks: {
    findMany: jest.fn(),
  },
  task: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
