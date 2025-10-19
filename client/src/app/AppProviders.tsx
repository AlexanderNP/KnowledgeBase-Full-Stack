import { ThemeProvider } from "@/shared/contexts/theme";
import { AuthProvider } from "@/shared/contexts/auth";
import { UserProvider } from "@/shared/contexts/user";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};
