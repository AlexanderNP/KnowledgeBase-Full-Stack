import { useState } from "react";
import { UserContext } from "..";
import { AuthUserPermissons, NotAuthUserPermissons } from "./constants";
import type { User } from "@/shared/api/generated";
import type { AppModule } from "@/shared/constants";

type UserProviderProps = {
  children: React.ReactNode;
  defaultUserState?: null;
};

export const UserProvider = ({
  children,
  defaultUserState = null,
  ...props
}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultUserState);

  const hasPermission = (module: keyof typeof AppModule, permission: "W" | "R") => {
    if (!user) return NotAuthUserPermissons[module][permission];

    if (user.role === "ADMIN") return true;

    return AuthUserPermissons[module][permission];
  };

  const value = {
    user,
    setUser: (user: User | null) => {
      setUser(user);
    },
    hasPermission,
  };

  return (
    <UserContext
      {...props}
      value={value}
    >
      {children}
    </UserContext>
  );
};
