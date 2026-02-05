import { createFileRoute } from "@tanstack/react-router";
import { CategoryArticles } from "@/pages/category-articles";

export const Route = createFileRoute("/app/categories/$categoryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();

  return (
    <>
      <CategoryArticles categoryId={categoryId} />
    </>
  );
}
