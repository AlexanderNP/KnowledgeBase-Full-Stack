import { useContext } from "react";
import { AuthContext } from "@shared/contexts";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
