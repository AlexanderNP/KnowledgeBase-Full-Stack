import { useState } from "react";
import { localStorageWrite, localStorageRead, localStorageRemove } from "@/shared/lib";
import { AuthContext } from "..";
import { IS_AUTH_STORAGE_KEY, ACCESS_TOKEN_STORAGE_KEY } from "@/shared/constants";

type AuthProviderProps = {
  children: React.ReactNode;
  defaultAuthState?: boolean;
};

export const AuthProvider = ({
  children,
  defaultAuthState = false,
  ...props
}: AuthProviderProps) => {
  const [isAuth, setAuth] = useState<boolean>(
    () => localStorageRead(IS_AUTH_STORAGE_KEY) ?? defaultAuthState,
  );

  const logout = () => {
    setAuth(false);
    localStorageWrite(IS_AUTH_STORAGE_KEY, false);
    localStorageRemove(ACCESS_TOKEN_STORAGE_KEY);
  };

  const login = (token: string) => {
    localStorageWrite(ACCESS_TOKEN_STORAGE_KEY, token);
    localStorageWrite(IS_AUTH_STORAGE_KEY, true);
    setAuth(true);
  };

  const value = {
    isAuth,
    logout,
    login,
  };

  return (
    <AuthContext
      {...props}
      value={value}
    >
      {children}
    </AuthContext>
  );
};
