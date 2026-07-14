import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";

export default function LoginForm() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const { login, loading } = useAuth();

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {

        e.preventDefault();

        if (!email.trim() || !password.trim()) {

            return;

        }
        await login(
            email,
            password,
        );

    }

    return (

        <form className="login-form" onSubmit={handleSubmit}>

            <Link to="/login" className="navbar-logo login-logo">
                <ClipboardCheck />
                <h1>IssueHub</h1>
            </Link>

            <p>Sign in to your account</p>

            <label>
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
            </label>

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className={"underline_text"} >
                Don't have an account?{" "}
                <Link to="/register" className={"underline_link"}>
                    Create one
                </Link>
            </p>
        </form>
    );
}