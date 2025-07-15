import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState("guest");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      setUserRole(role || "guest");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}
