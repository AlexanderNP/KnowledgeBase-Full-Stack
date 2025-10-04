import { createContext } from "react";
import type { ThemeProviderState } from "./theme";
import type { AuthProviderState } from "./auth";
import type { UserProviderState } from "./user";

const initialStateTheme: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const initialStateAuth: AuthProviderState = {
  isAuth: false,
  logout: () => null,
  login: () => null,
};

const initialStateUser = {
  user: null,
  setUser: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initialStateTheme);
export const AuthContext = createContext<AuthProviderState>(initialStateAuth);
export const UserContext = createContext<UserProviderState>(initialStateUser);
