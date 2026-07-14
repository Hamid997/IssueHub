import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { register, loading } = useAuth();

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>,
    ) {
        e.preventDefault();
        if (
            !username.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            return;
        }
        if (password !== confirmPassword) {
            return;
        }
        await register({
            username,
            email,
            password,
        });
    }

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
        >
            <Link to="/register" className="navbar-logo register-logo">
                <ClipboardCheck />
                <h1>IssueHub</h1>
            </Link>

            <p>Create your account</p>

            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                />
            </label>
            <label>
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />
            </label>
            <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                />
            </label>
            <button
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? "Creating..."
                        : "Create Account"
                }
            </button>
            <p className={"underline_text"}>
                Already have an account?{" "}
                <Link to="/login" className={"underline_link"}>
                    Sign In
                </Link>
            </p>
        </form>
    );
}