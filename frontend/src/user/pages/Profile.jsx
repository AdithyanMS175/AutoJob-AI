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






function Profile() {




  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    picture: "",
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


  useEffect(() => {
    fetchUser();
  }, [])


  console.log(userDetails);

  const fetchUser = () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserDetails({
        id: user._id || "",
        username: user.username || "",
        email: user.email || "",
        password: user.password || "",
        picture: user.picture || "",
        bio: user.bio || "",
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


  const handleSubmit = async (id) => {
    console.log(userDetails)
  }



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
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Change Avatar</button>
          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup placeholder="User Name" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
          <InputGroup placeholder="Email Address" value={userDetails.email} disabled type="email" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup placeholder="Password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
          <InputGroup placeholder="Confirm Password" />
        </div>

        <InputGroup placeholder="Job Title" />
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
                type="number"
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
                type="number"
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
          <button type="button" onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile