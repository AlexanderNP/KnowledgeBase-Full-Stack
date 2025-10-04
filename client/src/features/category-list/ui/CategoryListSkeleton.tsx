import { Skeleton } from "@/components/ui/skeleton";

export function CategoryListSkeleton() {
  return (
    <div className="flex flex-wrap justify-between gap-3.5">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-[300px] w-[350px]"
        />
      ))}
    </div>
  );
}
