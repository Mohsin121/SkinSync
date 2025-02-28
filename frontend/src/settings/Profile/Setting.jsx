import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Loader2, Lock } from "lucide-react";
import { failureToaster, successToaster } from "../../utils/swal";
import axios from "axios";

const Setting = () => {
  const { currentTheme } = useTheme();
  const [errors, setErrors] = useState({});
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Validate passwords before submission
  const validatePasswords = () => {
    let isValid = true;
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for the field being changed
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    if (!validatePasswords()) return;

    setPasswordUpdateStatus("loading");
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://localhost:8000/api/user/update-password",
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPasswordUpdateStatus("success");
      successToaster("Password changed successfully");

      // Clear form after successful update
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setPasswordUpdateStatus(null);

      const errorMessage = error.response?.data?.message || "Something went wrong";
      setErrors((prev) => ({ ...prev, server: errorMessage }));
      failureToaster(errorMessage);
    }
  };


  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6">Account Settings</h3>

      <div
        className={`space-y-4 p-6 rounded-lg ${
          currentTheme === "midnight" ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <h4 className="font-medium flex items-center gap-2">
          <Lock
            size={18}
            className={
              currentTheme === "midnight" ? "text-cyan-400" : "text-gray-500"
            }
          />
          Change Password
        </h4>
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className={`block mb-2 text-sm ${
                  currentTheme === "midnight"
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  currentTheme === "midnight"
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Enter current password"
              />

              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block mb-2 text-sm ${
                  currentTheme === "midnight"
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                className={`w-full px-4 py-2 rounded-lg border ${
                  currentTheme === "midnight"
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Enter new password"
                onChange={handleInputChange}
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`mt-4 px-6 py-2 rounded-lg font-medium ${
              currentTheme === "midnight"
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-gray-500 hover:bg-gray-600 text-white"
            } transition-colors duration-200`}
          >
            {passwordUpdateStatus === "loading" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Update Password"
            )}
          </button>
        </form>

        {errors.server && (
          <p className="mt-1 text-sm text-red-500">{errors.server}</p>
        )}
      </div>
    </div>
  );
};

export default Setting;
