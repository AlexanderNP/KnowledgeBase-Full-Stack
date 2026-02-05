import { useAuthContext } from "@/shared/contexts/auth";
import { useUserContext } from "@/shared/contexts/user";

export function useLogout() {
  const { logout } = useAuthContext();
  const { setUser } = useUserContext();

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return {
    handleLogout,
  };
}
