import ListOfTasks from "@/components/ListOfTasks";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default function HomePage() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center">
        <header className="flex justify-between mt-4 mb-10 gap-60 text-2xl text-foreground">
          <span className="font-bold">Your Tasks</span>
          <Link className="text-primary-foreground bg-primary px-3 py-1 rounded" href="/new">New</Link>
        </header>
        <ListOfTasks />
      </div>
    </MaxWidthWrapper>
  );
}
