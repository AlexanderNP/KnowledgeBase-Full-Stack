import { Skeleton } from "@/components/ui/skeleton";

export function CategoryArticlesSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3.5">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-[600px] w-full"
        />
      ))}
    </div>
  );
}
