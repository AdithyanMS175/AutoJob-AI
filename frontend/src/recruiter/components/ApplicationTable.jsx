import React, { useState } from 'react';
import AIMatchBadge from './AIMatchBadge';
import StatusDropdown from './StatusDropdown';

const ApplicantTable = () => {
  // Dummy Data
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', matchScore: 92, status: 'Shortlisted', date: '2025-01-10' },
    { id: 2, name: 'Sam Smith', email: 'sam@example.com', matchScore: 45, status: 'Rejected', date: '2025-01-12' },
    { id: 3, name: 'Jordan Lee', email: 'jordan@example.com', matchScore: 78, status: 'Applied', date: '2025-01-15' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-400 text-sm uppercase tracking-wider border-b border-slate-800">
              <th className="p-4 font-medium">Candidate</th>
              <th className="p-4 font-medium">AI Match</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Applied Date</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-slate-800/50 transition-colors text-slate-300">
                <td className="p-4">
                  <div className="font-bold text-white">{candidate.name}</div>
                  <div className="text-xs text-slate-500">{candidate.email}</div>
                </td>
                <td className="p-4">
                  <AIMatchBadge score={candidate.matchScore} />
                </td>
                <td className="p-4">
                  <StatusDropdown 
                    currentStatus={candidate.status} 
                    onStatusChange={(val) => handleStatusChange(candidate.id, val)} 
                  />
                </td>
                <td className="p-4 text-sm text-slate-400">{candidate.date}</td>
                <td className="p-4 text-right">
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State Check */}
      {candidates.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          No applicants found.
        </div>
      )}
    </div>
  );
};

export default ApplicantTable;