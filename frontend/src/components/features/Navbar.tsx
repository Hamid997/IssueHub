import { ClipboardCheck } from 'lucide-react';
import useAuthContext from "../../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const { logout } = useAuthContext();

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }
    return (
        <header className="navbar">
            <Link to="/">
                <strong>
                    <ClipboardCheck />
                    IssueHub
                </strong>
            </Link>

            <button onClick={handleLogout}>
                Logout
            </button>
        </header>
    )
}