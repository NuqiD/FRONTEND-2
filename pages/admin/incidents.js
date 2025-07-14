import React, { useState } from "react";
import Admin from "layouts/Admin.js";

const sampleIncidents = [
  {
    id: "INC-001",
    title: "Suspicious Network Activity",
    type: "Network Intrusion",
    reporter: "SOC Agent",
    description: "Unusual traffic patterns detected from external IP",
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
    status: "In Progress",
    assignedTo: "Security Analyst",
    priority: "Critical",
  },
  {
    id: "INC-003",
    title: "Phishing Attempt",
    type: "Phishing",
    reporter: "Employee",
    description: "Suspicious email received by finance department",
    status: "Open",
    assignedTo: "SOC Agent",
    priority: "High",
  },
  {
    id: "INC-004",
    title: "Unauthorized Access",
    type: "Access Violation",
    reporter: "IT Admin",
    description: "Login attempt from unknown device",
    status: "Open",
    assignedTo: "Security Analyst",
    priority: "High",
  },
  {
    id: "INC-005",
    title: "Data Leak",
    type: "Data Breach",
    reporter: "SOC Agent",
    description: "Sensitive data found on public repository",
    status: "In Progress",
    assignedTo: "SOC Agent",
    priority: "Critical",
  },
  {
    id: "INC-006",
    title: "Ransomware Alert",
    type: "Malware",
    reporter: "Employee",
    description: "Ransomware detected on server SRV-002",
    status: "Open",
    assignedTo: "Security Analyst",
    priority: "Critical",
  },
  {
    id: "INC-007",
    title: "Brute Force Attack",
    type: "Network Intrusion",
    reporter: "SOC Agent",
    description: "Multiple failed login attempts detected",
    status: "Open",
    assignedTo: "SOC Agent",
    priority: "High",
  },
  {
    id: "INC-008",
    title: "Lost Device",
    type: "Physical Security",
    reporter: "Employee",
    description: "Company laptop reported lost",
    status: "Open",
    assignedTo: "IT Admin",
    priority: "High",
  },
  {
    id: "INC-009",
    title: "Firewall Breach",
    type: "Network Intrusion",
    reporter: "SOC Agent",
    description: "Firewall rules bypassed",
    status: "In Progress",
    assignedTo: "Security Analyst",
    priority: "Critical",
  },
  {
    id: "INC-010",
    title: "Suspicious USB Device",
    type: "Physical Security",
    reporter: "IT Admin",
    description: "Unknown USB device connected to workstation",
    status: "Open",
    assignedTo: "SOC Agent",
    priority: "High",
  },
  {
    id: "INC-011",
    title: "Account Compromise",
    type: "Access Violation",
    reporter: "Employee",
    description: "Account credentials leaked",
    status: "In Progress",
    assignedTo: "Security Analyst",
    priority: "Critical",
  },
  {
    id: "INC-012",
    title: "DDOS Attack",
    type: "Network Intrusion",
    reporter: "SOC Agent",
    description: "Service disruption due to DDOS",
    status: "Open",
    assignedTo: "SOC Agent",
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

export default function AdminIncidents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredIncidents = sampleIncidents;

  // Pagination logic
  const incidentsPerPage = 7;
  const totalPages = Math.ceil(filteredIncidents.length / incidentsPerPage);
  const paginatedIncidents = filteredIncidents.slice(
    (page - 1) * incidentsPerPage,
    page * incidentsPerPage
  );

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Incidents</h2>
        {paginatedIncidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                {incident.id} - {incident.title}
              </h3>
              {priorityBadge(incident.priority)}
            </div>
            <p>
              <strong>Type:</strong> {incident.type}
            </p>
            <p>
              <strong>Status:</strong> {statusBadge(incident.status)}
            </p>
            <p>
              <strong>Reporter:</strong> {incident.reporter}
            </p>
            <p>
              <strong>Assigned To:</strong> {incident.assignedTo}
            </p>
            <p>
              <strong>Description:</strong> {incident.description}
            </p>
          </div>
        ))}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-200"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </Admin>
  );
}
