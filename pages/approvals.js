import React, { useState, useEffect } from 'react';

const sampleApprovals = [
  { id: 1, title: 'IP Block Request', status: 'Pending', requestedBy: 'SecurityAnalyst' },
  { id: 2, title: 'Incident Closure', status: 'Approved', requestedBy: 'SOCAgent' },
  { id: 3, title: 'Ticket Escalation', status: 'Rejected', requestedBy: 'ITSupport' },
];

export default function Approvals() {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // Simulate fetching approvals from API
    setApprovals(sampleApprovals);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approvals</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Requested By</th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((approval) => (
            <tr key={approval.id} className="hover:bg-gray-100 cursor-pointer">
              <td className="py-2 px-4 border-b">{approval.id}</td>
              <td className="py-2 px-4 border-b">{approval.title}</td>
              <td className="py-2 px-4 border-b">{approval.status}</td>
              <td className="py-2 px-4 border-b">{approval.requestedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
