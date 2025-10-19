import { useQuery } from "@tanstack/react-query";
import { userControllerGetCategoryByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export function useUserQuery(payload: { sessionId: string | null; token: string | null }) {
  const options = userControllerGetCategoryByIdOptions({
    path: { id: payload.sessionId! },
    auth: payload.token!,
  });

  const query = useQuery({
    ...options,
    enabled: !!payload.sessionId,
  });

  return query;
}
