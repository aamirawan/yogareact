import React, { useState, useEffect } from 'react';
import { TeacherAvailability } from '../../types/teacher';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';

const TeacherCalendar = () => {
  const [availability, setAvailability] = useState<TeacherAvailability[]>([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [timeSlot, setTimeSlot] = useState({
    startTime: '09:00',
    endTime: '10:00',
    isRecurring: true,
    sessionDuration: 60 // Duration in minutes
  });

  // Fetch existing availability slots when component mounts
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const teacherId = user?.id;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/teachers/availability/${teacherId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch availability');
        }

        const data = await response.json();
        setAvailability(data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, []);

  const handleAddTimeSlot = async () => {
    // Check for empty fields
    if (!timeSlot.startTime || !timeSlot.endTime) {
      alert('Start time and end time cannot be empty.');
      return;
    }

    // Check for time validity
    const startTime = new Date(`1970/01/01 ${timeSlot.startTime}`);
    const endTime = new Date(`1970/01/01 ${timeSlot.endTime}`);
    if (startTime >= endTime) {
      alert('Start time must be earlier than end time.');
      return;
    }

    // Calculate expected session duration in minutes
    const expectedDuration = (endTime - startTime) / 60000;
    if (timeSlot.sessionDuration !== expectedDuration) {
      alert(`Session duration must be exactly the difference between start and end times (${expectedDuration} minutes).`);
      return;
    }

    const normalizeTime = (time: string) => time.slice(0, 5);

    // Check for duplicate slots
    const isDuplicate = availability.some(slot => {
      return (
        slot.day_of_week === selectedDay &&
        normalizeTime(slot.start_time) === timeSlot.startTime &&
        normalizeTime(slot.end_time) === timeSlot.endTime
      );
    });
    
    if (isDuplicate) {
      alert('A similar time slot already exists for this day.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;

      const newSlot: TeacherAvailability = {
        user_id: userId,
        day_of_week: selectedDay,
        start_time: timeSlot.startTime,
        end_time: timeSlot.endTime,
        is_recurring: timeSlot.isRecurring,
        session_duration: timeSlot.sessionDuration
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/teachers/availability`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSlot),
      });

      if (!response.ok) {
        throw new Error('Failed to create availability slot');
      }

      const createdSlot = await response.json();
      setAvailability([...availability, createdSlot.availability]);
      setShowAddSlot(false);
    } catch (error) {
      console.error('Error creating availability slot:', error);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/teachers/availability/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete availability slot');
      }

      setAvailability(availability.filter(slot => slot.id !== id));
    } catch (error) {
      console.error('Error deleting availability slot:', error);
    }
  };

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Availability Calendar</h2>
        <button
          onClick={() => setShowAddSlot(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Time Slot
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">{day}</h3>
            <div className="space-y-2">
              {availability
                .filter(slot => slot.day_of_week === index)
                .map(slot => (
                  <div
                    key={slot.id}
                    className="bg-indigo-50 p-2 rounded flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                      <span className="text-sm">
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Time Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Add Time Slot</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Day of Week</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {daysOfWeek.map((day, index) => (
                    <option key={day} value={index}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={timeSlot.startTime}
                    onChange={(e) => setTimeSlot({ ...timeSlot, startTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={timeSlot.endTime}
                    onChange={(e) => setTimeSlot({ ...timeSlot, endTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={timeSlot.isRecurring}
                  onChange={(e) => setTimeSlot({ ...timeSlot, isRecurring: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                  Recurring weekly
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Session Duration (minutes)</label>
                <select
                  value={timeSlot.sessionDuration}
                  onChange={(e) => setTimeSlot({ ...timeSlot, sessionDuration: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddSlot(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTimeSlot}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCalendar;