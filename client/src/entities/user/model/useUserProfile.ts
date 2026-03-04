import { useUserContext } from "@/shared/contexts/user";
import { useAuthContext } from "@/shared/contexts/auth";
import { useEffect } from "react";
import { userControllerGetUserByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const { sessionId, token } = useAuthContext();
  const { setUser } = useUserContext();

  const { data, isLoading } = useQuery({
    ...userControllerGetUserByIdOptions({
      path: {
        id: sessionId!,
      },
    }),
    enabled: !!sessionId && !!token,
  });

  useEffect(() => {
    setUser(data ?? null);
  }, [data, setUser]);

  return {
    user: data,
    isLoading,
  };
}
