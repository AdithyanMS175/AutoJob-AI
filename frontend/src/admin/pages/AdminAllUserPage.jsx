import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";


import { Trash2, Eye } from "lucide-react";
import {adminDeleteUserAPI} from "../../services/allAPI";
import {adminGetUsersAPI} from "../../services/allAPI";
import AdminUserModal from "../components/AdminModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("candidate");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    const result = await adminGetUsersAPI(reqHeader);
    if (result.status === 200) setUsers(result.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No Token Admin");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const result = await adminDeleteUserAPI(id, reqHeader);

    
    if (!result) {
      console.error("Delete API returned nothing");
      return;
    }

    if (result.status === 200) {
      setUsers(prev => prev.filter(u => u._id !== id));
    } else {
      console.error("Delete failed:", result);
    }
  };

  const filteredUsers = users.filter(u => u.role === roleFilter);

  return (
    <>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">All Users</h2>

        {/* Toggle */}
        <div className="flex gap-4">
          {["candidate", "recruiter"].map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-lg ${roleFilter === role
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400"
                }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}s
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-4">Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-t border-gray-800 hover:bg-gray-800/40">
                  <td className="p-4 text-white">{user.username}</td>
                  <td className="text-gray-400">{user.email}</td>
                  <td className="text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-end gap-4">
                    <Eye
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-400 cursor-pointer"
                    />
                    <Trash2
                      onClick={() => handleDelete(user._id)}
                      className="text-red-400 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <AdminUserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </>
  );
};

export default AdminUsers;
