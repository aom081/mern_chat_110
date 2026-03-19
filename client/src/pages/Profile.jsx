import { Camera, Mail, User } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [draftFullName, setDraftFullName] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toISOString().slice(0, 10)
    : "-";

  const displayedFullName = draftFullName ?? authUser?.fullName ?? "";

  const handleUpdateFullName = async () => {
    const trimmedName = displayedFullName.trim();
    if (!trimmedName || trimmedName === authUser?.fullName) return;
    await updateProfile({ fullName: trimmedName });
    setDraftFullName(null);
  };

  return (
    <div className="min-h-screen pt-20 bg-base-200 pb-6">
      <div className="flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-2xl bg-base-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-base-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-base-content/70 mt-1">
              Your profile information
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative">
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.webp"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-300"
              />

              <button
                type="button"
                className="absolute bottom-0 right-0 btn btn-circle btn-sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUpdatingProfile}
              >
                <Camera className="size-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>

            <p className="text-sm text-base-content/70">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-5">
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text text-base-content/80 flex items-center gap-2">
                  <User className="size-4" />
                  Full Name
                </span>
              </div>
              <input
                type="text"
                value={displayedFullName}
                onChange={(event) => setDraftFullName(event.target.value)}
                onBlur={handleUpdateFullName}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.currentTarget.blur();
                  }
                }}
                disabled={isUpdatingProfile}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text text-base-content/80 flex items-center gap-2">
                  <Mail className="size-4" />
                  Email Address
                </span>
              </div>
              <input
                type="email"
                value={authUser?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="mt-8 pt-6 border-t border-base-300">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center justify-between border-b border-base-300 pb-3">
                <span className="text-base-content/70">Member Since</span>
                <span>{memberSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
