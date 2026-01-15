import React, { useEffect, useState } from "react";
import ApplicantModal from "./ApplicantModal";
import { deleteApplicationAPI, getJobApplicants } from "../../services/allAPI";
import { MdDelete } from "react-icons/md";

const ApplicationsTable = ({ job, onClose }) => {
  const [applications, setApplications] = useState([])
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // console.log(job)


  useEffect(() => {
    fetchApplicants();
  }, []);


  const fetchApplicants = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      const recruiterId = user._id;

      console.log("Fetching applicants for job:", job._id);

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const reqBody = { recruiterId };

      const result = await getJobApplicants(job._id, reqBody, reqHeader);

      console.log("Applicants API response:", result.data);

      if (result.status === 200) {
        setApplications(result.data);
        console.log(applications);

      }
    } catch (err) {
      console.error(err);
    }
  };


  const handleDeleteApplication = async (applicationId) => {
    const confirmDelete = window.confirm(
      "Remove this applicant from the job?"
    );
    if (!confirmDelete) return;

    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = {
      recruiterId: user._id,
    };

    const result = await deleteApplicationAPI(
      applicationId,
      reqBody,
      reqHeader
    );

    if (result.status === 200) {
      // remove from UI instantly
      setApplications(prev =>
        prev.filter(app => app._id !== applicationId)
      );
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        <h4 className="text-lg text-white">Applicants</h4>
        <button onClick={onClose} className="text-red-400">Close</button>
      </div>

      <table className="w-full text-left border border-slate-700">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Skills</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id} className="border-t border-slate-700">
              <td className="p-3">{app.userId.username}</td>
              <td className="p-3">
                {app.userId.skills.join(", ")}
              </td>
              <td className="p-3">
                <span className="text-yellow-400">{app.status}</span>
              </td>
              <td className="p-3 flex gap-3 items-center">
                <button
                  onClick={() => setSelectedApplicant(app.userId)}
                  className="text-purple-400 hover:underline"
                >
                  View Profile
                </button>

                <MdDelete
                  onClick={() => handleDeleteApplication(app._id)}
                  className="text-red-500 cursor-pointer text-xl"
                  title="Remove applicant"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApplicant && (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
};

export default ApplicationsTable;
