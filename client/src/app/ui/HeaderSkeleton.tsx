import { Skeleton } from "@/components/ui/skeleton";

export const HeaderSkeleton = () => {
  return (
    <header className="flex h-28 items-center justify-between gap-4 border-b px-3.5 py-5">
      <Skeleton className="flex h-[35px] w-[200px]" />
      <Skeleton className="flex h-[80px] w-[350px]" />
    </header>
  );
};
