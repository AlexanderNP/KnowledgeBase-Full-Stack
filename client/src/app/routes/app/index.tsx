import { createFileRoute } from "@tanstack/react-router";
import { Categories } from "@/pages/categories";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Categories />;
}
