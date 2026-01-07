import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ id, title, applicantCount, status, postedDate }) => {
  const isClosed = status === 'Closed';

  return (
    <div className={`bg-slate-900 rounded-xl border p-6 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/10 ${isClosed ? 'border-slate-800 opacity-75' : 'border-slate-700 hover:border-purple-500'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">Posted: {postedDate}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${isClosed ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
          {status}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-lg">👥</span>
          <span className="font-bold">{applicantCount}</span>
          <span className="text-sm text-slate-500">Applicants</span>
        </div>
        
        <Link 
          to={`/recruiter/jobs/${id}`} 
          className="text-sm font-medium text-purple-400 hover:text-white transition-colors"
        >
          Manage Job →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;