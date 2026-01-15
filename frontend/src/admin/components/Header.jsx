import React, { useEffect, useState, useRef } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [openNotif, setOpenNotif] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
    }
  }, []);

  // Close notification on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  return (
    <header className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center border-b border-gray-700">
      <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>

      <div className="flex items-center gap-5 relative">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative text-gray-300 hover:text-white"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
          </button>

          {openNotif && (
            <div className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-3 text-sm text-gray-300 border-b border-gray-700">
                Notifications
              </div>
              <ul className="max-h-60 overflow-auto">
                <li className="px-4 py-2 hover:bg-gray-800 text-gray-300 text-sm">
                  New recruiter registered
                </li>
                <li className="px-4 py-2 hover:bg-gray-800 text-gray-300 text-sm">
                  New AI application processed
                </li>
                <li className="px-4 py-2 hover:bg-gray-800 text-gray-300 text-sm">
                  System health stable
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          {admin?.picture ? (
            <img
              src={`http://localhost:3000/uploads/${admin.picture}`}
              alt={admin.username}
              className="w-8 h-8 rounded-full object-cover border border-gray-600"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {admin?.username?.charAt(0).toUpperCase() || "A"}
            </div>
          )}

          <span className="text-gray-200 text-sm font-medium">
            {admin?.username || "Admin"}
          </span>
        </div>

        
      </div>
    </header>
  );
}

export default Header;
