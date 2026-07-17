import type { CurrentUser } from "../../services/authService";

interface AvatarProps {
    user: CurrentUser;
    size?: "small" | "large" | "profile";
}

export default function Avatar({
    user,
    size = "small",
}: AvatarProps) {
    const initials = user.username
        .substring(0, 2)
        .toUpperCase();

    const className =
        size === "profile"
            ? "profile-avatar"
            : size === "large"
                ? "avatar large"
                : "avatar";

    const API_URL = import.meta.env.VITE_API_URL;


    if (user.avatar_url) {
        return (
            <img
                src={`${API_URL}${user.avatar_url}`}
                alt={user.username}
                className={`${className} avatar-image`}
            />
        );
    }

    return (
        <div className={`${className} avatar-placeholder`}>
            {initials}
        </div>
    );
}