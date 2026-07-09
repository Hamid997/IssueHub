import { ClipboardCheck } from 'lucide-react';
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { logout } = useAuthContext();

    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate("/login");

    }
    return (
        <header className="navbar">
            <a href="">
                <strong><ClipboardCheck />IssueHub</strong>
            </a>
            <button onClick={handleLogout}>

                Logout

            </button>
        </header>)
}