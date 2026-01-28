import { Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { analyzeResumeATSAPI, autoFillProfileAPI, deleteResumeAPI, getUserAPI, uploadResumeAPI } from '../../services/allAPI';
import { toast, ToastContainer } from 'react-toastify';
import { getStoredUser } from '../../services/userStorage';
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { extractPdfText } from '../utils/extractPdfText';
import ResumeATSModal from '../components/ResumeATSModal';
import serverURL from '../../services/serverURL';



function ResumeSettings() {
    const [userDetails, setUserDetails] = useState({
        id: "",
        resumes: []
    });
    const [autoFillLoading, setAutoFillLoading] = useState(false);
    const [resumeText, setResumeText] = useState("");
    const [atsData, setAtsData] = useState(null);
    const [showATSModal, setShowATSModal] = useState(false);
    const [atsLoading, setAtsLoading] = useState(false);



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
    // console.log(userDetails);


    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        let extractedText = "";
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

        // Extract PDF text BEFORE upload
        if (file.type === "application/pdf") {
            extractedText = await extractPdfText(file);
            console.log("📄 Extracted Resume Text:", extractedText);
            setResumeText(extractedText);
            sessionStorage.setItem("resumeText", extractedText);

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


            sessionStorage.setItem(
                "user",
                JSON.stringify(result.data)
            );

            if (extractedText) {
                await analyzeATS(extractedText);
            }


            fetchUser();
            // confirmAutoFill();
        } else {
            console.log(result);
            toast.error("Resume upload failed");
        }
    };


    const handleAutoFillProfile = async () => {
        try {
            setAutoFillLoading(true);
            const storedResumeText = sessionStorage.getItem("resumeText");
            console.log(storedResumeText);

            if (!storedResumeText) {
                toast.error("Resume text not found. Please re-upload resume.");
                return;
            }


            const token = sessionStorage.getItem("token");
            if (!token) return;

            const reqHeader = {
                Authorization: `Bearer ${token}`
            };

            const reqBody = {
                resumeText: storedResumeText
            };

            const result = await autoFillProfileAPI(reqBody, reqHeader);

            if (result.status === 200) {
                sessionStorage.setItem("user", JSON.stringify(result.data));
                toast.success("Profile auto-filled from resume");

            }
        } catch {
            toast.error("Auto-fill failed");
        } finally {
            setAutoFillLoading(false);
        }
    };


    const confirmAutoFill = () => {
        toast.info(
            <div>
                <p>Do you want to auto-fill your profile using this resume?</p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleAutoFillProfile}
                        className="bg-green-600 px-3 py-1 rounded"
                    >
                        Yes
                    </button>
                </div>
            </div>,
            { autoClose: false }
        );
    };

    const handleDeleteResume = async (resumeName) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        const reqBody = {
            resumeName,
        };

        try {
            const result = await deleteResumeAPI(userDetails.id, reqBody, reqHeader);

            if (result.status === 200) {
                toast.success("Resume deleted");

                sessionStorage.setItem("user", JSON.stringify(result.data));

                setUserDetails((prev) => ({
                    ...prev,
                    resumes: prev.resumes.filter((r) => r !== resumeName),
                }));
            }
        } catch (err) {
            toast.error("Failed to delete resume");
        }
    };

    const analyzeATS = async (resumeText) => {
        try {
            setAtsLoading(true);
            const token = sessionStorage.getItem("token");
            if (!token) return;

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const reqBody = { resumeText };

            const result = await analyzeResumeATSAPI(reqBody, reqHeader);

            if (result.status === 200) {
                setAtsData(result.data);
                setShowATSModal(true);
            } else {
                toast.error("Failed to analyze resume ATS");
            }
        } catch (error) {
            toast.error("ATS analysis failed");
            console.error(error);
        } finally {
            setAtsLoading(false);
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
                            <div className="">
                                <a
                                    href={`${serverURL}/uploads/resumes/${resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 text-sm mx-3 rounded-lg cursor-pointer hover:bg-white p-1"
                                >
                                    View
                                </a>
                                <button
                                    onClick={() => handleDeleteResume(resume)}
                                    className="text-red-400 text-sm hover:bg-white p-1 rounded-lg cursor-pointer mx-3"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}


                </div>
            )}

            {userDetails.resumes.length > 0 && (
                <button
                    onClick={handleAutoFillProfile}
                    disabled={autoFillLoading}
                    className="px-4 py-2 rounded bg-purple-600 text-white flex items-center gap-2 disabled:opacity-60"
                >
                    {autoFillLoading && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {autoFillLoading ? "Updating Profile..." : "Auto-Fill Profile"}
                </button>
            )}

            {showATSModal && (
                <ResumeATSModal
                    data={atsData}
                    onClose={() => setShowATSModal(false)}
                    autoFillLoading={autoFillLoading}
                    onApply={() => {
                        setShowATSModal(false);
                        handleAutoFillProfile();
                    }}
                />
            )}


            {atsLoading && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-[#0f0f0f] p-6 rounded-xl border border-white/10 flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-white text-sm">
                            Analyzing resume ATS score…
                        </p>
                    </div>
                </div>
            )}



            <ToastContainer position='top-center' autoClose={3000} theme='colored' />

        </div>
    )
}

export default ResumeSettings