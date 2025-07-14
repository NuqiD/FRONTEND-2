import React, { useState } from "react";

const sampleIncidents = [
  {
    id: "INC-001",
    title: "Suspicious Network Activity",
    type: "Network Intrusion",
    reporter: "SOC Agent",
    description: "Unusual traffic patterns detected from external IP",
    created: "2024-01-15 10:30:00",
    status: "Open",
    assignedTo: "Security Analyst",
    priority: "High",
  },
  {
    id: "INC-002",
    title: "Malware Detection",
    type: "Malware",
    reporter: "SOC Agent",
    description: "Trojan detected on workstation WS-001",
    created: "2024-01-15 09:15:00",
    status: "In Progress",
    assignedTo: "Security Analyst",
    priority: "Critical",
  },
  {
    id: "INC-003",
    title: "Phishing Attempt",
    type: "Phishing",
    reporter: "Security Analyst",
    description: "Suspicious email reported by user",
    created: "2024-01-16 11:00:00",
    status: "Open",
    assignedTo: "SOC Agent",
    priority: "Medium",
  },
  {
    id: "INC-004",
    title: "Unauthorized Access",
    type: "Access Violation",
    reporter: "IT Support",
    description: "Multiple failed login attempts detected",
    created: "2024-01-16 14:30:00",
    status: "In Progress",
    assignedTo: "Security Analyst",
    priority: "High",
  },
];

export default function IncidentsPageContent() {
  const [incidents, setIncidents] = useState(sampleIncidents);

  const statusBadge = (status) => {
    switch (status) {
      case "Open":
        return (
          <span className="text-red-600 font-bold flex items-center">
            <span className="w-3 h-3 bg-red-600 rounded-full mr-1"></span>Open
          </span>
        );
      case "In Progress":
        return (
          <span className="text-blue-600 font-bold flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-1"></span>In Progress
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const priorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
            High
          </span>
        );
      case "Critical":
        return (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
            Critical
          </span>
        );
      case "Medium":
        return (
          <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
            Medium
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">

      {/* Incident Management Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Incident Management Dashboard</h2>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700">
          New Incident
        </button>
      </div>

      {/* Incident Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {incidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded shadow p-6 ml-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{incident.id} - {incident.title}</h3>
              {priorityBadge(incident.priority)}
            </div>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="text-left">
                <p><strong>Type</strong><br />{incident.type}</p>
                <p><strong>Reporter</strong><br />{incident.reporter}</p>
                <p><strong>Description</strong><br />{incident.description}</p>
              </div>
              <div className="text-left">
                <p><strong>Status</strong><br />{statusBadge(incident.status)}</p>
                <p><strong>Assigned To</strong><br />{incident.assignedTo}</p>
                <p><strong>Created</strong><br />{incident.created}</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                style={{ backgroundColor: "#3b82f6", color: "white", border: "1px solid #2563eb" }}
                className="px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow-md"
              >
                View Details
              </button>
              <button
                style={{ backgroundColor: "#16a34a", color: "white", border: "1px solid #15803d" }}
                className="px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 shadow-md"
              >
                Assign
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 shadow-md"
              >
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
