import { Button } from "@/components/ui/button";
import { useLogout } from "@/modules/auth/hooks/useLogout";

export function LogoutButton() {
  const { handleLogout } = useLogout();

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
    >
      Выйти
    </Button>
  );
}
