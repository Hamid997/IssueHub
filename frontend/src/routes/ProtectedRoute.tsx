import { Navigate } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: Props) {

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