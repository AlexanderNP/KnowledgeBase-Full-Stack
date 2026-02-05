import { createFileRoute } from "@tanstack/react-router";
import { ArticlePreview } from "@/modules/articles";

export const Route = createFileRoute("/app/articles/$articleId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { articleId } = Route.useParams();

  return <ArticlePreview id={articleId} />;
}
