import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppProviders } from "@/app/AppProviders";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => (
  <>
    <AppProviders>
      <Outlet />
      <Toaster
        position="top-right"
        richColors
      />
      <TanStackRouterDevtools />
    </AppProviders>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
