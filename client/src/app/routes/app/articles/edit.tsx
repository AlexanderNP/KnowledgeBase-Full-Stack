import { createFileRoute } from "@tanstack/react-router";
import { ArticleEdit } from "@/pages/article-edit";

export const Route = createFileRoute("/app/articles/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticleEdit />;
}
