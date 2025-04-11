import React, { useState, useEffect } from 'react';
import { Edit, Trash, Search, CheckCircle, XCircle } from 'lucide-react';
import { Teacher } from '../../../types/admin';

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    focus: [],
    health_concerns: [],
    session_type: [],
    experience: 0,
    profile_photo: '',
    is_verified: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/teachers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTeacher(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateTeacher = async (teacherId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/teacher/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentTeacher),
      });
      if (!response.ok) throw new Error('Failed to update teacher');
      await fetchTeachers();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/teacher/${teacherId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete teacher');
      await fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleApproveTeacher = async (teacherId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/teacher/approve/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to approve teacher');
      await fetchTeachers();
    } catch (error) {
      console.error('Error approving teacher:', error);
    }
  };

  const handleRejectTeacher = async (teacherId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admin/teacher/reject/${teacherId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to reject teacher');
      await fetchTeachers();
    } catch (error) {
      console.error('Error rejecting teacher:', error);
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.focus.some(focus => focus.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
        <p className="text-gray-600">Manage and review teacher applications</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search teachers..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Teachers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {teacher.profile_photo && (
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={teacher.profile_photo}
                          alt={`${teacher.first_name} ${teacher.last_name}`}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {`${teacher.first_name} ${teacher.last_name}`}
                        </div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.focus.join(', ')}</div>
                    <div className="text-sm text-gray-500">{teacher.experience} years experience</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${teacher.is_verified === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {teacher.is_verified === 1 ? 'Verified' : 'Pending Verification'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    {teacher.is_verified === 0 && (
                      <>
                        <button
                          onClick={() => handleApproveTeacher(teacher.id)}
                          className="text-green-600 hover:text-green-900 relative group"
                          title="Verify Teacher"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span className="absolute hidden group-hover:block bg-black text-white text-xs py-1 px-2 rounded -top-8 -left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            Verify Teacher
                          </span>
                        </button>
                        <button
                          onClick={() => handleRejectTeacher(teacher.id)}
                          className="text-red-600 hover:text-red-900 relative group"
                          title="Reject Verification"
                        >
                          <XCircle className="w-5 h-5" />
                          <span className="absolute hidden group-hover:block bg-black text-white text-xs py-1 px-2 rounded -top-8 -left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            Reject Verification
                          </span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setCurrentTeacher(teacher);
                        setShowModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Edit Teacher"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Teacher"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Teacher Profile</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTeacher(currentTeacher.id!);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={currentTeacher.first_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={currentTeacher.last_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={currentTeacher.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Focus Areas</label>
                    <textarea
                      name="focus"
                      value={currentTeacher.focus.join(', ')}
                      onChange={(e) => setCurrentTeacher(prev => ({ ...prev, focus: e.target.value.split(',') }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Health Concerns</label>
                    <textarea
                      name="health_concerns"
                      value={currentTeacher.health_concerns.join(', ')}
                      onChange={(e) => setCurrentTeacher(prev => ({ ...prev, health_concerns: e.target.value.split(',') }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={currentTeacher.experience}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;