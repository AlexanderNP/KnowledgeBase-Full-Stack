import { useState } from "react";
import { localStorageWrite, localStorageRead, localStorageRemove } from "@/shared/lib";
import { AuthContext } from "..";
import { SESSION_ID_STORAGE_KEY, ACCESS_TOKEN_STORAGE_KEY } from "@/shared/constants";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [sessionId, setSessionId] = useState<string | null>(() =>
    localStorageRead(SESSION_ID_STORAGE_KEY),
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorageRead(ACCESS_TOKEN_STORAGE_KEY),
  );

  const logout = () => {
    setSessionId(null);
    setToken(null);
    localStorageRemove(SESSION_ID_STORAGE_KEY);
    localStorageRemove(ACCESS_TOKEN_STORAGE_KEY);
  };

  const login = (payload: { token: string; sessionId: string }) => {
    setSessionId(payload.sessionId);
    setToken(payload.token);
    localStorageWrite(ACCESS_TOKEN_STORAGE_KEY, payload.token);
    localStorageWrite(SESSION_ID_STORAGE_KEY, payload.sessionId);
  };

  const value = {
    token,
    sessionId,
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
