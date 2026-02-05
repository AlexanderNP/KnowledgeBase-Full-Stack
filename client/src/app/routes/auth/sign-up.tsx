import { SignUp } from "@/pages/sign-up";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignUp />
    </div>
  );
}
