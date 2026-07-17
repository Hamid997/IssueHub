import { createContext } from "react";
import type { User } from "../types/User";

export type CurrentUser = User;

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
  setCurrentUser: (user: CurrentUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>( null );