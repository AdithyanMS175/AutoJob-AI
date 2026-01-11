import { Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getUserAPI, uploadResumeAPI } from '../../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import { getStoredUser } from '../../services/userStorage';

function ResumeSettings() {



    const [userDetails, setUserDetails] = useState({
        id: "",
        resumes: []
    });

    useEffect(() => {
        fetchUser();
    }, [])


    const fetchUser = async () => {
        const token = sessionStorage.getItem("token");
        const storedUser = getStoredUser();
        const id = storedUser._id;
        // console.log(token,id);
        

        if (!token || !storedUser) return;

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        const result = await getUserAPI(id, reqHeader);

        if (result.status === 200) {
            sessionStorage.setItem("user", JSON.stringify(result.data));

            setUserDetails({
                id: result.data._id,
                resumes: result.data.resumes || [],
            });
        }
    };
    console.log(userDetails);


    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // validation
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.warning("Only PDF or DOCX files are allowed");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.warning("Resume must be under 10MB");
            return;
        }

        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Unauthorized. Please login again");
            return;
        }

        // FormData
        const reqBody = new FormData();
        reqBody.append("resumes", file); // MUST match multer

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        // API call
        const result = await uploadResumeAPI(
            userDetails.id,
            reqBody,
            reqHeader
        );

        // response handling
        if (result.status === 200) {
            toast.success("Resume uploaded successfully");

            // update session storage
            sessionStorage.setItem(
                "user",
                JSON.stringify(result.data)
            );

            // refresh local state
            fetchUser();
        } else {
            console.log(result);
            toast.error("Resume upload failed");
        }
    };




    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Resume & AI Context</h3>
                <p className="text-gray-400">Upload your base resume so our AI can tailor it for jobs.</p>
            </div>

            <div onClick={() => document.getElementById("resumeUploadInput").click()} className="bg-[#161616] border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-purple-500/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-purple-400" />
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        hidden
                        id="resumeUploadInput"
                        onChange={(e) => handleResumeUpload(e)}
                    />

                </div>
                <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-sm">PDF, DOCX up to 10MB</p>
            </div>

            {userDetails.resumes.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">
                        Uploaded Resumes
                    </h4>

                    {userDetails.resumes.map((resume, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-[#161616] border border-white/10 rounded-xl px-4 py-3"
                        >
                            <span className="text-gray-300 text-sm truncate">
                                {resume}
                            </span>

                            <a
                                href={`http://localhost:3000/uploads/resumes/${resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 text-sm hover:underline"
                            >
                                View
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">AI Customization Rules</h4>
                <div className="p-4 bg-[#161616] rounded-xl border border-white/5">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded bg-gray-800 border-gray-600 text-purple-600 focus:ring-purple-500" defaultChecked />
                        <div>
                            <span className="text-white text-sm font-medium">Auto-Emphasize Skills</span>
                            <p className="text-gray-500 text-xs mt-1">Allow AI to rearrange your skills based on the job description.</p>
                        </div>
                    </label>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={3000} theme='colored' />

        </div>
    )
}

export default ResumeSettings