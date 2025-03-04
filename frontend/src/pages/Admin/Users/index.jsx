import React, { useEffect, useState } from 'react';
import { Eye, Filter } from 'lucide-react';
import axios from 'axios';
import { successToaster } from '../../../utils/swal';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/user/users'); // Adjust API endpoint as needed
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'block' : 'active';
    try {
      const payload = { status: newStatus };
      await axios.put(`http://localhost:8000/api/user/status/${userId}`, payload); 
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      successToaster("User status updated successfully");
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'block': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        <div className="flex space-x-3">
          <button className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
            <Filter size={20} className="mr-2" /> Filters
          </button>
        </div>
      </div>

      {loading ? (
        <p className="p-6 text-center">Loading users...</p>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Registered on</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-600">#{user.id}</td>
                <td className="p-4 text-sm text-gray-900 font-medium">{user.fullName}</td>
                <td className="p-4 text-sm text-gray-600">{user.email}</td>
                <td className="p-4 text-sm text-gray-600">{user.createdAt}</td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${getStatusColor(user.status)}
                  `}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex space-x-3">
                  <Link to={`detail/${user.id}`} className="text-gray-600 hover:text-gray-900">
                    <Eye size={18} />
                  </Link>
                  <button
                    className="px-3 py-1 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: user.status === 'Active' ? '#EAB308' : '#10B981' }}
                    onClick={() => changeUserStatus(user.id, user.status)}
                  >
                    {user.status === 'active' ? 'Block' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
