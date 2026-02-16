import { router } from "./constants";
import { ThemeProvider } from "@/shared/contexts/theme";
import { AuthProvider } from "@/shared/contexts/auth";
import { UserProvider, useUserContext } from "@/shared/contexts/user";
import { RouterProvider } from "@tanstack/react-router";
import { useUserProfile } from "@/entities/user";

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppProviders = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <AppWithUser />
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const AppWithUser = () => {
  useUserProfile();

  const { hasPermission, user } = useUserContext();

  return (
    <RouterProvider
      router={router}
      context={{ hasPermission, user }}
    />
  );
};
