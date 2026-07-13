import ProfileCard from "../components/features/ProfileCard";
import Navbar from "../components/features/Navbar";

export default function MyProfilePage() {
    return (
        <main className="page">
                                <Navbar />

            <section className="main">
                <div className="container">
                    <ProfileCard />
                </div>
            </section>
        </main>
    );
}