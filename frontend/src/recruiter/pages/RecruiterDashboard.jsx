import React from 'react';

const StatCard = ({ title, count, trend }) => (
  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <div className="flex items-end justify-between mt-2">
      <span className="text-3xl font-bold text-white">{count}</span>
      <span className="text-purple-400 text-xs bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">
        {trend}
      </span>
    </div>
  </div>
);

const RecruiterDashboard = () => {


  
  return (
    <div className="space-y-8">
      {/* Header */}
      

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Active Jobs" count="12" trend="+2 this week" />
        <StatCard title="Total Applications" count="1,245" trend="+15% vs last month" />
        <StatCard title="AI Shortlisted" count="85" trend="High Match Rate" />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Role Applied</th>
                <th className="py-3 px-4">AI Match</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-medium">Adithyan M S</td>
                  <td className="py-3 px-4">MERN Stack Developer</td>
                  <td className="py-3 px-4">
                    <span className="text-purple-400 font-bold bg-purple-400/10 px-2 py-1 rounded border border-purple-500/20">
                      92%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">Dec 26, 2025</td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-purple-400 hover:text-purple-300 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;