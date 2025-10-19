import { useUserContext } from "@/shared/contexts/user";
import { useAuthContext } from "@/shared/contexts/auth";
import { useUserQuery } from "../api/useUserQuery";
import { useEffect } from "react";

export function useUserProfile() {
  const { sessionId, token } = useAuthContext();
  const { setUser } = useUserContext();

  const { data } = useUserQuery({ sessionId, token });

  useEffect(() => setUser(data ?? null), [data, setUser]);
}
