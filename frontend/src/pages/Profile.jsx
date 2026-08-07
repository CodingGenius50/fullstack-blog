/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("users/profile/");

      setProfile(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
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
        username,
        email,
        bio,
      });

      setProfile(res.data);

      setUsername(res.data.username);
      setEmail(res.data.email);
      setBio(res.data.bio || "");

      setEditMode(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setUsername(profile.username);
    setEmail(profile.email);
    setBio(profile.bio || "");
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-36"></div>

        {/* Profile */}
        <div className="px-8 pb-10">

          <div className="-mt-16 flex flex-col items-center">

            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">

              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
                {username.charAt(0).toUpperCase()}
              </div>

            </div>

            <h1 className="text-3xl font-bold mt-5">
              {username}
            </h1>

            <p className="text-gray-500 mt-1">
              {email}
            </p>

          </div>

          <div className="mt-10 space-y-6">

            {/* Username */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Username
              </label>

              {editMode ? (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <div className="bg-gray-100 rounded-xl p-3">
                  {username}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Email
              </label>

              {editMode ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <div className="bg-gray-100 rounded-xl p-3">
                  {email}
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Bio
              </label>

              {editMode ? (
                <textarea
                  rows="5"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <div className="bg-gray-100 rounded-xl p-4 min-h-[120px] whitespace-pre-wrap">
                  {bio || "No bio added yet."}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">

              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    💾 Save Changes
                  </button>

                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    ❌ Cancel
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;