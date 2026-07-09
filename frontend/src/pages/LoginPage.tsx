import LoginForm from "../components/auth/LoginForm";
import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function LoginPage() {
    const { isAuthenticated } =
        useAuthContext();

    if (isAuthenticated) {

        return <Navigate to="/" replace />;

    }

    return (
        <main className="login-page">

            <LoginForm />

        </main>
    );
}