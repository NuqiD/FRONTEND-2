import React, { useState } from "react";

const sampleIncidentsToVerify = [
  {
    id: 1,
    title: "Unauthorized Access Attempt",
    status: "Pending Verification",
  },
  { id: 2, title: "Malware Detected", status: "Pending Verification" },
];

export default function Verify() {
  const [incidents, setIncidents] = useState(sampleIncidentsToVerify);

  const handleVerify = (id) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id ? { ...incident, status: "Verified" } : incident,
      ),
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Verify Incident</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{incident.id}</td>
              <td className="py-2 px-4 border-b">{incident.title}</td>
              <td className="py-2 px-4 border-b">{incident.status}</td>
              <td className="py-2 px-4 border-b">
                {incident.status === "Pending Verification" ? (
                  <button
                    onClick={() => handleVerify(incident.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Verify
                  </button>
                ) : (
                  <span className="text-green-700 font-semibold">Verified</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
