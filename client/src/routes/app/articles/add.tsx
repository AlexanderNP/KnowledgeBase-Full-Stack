import { createFileRoute } from "@tanstack/react-router";
import { ArticleAdd } from "@/modules/articles/components/ArticleAdd";

export const Route = createFileRoute("/app/articles/add")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticleAdd />;
}
