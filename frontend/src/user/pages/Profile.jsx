import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Bell,
  Shield,
  Upload,
  Save,
  Mail,
  ChevronRight
} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { InputGroup, TextArea } from '../components/InputGroup';
import SkillsInput from '../components/SkillsGroup';
import serverURL from '../../services/serverURL';
import { toast, ToastContainer } from 'react-toastify';
import { editUserAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { getStoredUser } from '../../services/userStorage';


function Profile() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    picture: "",
    phone: "",
    education: [
      { degree: "", institution: "", year: "" }
    ],
    experience: [
      { company: "", role: "", years: "", description: "" }
    ],
    skills: []
  });
  const [existingUserImage, setExistingUserImage] = useState("")
  const [preview, setPreview] = useState("")
  const [pswdMatch, setPswdMatch] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const navigate = useNavigate();
  const [isVerified,setIsVerfied] = useState(false)
  

  useEffect(() => {
    fetchUser();
  }, [])

  // console.log(userDetails);

  const fetchUser = () => {
    const storedUser = getStoredUser();
    console.log("storeduser", storedUser);
    

    if (storedUser) {
      const user = storedUser;

      setUserDetails({
        id: user._id || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        picture: user.picture || "",
        bio: user.bio || "",
        phone: user.phone || "",
        role: user.role || "",
        linkedin: user.linkedin || "",
        github: user.github || "",


        education:
          user.education && user.education.length > 0
            ? user.education
            : [{ degree: "", institution: "", year: "" }],

        experience:
          user.experience && user.experience.length > 0
            ? user.experience
            : [{ company: "", role: "", years: "", description: "" }],

        skills: user.skills || [],
      });

      setExistingUserImage(user.picture || "");
    }


  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // optional validation
    if (!file.type.startsWith("image/")) {
      toast.warning("Please select an image file");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.warning("Image must be less than 1MB");
      return;
    }

    // preview
    setPreview(URL.createObjectURL(file));

    // store file for FormData
    setUserDetails(prev => ({
      ...prev,
      picture: file
    }));
  };

  const checkPasswordMatch = (data) => {
    setUserDetails(prev => ({
      ...prev,
      cpassword: data
    }));

    setPswdMatch(prevPassword =>
      userDetails.password === data
    );
  };


  const handleUpdateUser = async () => {
    const {
      username,
      password,
      cpassword,
      bio,
      id,
      linkedin,
      github
    } = userDetails;

    // basic validation
    if (!username || !bio || !linkedin || !github) {
      toast.warning("Please fill the required fields");
      return;
    }

    // validate password ONLY if user chose to change it
    if (changePassword) {
      if (!userDetails.password || !userDetails.cpassword) {
        toast.warning("Please fill password fields");
        return;
      }

      if (!pswdMatch) {
        toast.warning("Passwords do not match");
        return;
      }
    }


    // token check
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login again");
      return;
    }

    //  header
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    // FormData using for-loop (YOUR STYLE)
    const reqBody = new FormData();

    for (let key in userDetails) {
      // skip password if not changing
      if (key === "password" && !changePassword) continue;

      // image handling
      if (key === "picture") {
        preview
          ? reqBody.append("picture", userDetails.picture)
          : reqBody.append("picture", existingUserImage);
      }

      // arrays / objects
      else if (
        key === "education" ||
        key === "skills" ||
        key === "experience"
      ) {
        reqBody.append(key, JSON.stringify(userDetails[key]));
      }

      // normal fields
      else {
        reqBody.append(key, userDetails[key]);
      }
    }

    //  API call
    const result = await editUserAPI(id, reqBody, reqHeader);

    // response handling
    if (result.status === 200) {
      toast.success("Profile updated successfully");

      sessionStorage.setItem("user", JSON.stringify(result.data));

      if (changePassword) {
        // force re-login
        sessionStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      console.log(result);
      toast.error("Something went wrong");
    }
  };




  // console.log(userDetails.education)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Profile Information</h3>
        <p className="text-gray-400">Update your photo and personal details here.</p>
      </div>

      <div className="flex items-center gap-6 pb-6 border-b border-white/5">

        {(preview || existingUserImage) ? (
          <img
            src={
              preview
                ? preview
                : existingUserImage.startsWith("https://lh3.googleusercontent.com/")
                  ? existingUserImage
                  : `${serverURL}/uploads/${existingUserImage}`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-xl"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
            JD
          </div>
        )}




        <div>
          <button
            type="button"
            onClick={() => document.getElementById("profileImage").click()}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Change Avatar
          </button>
          <input
            type="file"
            accept="image/*"
            hidden
            id="profileImage"
            onChange={(e) => handleImageChange(e)}
          />
          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup placeholder="User Name" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
          <InputGroup placeholder="Email Address" value={userDetails.email} disabled type="email" />

        </div>

        <div className="space-y-4">
          {!changePassword ? (
            <button
              type="button"
              onClick={() => setChangePassword(true)}
              className="text-sm text-purple-400 hover:underline"
            >
              Change Password
            </button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                placeholder="New Password"
                type="password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
              <InputGroup
                placeholder="Confirm Password"
                type="password"
                value={userDetails.cpassword || ""}
                onChange={(e) => checkPasswordMatch(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup placeholder="Phone" value={userDetails.phone} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} />

        </div>

        {/* <InputGroup placeholder="Job Title" /> */}
        <TextArea placeholder="Bio" value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} />

        {/* education */}
        <div>
          {userDetails.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <InputGroup
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...userDetails.education];
                  updated[index].degree = e.target.value;
                  setUserDetails({ ...userDetails, education: updated });
                }}
              />

              <InputGroup
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...userDetails.education];
                  updated[index].institution = e.target.value;
                  setUserDetails({ ...userDetails, education: updated });
                }}
              />

              <InputGroup
                placeholder="Year"
                type="text"
                value={edu.year}
                onChange={(e) => {
                  const updated = [...userDetails.education];
                  updated[index].year = e.target.value;
                  setUserDetails({ ...userDetails, education: updated });
                }}
              />
            </div>
          ))}


          <button
            type="button"
            onClick={() =>
              setUserDetails({
                ...userDetails,
                education: [
                  ...userDetails.education,
                  { degree: "", institution: "", year: "" }
                ],
              })
            }
          >
            + Add another education
          </button>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup placeholder="LinkedIn" value={userDetails.linkedin || ""} onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} />
          <InputGroup placeholder="Github" value={userDetails.github || ""} onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} />

        </div>

        {/* experience  */}
        <div>

          {userDetails.experience.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <InputGroup
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const updated = [...userDetails.experience];
                  updated[index].company = e.target.value;
                  setUserDetails({ ...userDetails, experience: updated });
                }}
              />

              <InputGroup
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const updated = [...userDetails.experience];
                  updated[index].role = e.target.value;
                  setUserDetails({ ...userDetails, experience: updated });
                }}
              />

              <InputGroup
                placeholder="Years"
                type="text"
                value={exp.years}
                onChange={(e) => {
                  const updated = [...userDetails.experience];
                  updated[index].years = e.target.value;
                  setUserDetails({ ...userDetails, experience: updated });
                }}
              />

              <TextArea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const updated = [...userDetails.experience];
                  updated[index].description = e.target.value;
                  setUserDetails({ ...userDetails, experience: updated });
                }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setUserDetails({
                ...userDetails,
                experience: [
                  ...userDetails.experience,
                  { company: "", role: "", years: "", description: "" }
                ],
              })
            }
          >
            + Add another experience
          </button>
        </div>


        <SkillsInput
          skills={userDetails.skills}
          setSkills={(skills) =>
            setUserDetails({ ...userDetails, skills })
          }
        />



        <div className="pt-4">
          <button type="button" onClick={handleUpdateUser} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
      <ToastContainer position='top-center' autoClose={3000} theme='colored' />

    </div>
  )
}

export default Profile