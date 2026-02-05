import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useUserContext } from "@/shared/contexts/user";
import { CategoryArticlesCard } from "@/pages/category-articles/ui/CategoryArticlesCard";
import { CategoryArticlesSkeleton } from "@/pages/category-articles/ui/CategoryArticlesSkeleton";
import { categoriesControllerGetCategoryByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export function CategoryArticles({ categoryId }: { categoryId: string }) {
  const { user } = useUserContext();

  const { data, isPending, isError } = useQuery({
    ...categoriesControllerGetCategoryByIdOptions({
      path: {
        id: categoryId,
      },
    }),
  });

  if (isPending) {
    return <CategoryArticlesSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex align-middle">
        <h1>Произошла ошибка при получение категории: {data?.name}</h1>
      </div>
    );
  }

  if (!data.articles.length) {
    return (
      <div>
        <div className="flex min-h-96 flex-col items-center justify-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <p className="text-2xl font-bold">Категория не содержит статей.</p>
            <Frown size={28} />
          </div>
          <p className="mb-3.5 text-2xl font-bold">Хотите добавить статью?</p>
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link to={user ? "/app/articles/edit" : "/auth/sign-in"}>Добавить</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-4">Категория: {data.name}</h1>
      <ul className="flex w-full flex-col gap-3.5">
        {data.articles?.map((article) => (
          <li key={article.id}>
            <CategoryArticlesCard {...article} />
          </li>
        ))}
      </ul>
    </>
  );
}
