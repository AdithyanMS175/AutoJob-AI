import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  adminGetJobsAPI,
  adminGetApplicationsAPI,
  adminDeleteJobAPI,
  adminDeleteApplicationAPI
} from "../../services/allAPI";
import AdminDetailModal from "../components/AdminDetailModal";
import { Trash2, Eye } from "lucide-react";

const AdminManageJobs = () => {
  const [view, setView] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    if (view === "jobs") {
      const res = await adminGetJobsAPI(reqHeader);
      if (res.status === 200) setJobs(res.data);
    } else {
      const res = await adminGetApplicationsAPI(reqHeader);
      if (res.status === 200) setApplications(res.data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    if (view === "jobs") {
      await adminDeleteJobAPI(id, reqHeader);
      setJobs(prev => prev.filter(j => j._id !== id));
    } else {
      await adminDeleteApplicationAPI(id, reqHeader);
      setApplications(prev => prev.filter(a => a._id !== id));
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Manage Jobs</h2>

        {/* Toggle */}
        <div className="flex gap-4">
          {["jobs", "applications"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg ${
                view === v
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-4">Title</th>
                <th>Info</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(view === "jobs" ? jobs : applications).map(item => (
                <tr key={item._id} className="border-t border-gray-800 hover:bg-gray-800/40">
                  <td className="p-4 text-white">
                    {view === "jobs"
                      ? item.jobTitle
                      : item.userId?.username}
                  </td>
                  <td className="text-gray-400">
                    {view === "jobs"
                      ? item.location
                      : item.jobId?.jobTitle}
                  </td>
                  <td className="p-4 flex justify-end gap-4">
                    <Eye
                      onClick={() => setSelectedItem(item)}
                      className="text-blue-400 cursor-pointer"
                    />
                    <Trash2
                      onClick={() => handleDelete(item._id)}
                      className="text-red-400 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <AdminDetailModal
            
            title={view === "jobs" ? "Job Details" : "Application Details"}
            data={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </div>
    </>
  );
};

export default AdminManageJobs;
