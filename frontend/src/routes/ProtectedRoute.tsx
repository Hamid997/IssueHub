import { Navigate } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const { isAuthenticated } =
        useAuthContext();

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    return children;

}