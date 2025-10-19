export type AuthProviderState = {
  token: string | null;
  sessionId: string | null;
  logout: () => void;
  login: (payload: { token: string; sessionId: string }) => void;
};
