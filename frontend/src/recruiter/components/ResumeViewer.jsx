import React from 'react';

const ResumeViewer = ({ resumeUrl }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-[600px] flex flex-col">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
        <h3 className="text-slate-300 font-medium">Candidate Resume</h3>
        <a 
          href={resumeUrl} 
          target="_blank" 
          rel="noreferrer"
          className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 transition-colors"
        >
          Download PDF
        </a>
      </div>
      
      <div className="flex-1 bg-slate-800 relative">
        {resumeUrl ? (
          <iframe 
            src={`${resumeUrl}#toolbar=0`} 
            className="w-full h-full" 
            title="Resume PDF"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No resume selected
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeViewer;