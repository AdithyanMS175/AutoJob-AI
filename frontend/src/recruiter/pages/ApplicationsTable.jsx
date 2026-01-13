import React, { useState } from "react";
import ApplicantModal from "./ApplicantModal";

const ApplicationsTable = ({ applications, onClose }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

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
              <td className="p-3">{app.user.name}</td>
              <td className="p-3">
                {app.user.skills.join(", ")}
              </td>
              <td className="p-3">
                <span className="text-yellow-400">{app.status}</span>
              </td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedApplicant(app.user)}
                  className="text-purple-400 hover:underline"
                >
                  View Profile
                </button>
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
