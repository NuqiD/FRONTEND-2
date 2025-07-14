import React, { useState, useEffect } from 'react';
import Admin from "layouts/Admin.js";

const sampleTickets = [
  { 
    id: 'TKT-001', 
    title: 'Investigate Malware Alert on Server-01', 
    status: 'Open', 
    priority: 'High', 
    assignedTo: 'Security Analyst',
    customer: 'IT Department',
    created: '2024-01-15 10:30:00',
    updated: '2024-01-15 14:20:00',
    queue: 'Security',
    type: 'Incident',
    service: 'IT Security',
    sla: 'Standard',
    owner: 'john.doe@company.com',
    responsible: 'security-team@company.com'
  },
  { 
    id: 'TKT-002', 
    title: 'Approve IP Block Request for 192.168.1.100', 
    status: 'Pending Approval', 
    priority: 'Medium', 
    assignedTo: 'Head of Department',
    customer: 'Network Team',
    created: '2024-01-15 09:15:00',
    updated: '2024-01-15 12:45:00',
    queue: 'Approval',
    type: 'Request',
    service: 'Network Security',
    sla: 'Standard',
    owner: 'jane.smith@company.com',
    responsible: 'approval-team@company.com'
  },
  { 
    id: 'TKT-003', 
    title: 'Resolve Support Ticket - Email Server Down', 
    status: 'In Progress', 
    priority: 'Critical', 
    assignedTo: 'IT Support',
    customer: 'HR Department',
    created: '2024-01-15 08:00:00',
    updated: '2024-01-15 15:30:00',
    queue: 'IT Support',
    type: 'Problem',
    service: 'Email Service',
    sla: 'Premium',
    owner: 'support@company.com',
    responsible: 'it-support@company.com'
  },
  { 
    id: 'TKT-004', 
    title: 'Firewall Rule Configuration Request', 
    status: 'Closed', 
    priority: 'Low', 
    assignedTo: 'Network Admin',
    customer: 'Development Team',
    created: '2024-01-14 16:20:00',
    updated: '2024-01-15 11:10:00',
    queue: 'Network',
    type: 'Request',
    service: 'Network Configuration',
    sla: 'Standard',
    owner: 'network@company.com',
    responsible: 'network-team@company.com'
  }
];

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    queue: 'All',
    search: ''
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showNewTicket, setShowNewTicket] = useState(false);

  useEffect(() => {
    setTickets(sampleTickets);
    setFilteredTickets(sampleTickets);
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (filters.status !== 'All') {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }
    if (filters.priority !== 'All') {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }
    if (filters.queue !== 'All') {
      filtered = filtered.filter(ticket => ticket.queue === filters.queue);
    }
    if (filters.search) {
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  }, [filters, tickets]);

  const statusBadge = (status) => {
    const statusColors = {
      'Open': 'bg-red-100 text-red-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending Approval': 'bg-yellow-100 text-yellow-800',
      'Closed': 'bg-green-100 text-green-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const priorityBadge = (priority) => {
    const priorityColors = {
      'Critical': 'bg-red-600 text-white',
      'High': 'bg-orange-500 text-white',
      'Medium': 'bg-yellow-500 text-white',
      'Low': 'bg-green-500 text-white'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold ${priorityColors[priority] || 'bg-gray-500 text-white'}`}>
        {priority}
      </span>
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <Admin>
      <div className="bg-white rounded shadow-lg">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Ticket Management System</h1>
            <button 
              onClick={() => setShowNewTicket(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
            >
              <i className="fas fa-plus mr-2"></i>
              New Ticket
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Queue</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.queue}
                onChange={(e) => handleFilterChange('queue', e.target.value)}
              >
                <option value="All">All Queues</option>
                <option value="Security">Security</option>
                <option value="IT Support">IT Support</option>
                <option value="Network">Network</option>
                <option value="Approval">Approval</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => setFilters({ status: 'All', priority: 'All', queue: 'All', search: '' })}
                className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Ticket Statistics */}
        <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{tickets.filter(t => t.status === 'Open').length}</div>
              <div className="text-sm text-gray-600">Open</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'In Progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{tickets.filter(t => t.status === 'Pending Approval').length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'Closed').length}</div>
              <div className="text-sm text-gray-600">Closed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">{tickets.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>

        {/* Tickets Table */} 
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Queue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {ticket.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {statusBadge(ticket.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {priorityBadge(ticket.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.queue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(ticket.created).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Close
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>Showing {filteredTickets.length} of {tickets.length} tickets</div>
            <div>
              <span className="mr-4">Powered by TACTIC Ticketing System</span>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}
