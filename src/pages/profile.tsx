import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { UserProfile } from "@/context/context-api";
import Textfield from "@/components/input-field/input-field";
import { updateProfile } from "@/service/profile/update-profile";

const ProfilePage = () => {
  const { user } = UserProfile();

  const [name, setName] = useState<string>(user?.name || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || ""
  );
  const [loading, setLoading] = useState(false);

  const updateProfileUser = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    setLoading(true);
    updateProfileUser.mutate({
      name: name,
      profileImage: profileImage || "",
    });
  };

  useEffect(() => {
    setName(user?.name || "");
    setProfileImage(user?.profileImage || "");
  }, [user]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Update Profile
        </h1>
        <div className="space-y-6">
          <div className="mb-4">
            <Textfield
              name="name"
              label="Name"
              required={false}
              subtype="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center max-lg:w-full lg:flex-1 border border-dashed border-blue-900">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex items-center gap-5 lg:gap-20 lg:px-10 px-5 py-10 "
            >
              <div
                className="w-32 h-32 border border-dashed border-gray-300 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: profileImage
                    ? `url(${profileImage})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!profileImage && (
                  <span className="text-gray-500">Upload Image</span>
                )}
              </div>
            </label>
            <div>
              <p className="max:sm:hidden">Upload Profile Image</p>
            </div>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleUpdateProfile}
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-md focus:outline-none  ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-colorbuttom text-white hover:bg-color focus:ring-indigo-500"
            }`}
          >
            {loading ? "Updated" : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
