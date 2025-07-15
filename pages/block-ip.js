import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "context/AuthContext";

const sampleBlockedIPs = [
  { id: 1, ip: "192.168.1.100", status: "Blocked" },
  { id: 2, ip: "10.0.0.5", status: "Blocked" },
  { id: 3, ip: "203.0.113.50", status: "Pending" },
];

export default function BlockIP() {
  const router = useRouter();
  const { userRole } = useContext(AuthContext);

  // Only allow access to admin role
  if (userRole !== "admin") {
    router.push("/auth/login");
    return null;
  }

  const [blockedIPs, setBlockedIPs] = useState(sampleBlockedIPs);

  const toggleIPStatus = (id) => {
    setBlockedIPs((prev) =>
      prev.map((ip) =>
        ip.id === id
          ? { ...ip, status: ip.status === "Blocked" ? "Pending" : "Blocked" }
          : ip,
      ),
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Block IP</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">IP Address</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {blockedIPs.map((ip) => (
            <tr key={ip.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{ip.id}</td>
              <td className="py-2 px-4 border-b">{ip.ip}</td>
              <td className="py-2 px-4 border-b">{ip.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => toggleIPStatus(ip.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
