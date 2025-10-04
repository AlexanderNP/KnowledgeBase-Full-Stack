import { useContext } from "react";
import { UserContext } from "@shared/contexts";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
