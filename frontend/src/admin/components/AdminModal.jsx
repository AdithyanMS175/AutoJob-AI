import React from "react";
import { X } from "lucide-react";

const AdminUserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
          <X />
        </button>

        <div className="flex items-center gap-4">
          {user.picture ? (
            <img
              src={`http://localhost:3000/uploads/${user.picture}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
              {user.username[0]}
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-white">{user.username}</h3>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-purple-400 capitalize">{user.role}</p>
          </div>
        </div>

        {user.skills?.length > 0 && (
          <div className="mt-4">
            <p className="text-white font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <span key={skill} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.bio && (
          <p className="mt-4 text-gray-300">{user.bio}</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserModal;
