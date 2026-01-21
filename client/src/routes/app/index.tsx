import { createFileRoute } from "@tanstack/react-router";
import { CategoryList } from "@/modules/category";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoryList />;
}
