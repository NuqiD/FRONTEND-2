import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/AuthContext';

const sampleRules = [
  { id: 1, rule: 'Block IP 192.168.1.100', status: 'Active' },
  { id: 2, rule: 'Allow IP 10.0.0.5', status: 'Active' },
  { id: 3, rule: 'Block IP 203.0.113.50', status: 'Pending' },
];

export default function Firewall() {
  const router = useRouter();
  const { userRole } = useContext(AuthContext);

  // Only allow access to admin role
  if (userRole !== 'admin') {
    router.push('/auth/login');
    return null;
  }

  const [rules, setRules] = useState(sampleRules);

  const toggleRuleStatus = (id) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id
          ? { ...rule, status: rule.status === 'Active' ? 'Pending' : 'Active' }
          : rule
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Firewall</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Rule</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{rule.id}</td>
              <td className="py-2 px-4 border-b">{rule.rule}</td>
              <td className="py-2 px-4 border-b">{rule.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => toggleRuleStatus(rule.id)}
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
