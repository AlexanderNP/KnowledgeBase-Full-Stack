import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useUserContext } from "@/shared/contexts/user";
import { UserCardAvatar } from "@/modules/user";
import { ThemeSwitcher } from "@/features/theme-switcher/ui";
import { LogoutButton } from "@/modules/auth";

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
      <ThemeSwitcher />
    </header>
  );
};
