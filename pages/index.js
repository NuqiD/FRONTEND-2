import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthNoNavbar from "layouts/AuthNoNavbar.js";
import { AuthContext } from "context/AuthContext";

// Async login function
const loginUser = async (username, password) => {
  const response = await fetch("https://tactic.chatngo.net/api/auth/login-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  console.log("Login OTP Response:", data);

  if (!response.ok) {
    const errorMsg = data?.detail || data?.message || "Login failed";
    throw new Error(errorMsg);
  }

  return data; // Let handleSubmit deal with saving
};// Async login function ends here

// Login component
export default function Login() {
  const router = useRouter();// Initialize router for navigation
  const { setUserRole } = useContext(AuthContext);// Access AuthContext to set user role
  const [username, setUsername] = useState("");// State for username
  const [password, setPassword] = useState("");// State for password
  const [error, setError] = useState(null);// State for error messages
  const [loading, setLoading] = useState(false);// State for loading status
  

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();// Prevent default form submission
  setLoading(true);// Set loading state to true
  setError(null);// Reset error state

  try {
    const data = await loginUser(username, password);// Call the login function

    // ✅ Get role and user_id from data.user
    const role = data.user?.role?.toLowerCase();
    const userId = data.user?.id;
    const token = data.access_token;

    if (!role) throw new Error("Role not found in response");// Ensure role is present

    // ✅ Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("userRole", role);

    // ✅ Update AuthContext (if used)
    setUserRole(role);

    // ✅ Navigate to OTP verification
    router.replace("/otp/verify");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // Render the login form
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6" />
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-600 text-center mb-3 font-bold text-xl">
                  Threat Analysis System MSSD
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="username"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs italic mt-2">{error}</p>
                  )}

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = AuthNoNavbar;