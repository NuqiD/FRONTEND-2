// pages/otp.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthNoNavbar from "layouts/AuthNoNavbar";
import { verifyOtp } from "../services/otpAuth"; // path depends on your folder structure

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await verifyOtp(otp);

      // Redirect by role
      const role = localStorage.getItem("preAuthRole");
      switch (role) {
        case "admin":
        case "user":
          router.replace("/admin/dashboard");
          break;
        case "hod":
          router.replace("/hod/dashboard");
          break;
        case "firewall":
          router.replace("/firewall/dashboard");
          break;
        case "analyst":
          router.replace("/securityanalyst/dashboard");
          break;
        default:
          throw new Error("Unknown role: " + role);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          className="w-full px-4 py-2 border rounded mb-3"
          maxLength={6}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

OTPVerification.layout = AuthNoNavbar;
export default OTPVerification;