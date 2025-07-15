import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Auth from "layouts/Auth.js";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Skip actual auth, use dummy data for testing with role assignment
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("token", "dummy-token-for-testing");
        localStorage.setItem("userRole", "admin");
        router.push("/admin/dashboard");
      } else if (email === "soca@example.com" && password === "password") {
        localStorage.setItem("token", "dummy-token-for-testing");
        localStorage.setItem("userRole", "SOCAgent");
        router.push("/dashboard");
      } else if (email === "analyst@example.com" && password === "password") {
        localStorage.setItem("token", "dummy-token-for-testing");
        localStorage.setItem("userRole", "SecurityAnalyst");
        router.push("/dashboard");
      } else if (
        email === "cloudflare@example.com" &&
        password === "password"
      ) {
        localStorage.setItem("token", "dummy-token-for-testing");
        localStorage.setItem("userRole", "CloudflareAdmin");
        router.push("/dashboard");
      } else if (email === "hod@example.com" && password === "password") {
        localStorage.setItem("token", "dummy-token-for-testing");
        localStorage.setItem("userRole", "HeadOfDepartment");
        router.push("/dashboard");
      } else if (email === "itsupport@example.com" && password === "password") {
        localStorage.setItem("token", "dummy-token-for-testing");
        localStorage.setItem("userRole", "ITSupport");
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials for testing");
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
              <div className="rounded-t mb-0 px-6 py-6"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold text-xl">
                  Threat Analysis System MSSD
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
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
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import AuthNoNavbar from "layouts/AuthNoNavbar.js";

Login.layout = AuthNoNavbar;
