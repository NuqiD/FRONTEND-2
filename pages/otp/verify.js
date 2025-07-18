// pages/otp/verify.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OTPVerify() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleVerify = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role"); // Assuming this is saved earlier

    try {
      const res = await fetch("https://tactic.chatngo.net/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Verification failed");
      }

      setSuccess(true);
      setError(null);

      // Redirect based on role
      setTimeout(() => {
        switch (role) {
          case "admin":
            router.replace("/admin/dashboard");
            break;
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
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Enter OTP Code</h2>
      <form onSubmit={handleVerify} className="w-64">
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Verify OTP
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">Verified! Redirecting...</p>}
      </form>
    </div>
  );
}