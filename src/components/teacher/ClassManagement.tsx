import React, { useState, useEffect } from 'react';
import { GroupClass } from '../../types/teacher';
import { Calendar, Clock, Users, Tag } from 'lucide-react';

const ClassManagement = () => {
  const [classes, setClasses] = useState<GroupClass[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClass, setNewClass] = useState<Partial<GroupClass>>({
    user_id: '',
    title: '',
    subtitle: '',
    description: '',
    max_participants: 20,
    duration: 60,
    level: 'Beginner',
    recurringDays: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    const fetchClasses = async () => {
        try {
          const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;
          const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/teachers/classes/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    fetchClasses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClass(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day: string) => {
    setNewClass(prev => ({
      ...prev,
      recurringDays: prev.recurringDays?.includes(day)
        ? prev.recurringDays.filter(d => d !== day)
        : [...(prev.recurringDays || []), day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;
      newClass.user_id = userId;
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/teachers/classes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });

      if (!response.ok) {
        throw new Error('Failed to create class');
      }

      const createdClass = await response.json();
      
      // Update the classes list with the new class
      setClasses(prevClasses => [...prevClasses, createdClass]);
      
      // Reset the form
      setNewClass({
        'user_id': userId,
        title: '',
        subtitle: '',
        description: '',
        max_participants: 20,
        duration: 60,
        level: 'Beginner',
        recurringDays: [],
      });
      
      // Close the modal
      setShowCreateModal(false);
      
      // Optional: Show success message
      alert('Class created successfully!');
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Class Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Class
        </button>
      </div>

      {/* Class List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <div key={classItem.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">{classItem.title}</h3>
            <p className="text-gray-600 mb-4">{classItem.subtitle}</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {classItem.duration} minutes
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {classItem.max_participants} participants
              </div>
              <div className="flex items-center text-gray-600">
                <Tag className="w-4 h-4 mr-2" />
                {classItem.level}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Create New Class</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newClass.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={newClass.subtitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newClass.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={newClass.duration}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Participants</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={newClass.maxParticipants}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <select
                  name="level"
                  value={newClass.level}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recurring Days</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newClass.recurringDays?.includes(day)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
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
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;