import { createContext } from "react";
import type { CurrentUser } from "../services/authService"

interface AuthContextType {
  isAuthenticated: boolean;

  currentUser: CurrentUser | null;

  login: (
    user: CurrentUser
  ) => void;

  logout: () => void;

  setCurrentUser: (
    user: CurrentUser | null
  ) => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(
    null
  );