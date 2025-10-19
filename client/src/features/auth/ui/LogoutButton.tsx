import { Button } from "@/components/ui";
import { useLogout } from "../model/useLogout";

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
