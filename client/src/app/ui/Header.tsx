import { Button } from "@/components/ui/button";
import { NotebookPen, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useUserContext } from "@/shared/contexts/user";
import { UserCardAvatar } from "@/entities/user";
import { ThemeSwitcher } from "@/features/theme-switcher/ui";
import { LogoutButton } from "@/features/logout";

export const Header = () => {
  const { user } = useUserContext();

  return (
    <header className="flex h-28 items-center gap-4 border-b px-3.5 py-5">
      <h1 className="mr-auto text-4xl font-bold transition-transform hover:scale-105">
        <Link to="/app">База знаний</Link>
      </h1>
      {user ? (
        <UserCardAvatar user={user}>
          <LogoutButton />
        </UserCardAvatar>
      ) : (
        <Button asChild>
          <Link to="/auth/sign-in">
            <UserRound />
            Войти
          </Link>
        </Button>
      )}
      <Button
        asChild
        variant="outline"
      >
        <Link to="/app/articles/edit">
          <NotebookPen />
          Создать статью
        </Link>
      </Button>
      <ThemeSwitcher />
    </header>
  );
};
