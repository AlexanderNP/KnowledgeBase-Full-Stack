import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/articles/edit")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    const { hasPermission } = context;

    if (hasPermission("article", "W")) return;

    throw redirect({
      to: "/auth/sign-in",
      search: {
        redirect: location.href,
      },
    });
  },
});

function RouteComponent() {
  return <Outlet />;
}
