import { ThemeProvider } from "@/shared/contexts/theme";
import { AuthProvider } from "@/shared/contexts/auth";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};
