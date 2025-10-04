import { ArticleCard } from "@/entities/article-card/ui/ArticleCard";
import { ArticleListSkeleton } from "./ArticleListSkeleton";
import { Frown } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CategoryById } from "@/shared/api/generated/types.gen";

export function ArticleList({ query }: { query: UseQueryResult<CategoryById, Error> }) {
  const { data: categoryById, isError, isPending } = query;

  if (isPending) {
    return <ArticleListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex align-middle">
        <h1>Произошла ошибка при получение категории: ${categoryById?.name}</h1>
      </div>
    );
  }

  if (!categoryById.articles.length) {
    return (
      <div>
        <div className="flex min-h-96 flex-col items-center justify-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <p className="text-2xl font-bold">Категория не содержит статей.</p>
            <Frown size={28} />
          </div>
          <p className="text-2xl font-bold">Хотите добавить статью?</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-3.5">
      {categoryById.articles?.map((article) => (
        <li key={article.id}>
          <ArticleCard {...article} />
        </li>
      ))}
    </ul>
  );
}
