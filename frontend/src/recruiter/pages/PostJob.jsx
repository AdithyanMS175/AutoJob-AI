import React, { useState } from 'react';

const PostJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    salary: ''
  });

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Post a New Job</h2>
        <p className="text-slate-400 mt-2">Create a job listing. Our AI will use these details to find the best candidates.</p>
      </div>

      <form className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
        
        {/* Job Title */}
        <div className="space-y-2">
          <label className="text-slate-300 font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Senior MERN Developer"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
            onChange={handleChange}
          />
        </div>

        {/* Location & Salary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-slate-300 font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Remote / New York"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300 font-medium">Salary Range</label>
            <input
              type="text"
              name="salary"
              placeholder="e.g. $80k - $120k"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Required Skills (Crucial for AI) */}
        <div className="space-y-2">
          <label className="text-slate-300 font-medium">Required Skills (Comma separated)</label>
          <input
            type="text"
            name="skills"
            placeholder="React, Node.js, AWS, Tailwind..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
            onChange={handleChange}
          />
          <p className="text-xs text-purple-400">
            * The AI uses these tags to score candidate resumes.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-slate-300 font-medium">Job Description</label>
          <textarea
            name="description"
            rows="6"
            placeholder="Describe the role responsibilities..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-slate-600"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all duration-200 transform hover:-translate-y-1"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;