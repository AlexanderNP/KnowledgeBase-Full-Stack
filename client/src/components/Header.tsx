import { ThemeSwitcher } from "@/features/theme-switcher/ui";
import { Button } from "@/components/ui";
import { Link } from "@tanstack/react-router";
import { LogIn, UserRoundPlus } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex items-center gap-4 px-3.5 py-5">
      <h1 className="mr-auto text-4xl font-bold transition-transform hover:scale-105">
        <Link to="/app">База знаний</Link>
      </h1>
      <Button asChild>
        <Link to="/auth/sign-in">
          <UserRoundPlus />
          Войти
        </Link>
      </Button>
      <ThemeSwitcher />
    </div>
  );
};
