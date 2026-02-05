import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/logout/model/useLogout";

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
