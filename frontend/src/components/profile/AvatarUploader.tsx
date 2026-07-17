import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useAuthContext from "../../hooks/useAuthContext";
import Avatar from "../base/Avatar";

export default function AvatarUploader() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const { currentUser } =
    useAuthContext();

  const { uploadAvatar, loading } =
    useAuth();

  if (!currentUser) return null;

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    await uploadAvatar(file);
  }

  return (
    <div className="avatar-upload-wrapper">

      <Avatar
        user={currentUser}
        size="profile"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={handleChange}
      />

    <button
      type="button"
      className="avatar-upload-button"
      disabled={loading}
      onClick={() => inputRef.current?.click()}
    >
      {loading ? "Uploading..." : "Change Avatar"}
    </button>

    </div>
  );
}