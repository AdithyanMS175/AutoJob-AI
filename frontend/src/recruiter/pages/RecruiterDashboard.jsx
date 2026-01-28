import React, { useEffect, useState } from 'react';
import { recruiterDashboardAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../../user/components/ChatBot/ChatBot/ChatBot';

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

  const navigate = useNavigate()
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = sessionStorage.getItem("token");
    const userrStorage = sessionStorage.getItem("user")
    const user = JSON.parse(userrStorage);
    const id = user._id

    const reqBody = {
      recruiterId: id,
    };

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const result = await recruiterDashboardAPI(reqBody,reqHeader);

    if (result.status === 200) {
      setStats(result.data.stats);
      setRecentApps(result.data.recentApplications);
    }
  };



  return (
    <div className="space-y-8">
      {/* Header */}


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Active Jobs"
          count={stats?.totalJobs || 0}
          trend="Live"
        />
        <StatCard
          title="Total Applications"
          count={stats?.totalApplications || 0}
          trend="All time"
        />
        
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
               
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {recentApps.map(app => (
                <tr
                  key={app._id}
                  className="border-b border-slate-800/50 hover:bg-slate-800/50"
                >
                  <td className="py-3 px-4 font-medium">
                    {app.userId?.username}
                  </td>
                  <td className="py-3 px-4">
                    {app.jobId?.jobTitle}
                  </td>
                 
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={()=>navigate('/recruiter/my-jobs')} className="text-sm text-purple-400 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ChatBot/>
    </div>
  );
};

export default RecruiterDashboard;