/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("users/profile/");
      setProfile(res.data);
      setBio(res.data.bio || "");
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
  try {
    const res = await api.patch("users/profile/", {
      bio: bio,
    });

    setProfile(res.data);
    alert("Profile updated successfully!");
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log(error);

    alert("Failed to update profile");
  }
};
  

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
            {profile.username.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {profile.username}
          </h1>

          <p className="text-gray-500 mt-2">
            {profile.email}
          </p>

        </div>

        <div className="mt-10">

          <label className="block font-semibold mb-2">
            Bio
          </label>

          <textarea
            rows="5"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={handleSave}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;