import {
  useState,
  type ReactNode,
} from "react";

import authService, {
  type CurrentUser,
} from "../services/authService";

import { AuthContext } from "./AuthContext";

interface AuthProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProps) {

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(
      authService.getUser()
    );

  const [isAuthenticated, setIsAuthenticated] =
    useState(
      authService.isAuthenticated()
    );

  function login(
    user: CurrentUser
  ) {

    authService.saveUser(user);

    setCurrentUser(user);

    setIsAuthenticated(true);

  }

  function logout() {

    authService.logout();

    setCurrentUser(null);

    setIsAuthenticated(false);

  }

  return (

    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        setCurrentUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}