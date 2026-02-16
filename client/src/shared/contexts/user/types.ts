import { AppModule } from "@/shared/constants";
import type { User } from "@/shared/api/generated";

export type UserProviderState = {
  user: User | null;
  setUser: (user: User | null) => void;
  hasPermission: (module: keyof typeof AppModule, permission: "W" | "R") => boolean;
};
