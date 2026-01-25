import { BriefcaseBusiness, House, LogOut, Settings, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import serverURL from '../../services/serverURL';

function Header() {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {

    const storedUser = sessionStorage.getItem("user");
    setUser(JSON.parse(storedUser))
  }, [])

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login")
  };


  return (

    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        {/* <div className="bg-linear-to-tr from-purple-500 to-blue-500 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div> */}
        <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
          AutoJob AI
        </span>
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex cursor-pointer items-center gap-2 hover:bg-white/5 px-3 py-2 rounded-full transition-all border border-transparent hover:border-white/10"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
            {user?.picture ? (
              <img
                src={`${serverURL}/uploads/${user.picture}`}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl shadow-2xl shadow-purple-900/20 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm text-white font-medium">
                  {user?.username || "User"}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.jobTitle || user?.role || "—"}
                </p>
              </div>
              <ul className="py-1">
                <Link to={'/user/home'}>

                  <li className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                   <House className="w-4 h-4" />  Home
                  </li>

                </Link>
                <Link to={'/user/myapplications'}>

                  <li className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                   <BriefcaseBusiness className="w-4 h-4" /> My Applications
                  </li>

                </Link>
                <Link to={'/user/settings'}>

                  <li className="px-4 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </li>

                </Link>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-red-500/10 cursor-pointer flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Header