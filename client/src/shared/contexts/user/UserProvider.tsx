import { useState } from "react";
import { UserContext } from "..";
import type { User } from "@/shared/api/generated";

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

  const value = {
    user,
    setUser: (user: User | null) => {
      setUser(user);
    },
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
