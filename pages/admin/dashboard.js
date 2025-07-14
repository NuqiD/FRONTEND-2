import React from "react";
import Admin from "layouts/Admin.js";


const sampleRecentIncidents = [
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
];

const sampleCriticalThreats = [
  {
    id: "THR-001",
    title: "APT Group Activity",
    type: "Advanced Persistent Threat",
    analyst: "Security Analyst",
    lastUpdated: "2024-01-15 11:45:00",
    status: "Active",
    description: "Detected ongoing APT group activity targeting critical assets",
    priority: "Critical",
  },
];

const sampleUrgentTickets = [
  {
    id: "TKT-002",
    title: "Malware Containment",
    status: "Open",
    assignee: "Incident Response Team",
    relatedIncident: "INC-002",
    estResolution: "2024-01-15 20:00:00",
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
    case "Active":
      return (
        <span className="text-red-600 font-bold flex items-center">
          <span className="w-3 h-3 bg-red-600 rounded-full mr-1"></span>Active
        </span>
      );
    default:
      return <span>{status}</span>;
  }
};

export default function Dashboard() {
  return (
    <Admin>
      <div className="container mx-auto p-4">
        {/* TACTIC System Overview */}
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">TACTIC System Overview</h2>
          <p className="text-gray-600">Real-time threat analysis, coordination and ticketing dashboard</p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recent Incidents */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Recent Incidents</h3>
            {sampleRecentIncidents.map((incident) => (
              <div key={incident.id} className="mb-4 border-b border-gray-200 pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{incident.id} - {incident.title}</h4>
                  {priorityBadge(incident.priority)}
                </div>
                <p className="text-xs uppercase font-semibold">Type</p>
                <p>{incident.type}</p>
                <p className="text-xs uppercase font-semibold">Status</p>
                <p>{statusBadge(incident.status)}</p>
                <p className="text-xs uppercase font-semibold">Reporter</p>
                <p>{incident.reporter}</p>
                <p className="text-xs uppercase font-semibold">Assigned To</p>
                <p>{incident.assignedTo}</p>
                <p className="text-xs uppercase font-semibold">Description</p>
                <p>{incident.description}</p>
              </div>
            ))}
          </div>

          {/* Critical Threats */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Critical Threats</h3>
            {sampleCriticalThreats.map((threat) => (
              <div key={threat.id} className="mb-4 border-b border-gray-200 pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{threat.id} - {threat.title}</h4>
                  {priorityBadge(threat.priority)}
                </div>
                <p className="text-xs uppercase font-semibold">Type</p>
                <p>{threat.type}</p>
                <p className="text-xs uppercase font-semibold">Status</p>
                <p>{statusBadge(threat.status)}</p>
                <p className="text-xs uppercase font-semibold">Analyst</p>
                <p>{threat.analyst}</p>
                <p className="text-xs uppercase font-semibold">Last Updated</p>
                <p>{threat.lastUpdated}</p>
                <p className="text-xs uppercase font-semibold">Description</p>
                <p>{threat.description}</p>
              </div>
            ))}
          </div>

          {/* Urgent Tickets */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">Urgent Tickets</h3>
            {sampleUrgentTickets.map((ticket) => (
              <div key={ticket.id} className="mb-4 border-b border-gray-200 pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{ticket.id} - {ticket.title}</h4>
                  {priorityBadge(ticket.priority)}
                </div>
                <p className="text-xs uppercase font-semibold">Status</p>
                <p>{statusBadge(ticket.status)}</p>
                <p className="text-xs uppercase font-semibold">Assignee</p>
                <p>{ticket.assignee}</p>
                <p className="text-xs uppercase font-semibold">Related Incident</p>
                <p>{ticket.relatedIncident}</p>
                <p className="text-xs uppercase font-semibold">Estimated Resolution</p>
                <p>{ticket.estResolution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Admin>
  );
}
