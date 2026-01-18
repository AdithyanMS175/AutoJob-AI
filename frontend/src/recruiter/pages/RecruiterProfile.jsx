import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { editUserAPI } from "../../services/allAPI";
import { getStoredUser } from "../../services/userStorage";

const RecruiterProfile = () => {
  const navigate = useNavigate();

  const [changePassword, setChangePassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [profile, setProfile] = useState({
    id: "",
    username: "",
    bio: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setProfile({
        id: user._id,
        username: user.username || "",
        bio: user.bio || "",
        password: "",
        cpassword: "",
      });
    }
  }, []);

  const handlePasswordMatch = (value) => {
    setProfile(prev => ({ ...prev, cpassword: value }));
    setPasswordMatch(profile.password === value);
  };

  const handleUpdateProfile = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    if (!profile.username || !profile.bio) {
      toast.warning("Username and bio are required");
      return;
    }

    if (changePassword) {
      if (!profile.password || !profile.cpassword) {
        toast.warning("Fill password fields");
        return;
      }
      if (!passwordMatch) {
        toast.warning("Passwords do not match");
        return;
      }
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = new FormData();
    reqBody.append("username", profile.username);
    reqBody.append("bio", profile.bio);

    if (changePassword) {
      reqBody.append("password", profile.password);
    }

    const result = await editUserAPI(profile.id, reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Profile updated");

      sessionStorage.setItem("user", JSON.stringify(result.data));

      if (changePassword) {
        sessionStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      }
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Recruiter Profile</h2>

      {/* Username */}
      <div>
        <label className="text-sm text-gray-400">Username</label>
        <input
          type="text"
          value={profile.username}
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
          className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="text-sm text-gray-400">Bio</label>
        <textarea
          rows={4}
          value={profile.bio}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
          className="w-full mt-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
        />
      </div>

      {/* Change Password Toggle */}
      {!changePassword ? (
        <button
          onClick={() => setChangePassword(true)}
          className="text-purple-400 text-sm hover:underline"
        >
          Change Password
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={profile.cpassword}
            onChange={(e) => handlePasswordMatch(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
        </div>
      )}

      {/* Save */}
      <button
        onClick={handleUpdateProfile}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-medium"
      >
        <Save size={16} /> Save Changes
      </button>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default RecruiterProfile;
