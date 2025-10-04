import { createFileRoute } from "@tanstack/react-router";
import { FormSignIn } from "@/features/auth/ui/FormSignIn";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <FormSignIn />
    </div>
  );
}
