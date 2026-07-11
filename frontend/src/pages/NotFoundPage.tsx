import { Link } from "react-router-dom";
import { FileSearch } from "lucide-react";

export default function NotFoundPage() {
    return (
        <main className="not-found-page">
            <div className="not-found-card">
                <FileSearch size={64} />
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>The page you are looking for doesn't exist.</p>
                <Link
                    className="back-home-button"
                    to="/"
                >
                    Back to dashboard
                </Link>
            </div>
        </main>
    );
}