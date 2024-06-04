import { MaxWidthWrapper } from "@/components/common/MaxWidthWrapper";
import TaskForm from "@/components/common/TaskForm";

export default function EditPage({
  searchParams,
}: {
  searchParams: { taskId: string };
}) {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center mt-4 mb-10">
        <span className="text-3xl font-bold text-foreground">
          Edit your Task
        </span>
        <TaskForm taskId={searchParams.taskId} />
      </div>
    </MaxWidthWrapper>
  );
}
