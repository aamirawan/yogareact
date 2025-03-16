import React, { useState } from 'react';
import { TeacherAvailability } from '../../types/teacher';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';

const TeacherCalendar = () => {
  const [availability, setAvailability] = useState<TeacherAvailability[]>([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [timeSlot, setTimeSlot] = useState({
    startTime: '09:00',
    endTime: '10:00',
    isRecurring: true
  });

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const handleAddTimeSlot = () => {
    const newSlot: TeacherAvailability = {
      id: Math.random().toString(),
      teacherId: 'current-teacher-id',
      dayOfWeek: selectedDay,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      isRecurring: timeSlot.isRecurring,
      exceptions: []
    };

    setAvailability([...availability, newSlot]);
    setShowAddSlot(false);
  };

  const handleDeleteSlot = (id: string) => {
    setAvailability(availability.filter(slot => slot.id !== id));
  };

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
                .filter(slot => slot.dayOfWeek === index)
                .map(slot => (
                  <div
                    key={slot.id}
                    className="bg-indigo-50 p-2 rounded flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                      <span className="text-sm">
                        {slot.startTime} - {slot.endTime}
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