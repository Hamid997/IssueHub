import useAuthContext from "../../hooks/useAuthContext";
import InfoRow from "./InfoRow";

export default function ProfileCard() {

    const { currentUser } = useAuthContext();

    if (!currentUser) { return null; }

    const initials = currentUser.username.substring(0, 2).toUpperCase();

    return (

        <section className="profile-card">
            <div className="profile-header">
                <div className="profile-avatar">{initials}</div>
                <h1>{currentUser.username}</h1>
                <p>{currentUser.email}</p>
            </div>

            <div className="profile-section">
                <h2>Account Information</h2>
                <InfoRow
                    label="Username"
                    value={currentUser.username}
                />
                <InfoRow
                    label="Email"
                    value={currentUser.email}
                />
                <InfoRow
                    label="User ID"
                    value={currentUser.id}
                />
            </div>
        </section>
    );

}