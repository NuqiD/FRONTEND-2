// pages/otp/verify.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OTPVerify() {
    const [token, setToken] = useState("");// State for OTP token
    const [error, setError] = useState(null);// State for error messages
    const [success, setSuccess] = useState(false);// State for success message
    const router = useRouter();// Initialize router for navigation

    // Handle OTP verification
    const handleVerify = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");// Get user ID from localStorage

        // Validate user ID
        try {
            const res = await fetch("https://tactic.chatngo.net/api/auth/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId, token }),
            });// Send POST request to verify OTP

            const data = await res.json();// Parse the response

            // Handle errors during verification
            if (!res.ok) {
                throw new Error(data.detail || "Verification failed");
            }

            // ✅ Save token and role from backend
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("role", data.role);

            setSuccess(true);
            setError(null);

            // ✅ Redirect based on actual returned role
            setTimeout(() => {
                switch (data.role) {
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
                        throw new Error("Unknown role: " + data.role);
                }
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };// Handle errors during verification

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