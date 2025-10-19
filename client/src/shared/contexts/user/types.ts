import type { User } from "@/shared/api/generated";

export type UserProviderState = {
  user: User | null;
  setUser: (user: User | null) => void;
};
