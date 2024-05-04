import { Pencil, Trash } from "lucide-react";

export default function ListOfTasks() {
  const ListOfTasks = [
    {
      taskId: 1,
      taskTitle: "Task Title 1",
      taskDescription: "Task Description 1",
      taskStatus: "To Do",
    },
    {
      taskId: 2,
      taskTitle: "Task Title 2",
      taskDescription: "Task Description 2",
      taskStatus: "In Progress",
    },
    {
      taskId: 3,
      taskTitle: "Task Title 3",
      taskDescription: "Task Description 3",
      taskStatus: "Done",
    },
  ];

  return (
    <div className="flex flex-col">
      {ListOfTasks.map((task) => (
        <div key={task.taskId}>
          <div>
            <div className="grid grid-cols-2 items-center gap-40">
              <div className="flex flex-col gap-1">
                <span className="text-foreground text-2xl">
                  {task.taskTitle}
                </span>
                <span className="text-muted-foreground text-sm">
                  {task.taskDescription}
                </span>
              </div>

              <div className="grid grid-cols-2 items-center gap-6">
                <span className="text-muted-foreground">{task.taskStatus}</span>
                <div className="flex gap-2 justify-end">
                  <button className="text-primary-foreground bg-primary p-1 rounded">
                    <Pencil />
                  </button>
                  <button className="text-primary-foreground bg-primary p-1 rounded">
                    <Trash />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-3 h-0.5 border-t-0 bg-border" />
        </div>
      ))}
    </div>
  );
}
