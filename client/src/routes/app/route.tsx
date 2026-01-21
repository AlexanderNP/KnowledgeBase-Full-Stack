import { Header } from "@/app/ui/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useUserProfile } from "@/modules/user";

export const Route = createFileRoute("/app")({
  component: Home,
});
function Home() {
  useUserProfile();

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1366px] py-10">
          <Outlet />
        </div>
      </main>
    </>
  );
}
