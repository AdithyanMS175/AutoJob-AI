import React from 'react';

const StatusDropdown = ({ currentStatus, onStatusChange }) => {
  const options = ['Applied', 'Shortlisted', 'Interviewing', 'Rejected', 'Hired'];

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="appearance-none bg-slate-950 text-slate-300 text-sm border border-slate-700 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:border-purple-500 hover:border-slate-600 cursor-pointer transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {/* Custom Arrow Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default StatusDropdown;