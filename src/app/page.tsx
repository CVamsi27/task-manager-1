import FilterPane from "@/components/FilterPane";
import ListOfTasks from "@/components/ListOfTasks";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default function HomePage() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center">
        <header className="flex flex-col justify-between mt-4 mb-6 gap-4 font-bold text-foreground">
          <div className="flex flex-row items-center justify-center gap-10">
            <span className="text-3xl">My Tasks</span>
            <Link
              className="text-primary-foreground bg-primary px-3 py-1 rounded text-xl"
              href="/new"
            >
              + Add Task
            </Link>
          </div>
          <FilterPane />
        </header>
        <ListOfTasks />
      </div>
    </MaxWidthWrapper>
  );
}
