import { Navigate } from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";
import useAuthContext from "../hooks/useAuthContext";

export default function RegisterPage() {

    const { isAuthenticated } =
        useAuthContext();
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="login-page">
            <RegisterForm />
        </main>
    );

}