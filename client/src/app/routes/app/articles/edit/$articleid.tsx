import { createFileRoute } from "@tanstack/react-router";
import { ArticleEdit } from "@/pages/article-edit";

export const Route = createFileRoute("/app/articles/edit/$articleid")({
  component: RouteComponent,
});

function RouteComponent() {
  const { articleid } = Route.useParams();

  return <ArticleEdit id={articleid} />;
}
