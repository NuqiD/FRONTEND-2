/*import React, { useState } from "react";
import Admin from "layouts/Admin.js";

const sampleAlerts = [
  {
    id: "ALERT-101",
    title: "Multiple Failed Login Attempts",
    alertLevel: 12,
    source: "Wazuh Agent",
    description: "Detected several failed SSH login attempts on server srv-01",
    timestamp: "2025-07-15 09:21:00",
  },
  {
    id: "ALERT-102",
    title: "Possible Malware Execution",
    alertLevel: 13,
    source: "Wazuh Agent",
    description: "Suspicious file execution detected on endpoint PC-22",
    timestamp: "2025-07-15 10:03:00",
  },
  {
    id: "ALERT-103",
    title: "Sensitive File Accessed",
    alertLevel: 12,
    source: "Wazuh Agent",
    description: "Access to confidential file without proper authorization",
    timestamp: "2025-07-15 08:55:00",
  },
  {
    id: "ALERT-104",
    title: "Suspicious Network Connection",
    alertLevel: 13,
    source: "Wazuh Agent",
    description: "Unusual outbound connection detected from internal host",
    timestamp: "2025-07-15 11:15:00",
  },
  {
    id: "ALERT-105",
    title: "Privilege Escalation Attempt",
    alertLevel: 13,
    source: "Wazuh Agent",
    description: "User tried to perform admin operation without privileges",
    timestamp: "2025-07-15 07:42:00",
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
          <span className="w-3 h-3 bg-blue-600 rounded-full mr-1"></span>In
          Progress
        </span>
      );
    default:
      return <span>{status}</span>;
  }
};

export default function AdminAlerts() {
  const [page, setPage] = useState(1);

  const alertsPerPage = 5;
  const totalPages = Math.ceil(sampleAlerts.length / alertsPerPage);
  const paginatedAlerts = sampleAlerts.slice(
    (page - 1) * alertsPerPage,
    page * alertsPerPage
  );

  return (
    <Admin>
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Wazuh Alerts (Level 12 & 13)</h2>
        {paginatedAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                {alert.id} - {alert.title}
              </h3>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ml-2 ${
                  alert.alertLevel === 13 ? "bg-red-600 text-white" : "bg-orange-500 text-white"
                }`}
              >
                Level {alert.alertLevel}
              </span>
            </div>
            <p><strong>Source:</strong> {alert.source}</p>
            <p><strong>Description:</strong> {alert.description}</p>
            <p><strong>Timestamp:</strong> {alert.timestamp}</p>
            <div className="mt-2">
              <button className="bg-blue-600 text-black px-3 py-1 rounded text-sm hover:bg-blue-1000">
                Create Incident
              </button>
            </div>
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
}*/

import React from "react";

// components

import CardAlert from "components/Cards/CardAlert.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardAlert />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;