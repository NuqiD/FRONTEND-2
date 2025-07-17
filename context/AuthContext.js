import React, { createContext, useState, useEffect } from "react"; // Import necessary hooks and context

export const AuthContext = createContext();// Create AuthContext

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(null); // start with null, not "guest"
  const [loading, setLoading] = useState(true); // Loading state to manage initial data fetch

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      setUserRole(role || "guest");
      setLoading(false);
    }
  }, []);// Effect to set user role from localStorage on initial load

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, loading }}>
      {children}
    </AuthContext.Provider>
  );// Provide userRole and setUserRole to children components
}// AuthProvider component to wrap around the application