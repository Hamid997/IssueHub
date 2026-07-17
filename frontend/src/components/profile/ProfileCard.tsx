import useAuthContext from "../../hooks/useAuthContext";
import InfoRow from "./InfoRow";
// import Avatar from "../base/Avatar";
import AvatarUploader from "./AvatarUploader";

export default function ProfileCard() {

    const { currentUser } = useAuthContext();

    if (!currentUser) {
        return null;
    }

    return (

        <section className="profile-card">

            <div className="profile-header">

<AvatarUploader />

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