import React, { useState, useEffect } from 'react';
import { IssueReport } from '../../types/teacher';
//import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const IssueReporting = () => {
  const [issues, setIssues] = useState<IssueReport[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newIssue, setNewIssue] = useState<Partial<IssueReport>>({
    title: '',
    description: '',
    priority: 'Medium',
    //status: 'Open'
  });

  const priorityColors = {
    Low: 'bg-yellow-100 text-yellow-800',
    Medium: 'bg-orange-100 text-orange-800',
    High: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    Open: 'bg-red-100 text-red-800',
    InProgress: 'bg-blue-100 text-blue-800',
    Resolved: 'bg-green-100 text-green-800'
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user?.id;
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/teachers/report-issue/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch issues');
        }

        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIssue(prev => ({ ...prev,  [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;
      newIssue.user_id = userId;
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/teachers/report-issue`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIssue),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create issue');
      }
  
      const createdIssue = await response.json();
      setIssues(prev => [...prev, createdIssue.issue]);
      setNewIssue({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open'
      });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating issue:', error);
      // You might want to add error handling UI here
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Issue Reporting</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Report New Issue
        </button>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {issues.map(issue => (
          <div key={issue.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{issue.title}</h3>
                <p className="text-gray-600 mt-2">{issue.description}</p>
              </div>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${priorityColors[issue.priority]}`}>
                  {issue.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[issue.status]}`}>
                  {issue.status}
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Reported on: {new Date(issue.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Create Issue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Report New Issue</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newIssue.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newIssue.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={newIssue.priority}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueReporting;