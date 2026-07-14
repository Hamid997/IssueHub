import Navbar from "../components/features/Navbar";
import ChangePasswordCard
from "../components/settings/ChangePasswordCard";

export default function SettingsPage() {

    return (
<>
            <Navbar />

        <div className="container">

            <div className="settings-page">

                <h1>
                    Settings
                </h1>

                <ChangePasswordCard />

            </div>

        </div>

</>

    );

}