import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/shared/constants";
import { ThemeContext } from "@shared/contexts";
import { localStorageRead, localStorageWrite } from "@/shared/lib/localStorage";
import type { Theme } from ".";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => localStorageRead(THEME_STORAGE_KEY) ?? defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setTheme(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorageWrite(THEME_STORAGE_KEY, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext
      {...props}
      value={value}
    >
      {children}
    </ThemeContext>
  );
};
