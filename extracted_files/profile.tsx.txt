import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const Profile = () => {
  const { user, refreshUserProfile, token } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    avatarUrl: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated || !user?.ethereumAddress) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/users/${user.ethereumAddress}`);
        setFormData({
          username: res.data.username || "",
          bio: res.data.bio || "",
          avatarUrl: res.data.avatarUrl || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch profile", err);
        setMessage("❌ Error fetching profile");
      }
    };

    fetchProfile();
  }, [user, isAuthenticated]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (avatarFile && user?.ethereumAddress) {
        const formDataObj = new FormData();
        formDataObj.append("avatar", avatarFile);
        formDataObj.append("ethereumAddress", user.ethereumAddress);

        const avatarRes = await api.post("/api/users/avatar", formDataObj);
        formData.avatarUrl = avatarRes.data.avatarUrl;
      }

      await api.put(
        "/api/users/update",
        {
          username: formData.username,
          bio: formData.bio,
          avatarUrl: formData.avatarUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Profile updated successfully!");
      await refreshUserProfile();
    } catch (err) {
      console.error("❌ Error updating profile", err);
      setMessage("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <p className="text-center mt-8 text-red-500">
        Please log in with MetaMask to access your profile.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {formData.avatarUrl && (
        <Image
          src={formData.avatarUrl}
          alt="avatar"
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username:</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Upload Avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default Profile;
