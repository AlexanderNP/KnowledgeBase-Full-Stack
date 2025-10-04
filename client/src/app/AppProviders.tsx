import { ThemeProvider } from "@/shared/contexts/ThemeProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
