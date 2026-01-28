import React, { useEffect, useState } from "react";
import { InputGroup } from "../components/InputGroup";
import { Mail, Shield } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { createSupportAPI, getMySupportsAPI } from "../../services/allAPI";

function SupportSection() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [myComplaints, setMyComplaints] = useState([]);
    const [userId,setUserId] = useState("")

    useEffect(() => {
        fetchMyComplaints();
    }, []);

    const fetchMyComplaints = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const user = JSON.parse(sessionStorage.getItem("user"));

        const id = user._id;
        setUserId(id)

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        const result = await getMySupportsAPI(id, reqHeader);
        if (result.status === 200) {
            setMyComplaints(result.data);
        }
    };
    console.log(myComplaints)
    console.log(userId)

    const handleSubmitSupport = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Please login to continue");
            return;
        }
        if(!userId){
            toast.error("UserId Cannot get");
            return;
        }

        if (!subject || !message) {
            toast.warning("Please fill all fields");
            return;
        }

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        const reqBody = { userId,subject, message };

        const result = await createSupportAPI(reqBody, reqHeader);
        if (result.status === 201) {
            toast.success("Complaint submitted");
            setSubject("");
            setMessage("");
            fetchMyComplaints();
        }
    };

    return (
        <div className="space-y-12">
            {/* ================== SECTION 1 : CREATE COMPLAINT ================== */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Contact & Support
                    </h3>
                    <p className="text-gray-400">
                        Have a bug to report or need help? Reach out.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#161616] p-6 rounded-xl border border-white/5">
                        <Mail className="w-6 h-6 text-purple-400 mb-4" />
                        <h4 className="text-white font-medium mb-1">Email Support</h4>
                        <p className="text-gray-500 text-sm">support@autojobai.com</p>
                    </div>

                    <div className="bg-[#161616] p-6 rounded-xl border border-white/5">
                        <Shield className="w-6 h-6 text-blue-400 mb-4" />
                        <h4 className="text-white font-medium mb-1">Privacy Policy</h4>
                        <p className="text-gray-500 text-sm">Read our terms</p>
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                    <InputGroup
                        label="Subject"
                        placeholder="e.g., Billing Issue"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Message
                        </label>
                        <textarea
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white"
                            placeholder="Describe your issue..."
                        />
                    </div>

                    <button
                        onClick={handleSubmitSupport}
                        className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200"
                    >
                        Send Message
                    </button>
                </div>
            </div>

            {/* ================== SECTION 2 : MY COMPLAINTS ================== */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                    My Complaints
                </h3>

                {myComplaints.length === 0 ? (
                    <p className="text-gray-500">No complaints submitted yet.</p>
                ) : (
                    <div className="space-y-4">
                        {myComplaints.map((item) => (
                            <div
                                key={item._id}
                                className="bg-[#161616] border border-white/10 rounded-xl p-5"
                            >
                                <div className="flex justify-between">
                                    <h4 className="text-white font-medium">
                                        {item.subject}
                                    </h4>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${item.status === "resolved"
                                            ? "bg-green-600/30 text-green-300"
                                            : "bg-blue-600/30 text-blue-300"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <p className="text-gray-400 text-sm mt-2">
                                    {item.message}
                                </p>

                                {item.reply && (
                                    <div className="mt-4 bg-[#0f0f0f] p-4 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Admin Reply
                                        </p>
                                        <p className="text-green-400 text-sm">
                                            {item.reply}
                                        </p>
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 mt-3">
                                    Submitted on{" "}
                                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ToastContainer position="top-center" autoClose={3000} theme="colored" />
        </div>
    );
}

export default SupportSection;
