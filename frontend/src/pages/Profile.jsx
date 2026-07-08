import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("users/profile/");
        setProfile(res.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <p className="text-gray-500 font-medium">Username</p>
            <p className="text-xl font-semibold">{profile.username}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Email</p>
            <p className="text-xl font-semibold">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Bio</p>
            <p className="text-lg">
              {profile.bio || "No bio added"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;