import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(
    typeof window !== "undefined" ? localStorage.getItem("userRole") || "guest" : "guest"
  );// Default to "guest" if no role is found

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    }
  }, []);// Initialize userRole from localStorage

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );// Provide userRole and setUserRole to children components
}// AuthProvider