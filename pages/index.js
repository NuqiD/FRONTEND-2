import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthNoNavbar from "layouts/AuthNoNavbar.js";
import { AuthContext } from "context/AuthContext";

// Async login function
const loginUser = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch("http://192.168.0.21:8000/auth/login", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  // Save relevant fields to localStorage
  const keysToStore = [
    "access_token",
    "refresh_token",
    "token_type",
    "expires_in",
    "role",
  ];

  keysToStore.forEach((key) => {
    const value = data[key];
    if (key === "role") {
      localStorage.setItem("userRole", value);
    } else {
      localStorage.setItem(key, value);
    }
  });

  return data;
};

export default function Login() {
  const router = useRouter();
  const { setUserRole } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(username, password);
      const role = data.role?.toLowerCase();

      if (!role) throw new Error("Role not found in response");

      setUserRole(role);

      // Redirect based on role
      switch (role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "user": // Assuming both go to same dashboard
          router.push("/admin/dashboard");
          break;
        case "hod": // Head of Department
          router.push("/hod/approval");
          break;
        case "firewall": // Firewall role
          router.push("/firewall/dashboard");
          break;
        case "analyst":  // Security Analyst
          router.push("/securityanalyst/dashboard");
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