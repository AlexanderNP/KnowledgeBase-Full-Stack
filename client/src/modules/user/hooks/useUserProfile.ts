import { useUserContext } from "@/shared/contexts/user";
import { useAuthContext } from "@/shared/contexts/auth";
import { useEffect } from "react";
import { userControllerGetCategoryByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const { sessionId, token } = useAuthContext();
  const { setUser } = useUserContext();

  const { data } = useQuery({
    ...userControllerGetCategoryByIdOptions({
      path: {
        id: sessionId!,
      },
      auth: token!,
    }),
    enabled: !!sessionId || !!token,
  });

  useEffect(() => setUser(data ?? null), [data, setUser]);
}
