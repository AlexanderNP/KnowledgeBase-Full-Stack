import { createFileRoute } from "@tanstack/react-router";
import { CategoryList } from "@/features/category-list/ui/CategoryList";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryList />;
}
