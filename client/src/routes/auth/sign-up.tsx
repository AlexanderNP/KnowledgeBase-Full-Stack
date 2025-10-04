import { createFileRoute } from "@tanstack/react-router";
import { FormSignUp } from "@/features/auth/ui/FormSignUp";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <FormSignUp />
    </div>
  );
}
