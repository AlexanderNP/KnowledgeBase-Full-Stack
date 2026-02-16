import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import type { UserProviderState } from "@/shared/contexts/user";

type RouterContext = Omit<UserProviderState, "setUser">;

const RootLayout = () => (
  <>
    <Outlet />
    <Toaster
      position="top-right"
      richColors
    />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
