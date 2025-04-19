import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { getUserProfile } from "@/services/userService"; // ✅ Removed unused `updateUserProfile`

interface UserProfile {
  username: string;
  ethereumAddress: string;
  avatarUrl?: string;
  bio?: string;
}

const UserProfile = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null); // ✅ Typed state

  useEffect(() => {
    if (user?.ethereumAddress && token) {
      getUserProfile(user.ethereumAddress, token).then(setProfile);
    }
  }, [user, token]);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">👤 User Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Ethereum Address:</strong> {profile.ethereumAddress}</p>
      {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
      {/* Add avatar or additional fields if needed */}
    </div>
  );
};

export default UserProfile;
