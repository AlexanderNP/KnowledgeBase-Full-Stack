export type AuthProviderState = {
  isAuth: boolean;
  logout: () => void;
  login: (token: string) => void;
};
