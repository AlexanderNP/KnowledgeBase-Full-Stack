import { AppModule } from "@/shared/constants";

export const AuthUserPermissons = {
  [AppModule.article]: {
    W: true,
    R: true,
  },
  [AppModule.category]: {
    W: false,
    R: true,
  },
  [AppModule.comment]: {
    W: true,
    R: true,
  },
} as const;

export const NotAuthUserPermissons = {
  [AppModule.article]: {
    W: false,
    R: true,
  },
  [AppModule.category]: {
    W: false,
    R: true,
  },
  [AppModule.comment]: {
    W: false,
    R: true,
  },
} as const;
