import { createFileRoute } from "@tanstack/react-router";
import { ArticleList } from "@/features/article-list/ui/ArticleList";
import { useQuery } from "@tanstack/react-query";
import { categoriesControllerGetCategoryByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export const Route = createFileRoute("/app/categories/$categoryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();

  const query = useQuery({
    ...categoriesControllerGetCategoryByIdOptions({
      path: {
        id: categoryId,
      },
    }),
  });

  return (
    <>
      <h1 className="mb-4">Категория: {query.data?.name}</h1>
      <ArticleList query={query} />
    </>
  );
}
