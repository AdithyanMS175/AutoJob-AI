import React, { useEffect, useState } from "react";
import { getAllSupportsAPI, replySupportAPI } from "../../services/allAPI";
import { toast, ToastContainer } from "react-toastify";

const AdminComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [replyText, setReplyText] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);


    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await getAllSupportsAPI(reqHeader);
            if (result.status === 200) {
                setComplaints(result.data);
            }
        } catch (err) {
            console.error("Failed to fetch complaints", err);
        }
    };


    const handleReply = async (id) => {
        const token = sessionStorage.getItem("token");
        if (!replyText) return toast.warning("Reply cannot be empty");

        const reqHeader = { Authorization: `Bearer ${token}` };
        const reqBody = { reply: replyText };

        const result = await replySupportAPI(id, reqBody, reqHeader);
        if (result.status === 200) {
            toast.success("Reply sent");
            setReplyText("");
            setActiveReplyId(null);
            fetchComplaints();
        }
    };

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");

        const reqHeader = { Authorization: `Bearer ${token}` };
        const result = await deleteSupportAPI(id, reqHeader);

        if (result.status === 200) {
            toast.success("Complaint deleted");
            setComplaints((prev) => prev.filter((c) => c._id !== id));
        }
    };

    const openComplaints = complaints.filter(
        (item) => item.status !== "resolved"
    );


    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 px-6 py-10">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        User Complaints
                    </h1>
                    <p className="text-gray-400">
                        Complaints and support requests submitted by users
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-[#111] border border-white/10 rounded-2xl">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="bg-[#161616] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Subject</th>
                                <th className="px-4 py-3">Message</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {openComplaints.length === 0  ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                                        No complaints found
                                    </td>
                                </tr>
                            ) : (
                                openComplaints.map((item) => (
                                    <React.Fragment key={item._id}>
                                        {/* Main Row */}
                                        <tr className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 text-white">
                                                {item.userId?.username}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.userId?.email}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-purple-400">
                                                {item.subject}
                                            </td>
                                            <td className="px-4 py-3 max-w-xs truncate">
                                                {item.message}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "open"
                                                        ? "bg-blue-600/30 text-blue-300"
                                                        : item.status === "resolved"
                                                            ? "bg-green-600/30 text-green-300"
                                                            : "bg-yellow-600/30 text-yellow-300"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(item.createdAt).toLocaleDateString("en-IN")}
                                            </td>
                                            <td className="px-4 py-3 space-y-2">
                                                <button
                                                    onClick={() =>
                                                        setActiveReplyId(activeReplyId === item._id ? null : item._id)
                                                    }
                                                    className="text-blue-400 hover:underline text-xs"
                                                >
                                                    Reply
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="text-red-400 hover:underline text-xs block"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Reply Row */}
                                        {activeReplyId === item._id && (
                                            <tr className="bg-[#0f0f0f]">
                                                <td colSpan="7" className="px-6 py-4">
                                                    <textarea
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        placeholder="Type your reply..."
                                                        className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white"
                                                    />
                                                    <button
                                                        onClick={() => handleReply(item._id)}
                                                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                                                    >
                                                        Send Reply
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={3000} theme='colored' />

        </div>
    );
};

export default AdminComplaints;
