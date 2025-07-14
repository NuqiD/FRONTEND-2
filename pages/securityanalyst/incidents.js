import React from "react";
import Admin from "layouts/Admin.js";

const sampleIncidents = [
  {
    id: "INC-001",
    title: "Suspicious Network Activity",
    type: "Network Intrusion",
    reporter: "Security Analyst",
    description: "Unusual traffic patterns detected from external IP",
    status: "Open",
    assignedTo: "Security Analyst",
    priority: "High",
  },
  {
    id: "INC-002",
    title: "Malware Detection",
    type: "Malware",
    reporter: "Security Analyst",
    description: "Trojan detected on workstation WS-001",
    status: "In Progress",
    assignedTo: "Security Analyst",
    priority: "Critical",
  },
];

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
    default:
      return null;
  }
};

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

export default function SecurityAnalystIncidents() {
  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Security Analyst Incidents</h2>
        {sampleIncidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{incident.id} - {incident.title}</h3>
              {priorityBadge(incident.priority)}
            </div>
            <p><strong>Type:</strong> {incident.type}</p>
            <p><strong>Status:</strong> {statusBadge(incident.status)}</p>
            <p><strong>Reporter:</strong> {incident.reporter}</p>
            <p><strong>Assigned To:</strong> {incident.assignedTo}</p>
            <p><strong>Description:</strong> {incident.description}</p>
          </div>
        ))}
      </div>
    </Admin>
  );
}
