import { Button } from "@/components/ui/button";
import { useTheme } from "@/shared/contexts/useContext";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const handleChange = async (e: React.MouseEvent) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    await document.startViewTransition(() => {
      setTheme(newTheme);
    }).ready;

    const { clientX, clientY } = e;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0% at ${clientX}px ${clientY}px)`,
          `circle(200% at ${clientX}px ${clientY}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <Button
      variant="outline"
      onClick={handleChange}
    >
      {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
};
