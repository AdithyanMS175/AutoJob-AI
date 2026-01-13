import React, { useState } from "react";
import ApplicationsTable from "./ApplicationsTable";

const JobCard = ({ job }) => {
  const [showApplications, setShowApplications] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl text-white font-semibold">
            {job.jobTitle}
          </h3>
          <p className="text-slate-400">{job.location}</p>
          <p className="text-purple-400 text-sm mt-1">
            {job.applications} Applicants
          </p>
        </div>

        <button
          onClick={() => setShowApplications(true)}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white"
        >
          View Applications
        </button>
      </div>

      {showApplications && (
        <ApplicationsTable
          applications={job.applications}
          onClose={() => setShowApplications(false)}
        />
      )}
    </div>
  );
};

export default JobCard;
