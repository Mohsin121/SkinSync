import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { successToaster } from "../../../utils/swal";
import UserOrders from "./UserOrders"; // Import the new Orders component

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const fetchUserDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/user/detail/${id}`); // Adjust API endpoint as needed
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeUserStatus = async (currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'block' : 'active';
    try {
      const payload = { status: newStatus };
      await axios.put(`http://localhost:8000/api/user/status/${user.id}`, payload); 
      setUser((prev) => ({ ...prev, status: newStatus }));
      successToaster("User status updated successfully");
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const getInitials = (name) => {
    return name 
      ? name.split(' ').map(word => word[0]).join('').toUpperCase() 
      : '';
  };

  if (loading) {
    return <p className="p-6 text-center">Loading user details...</p>;
  }

  if (!user) {
    return <p className="p-6 text-center text-red-500">User not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold text-gray-600">
          {getInitials(user?.fullName)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user?.fullName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500 text-sm">Registered on: {user.createdAt}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Status</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
          {user.status}
        </span>
      </div>

      <div className="mt-6">
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: user.status === "active" ? "#EAB308" : "#10B981" }}
          onClick={() => changeUserStatus(user.status)}
        >
          {user.status === "active" ? "Block User" : "Activate User"}
        </button>
      </div>

      {/* Add the Orders component */}
      <UserOrders />
    </div>
  );
};

export default UserDetail;