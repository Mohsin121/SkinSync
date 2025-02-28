import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { successToaster, failureToaster } from "../../utils/swal";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/api/auth/send/verify-link/${email}`);
      successToaster("Verification link sent successfully.");
      setSent(true);
      setResendTimer(30); // Start 30-second cooldown for resend

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      failureToaster(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Forgot Password</h2>
      <p className="text-gray-600 mt-2">Enter your email address to reset your password.</p>

      {sent ? (
        <div className="mt-4 text-green-600 font-medium">
          A password reset link has been sent to <span className="font-semibold">{email}</span>. 
          Please check your inbox (or spam folder) and follow the instructions.
          <div className="mt-3 text-gray-600">
            Didn't receive an email?{" "}
            {resendTimer > 0 ? (
              <span className="text-gray-500">Resend in {resendTimer}s</span>
            ) : (
              <button
                onClick={handleSubmit}
                className="text-blue-600 font-medium hover:underline"
                disabled={loading}
              >
                Resend
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      <div className="mt-4 text-gray-600 text-sm">
        Remembered your password?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 font-medium hover:underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
