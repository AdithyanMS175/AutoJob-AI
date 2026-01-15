import { Briefcase, ClipboardPlus, FileUser, LayoutDashboard, LogOut } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const RecruiterLayout = () => {
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login")
  };

  const menuItems = [
    { name: 'Dashboard', path: '/recruiter/home', icon: <LayoutDashboard /> },
    { name: 'Post a Job', path: '/recruiter/post-job', icon: <ClipboardPlus /> },
    { name: 'My Jobs', path: '/recruiter/my-jobs', icon: <Briefcase /> },
    
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            AutoJob AI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Recruiter Portal</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-purple-400'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="cursor-pointer flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors w-full">
            <span><LogOut /></span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;