import React, { useState } from "react";
import ApplicationsTable from "./ApplicationsTable";
import { MdDelete } from "react-icons/md";
import { deleteJobAPI } from "../../services/allAPI";

const JobCard = ({ job,onJobDeleted  }) => {
  const [showApplications, setShowApplications] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
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

    const result = await deleteJobAPI(job._id, reqBody, reqHeader);

    if (result.status === 200) {
      onJobDeleted(job._id); 
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative">
      <div onClick={handleDelete} className="bg-red-500 w-8 rounded-full text-white flex justify-center cursor-pointer p-1 absolute right-0 top-0"><MdDelete className="text-2xl" /></div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-white font-semibold">
            {job.jobTitle}
          </h3>

          <p className="text-slate-400">{job.location}</p>

          <p className="text-purple-400 text-sm mt-1">
            {job?.applicantCount} Applicants
          </p>
        </div>

        {job.applicantCount > 0 && (
          <button
            onClick={() => setShowApplications(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white"
          >
            View Applications
          </button>
        )}
      </div>

      {showApplications && (
        <ApplicationsTable
          job={job}
          onClose={() => setShowApplications(false)}
        />
      )}
    </div>
  );
};

export default JobCard;
