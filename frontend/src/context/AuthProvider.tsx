import {
    useState,
    type ReactNode,
} from "react";

import authService from "../services/authService";
import { AuthContext } from "./AuthContext";


interface Props {
    children: ReactNode;
}

export default function AuthProvider({
    children,
}: Props) {


    const [isAuthenticated, setIsAuthenticated] =
        useState(() =>
            authService.isAuthenticated()
        );

    function login() {

        setIsAuthenticated(true);

    }

    function logout() {

        authService.logout();

        setIsAuthenticated(false);

    }

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}