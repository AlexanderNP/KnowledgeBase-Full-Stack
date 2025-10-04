import { Header } from "@/components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: Home,
});
function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1366px] pb-10">
          <Outlet />
        </div>
      </main>
    </>
  );
}
