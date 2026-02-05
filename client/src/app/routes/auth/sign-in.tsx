import { SignIn } from "@/pages/sign-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
