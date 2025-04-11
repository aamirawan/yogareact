import React, { useState, useEffect } from 'react';
import { Clock, Star } from 'lucide-react';
import { Teacher, TimeSlot } from '../../types/student';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

// Add custom styles for the calendar
const calendarStyles = `
  .highlighted-date {
    background-color: #e0e7ff !important;
    color: #4f46e5 !important;
  }
  
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .react-calendar__tile {
    padding: 1rem 0.5rem;
    font-size: 0.875rem;
  }
  
  .react-calendar__tile--active {
    background: #4f46e5 !important;
    color: white !important;
  }
  
  .react-calendar__tile--now {
    background: #f3f4f6 !important;
  }

  .react-calendar__tile:disabled {
    background-color: #f3f4f6 !important;
    color: #9ca3af !important;
    cursor: not-allowed !important;
  }
`;

interface TimeSlotResponse {
  id: string;
  teacher_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
}

const OneOnOneBooking = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch teachers when component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Fetch time slots when a teacher is selected
  useEffect(() => {
    if (selectedTeacher) {
      fetchTimeSlots(selectedTeacher.id);
    }
  }, [selectedTeacher]);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/teachers/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch teachers');
      
      const data = await response.json();
      setTeachers(data);
    } catch (err) {
      setError('Failed to load teachers. Please try again later.');
      console.error('Error fetching teachers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTimeSlots = async (teacherId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/students/get/one/on/one/sessions?teacher_id=${teacherId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch time slots');
      
      const data = await response.json();
      
      // Handle case when no slots are available
      if (!Array.isArray(data)) {
        setTimeSlots([]);
        return;
      }

      const availableSlots: TimeSlot[] = data.map((slot: TimeSlotResponse, index: number) => ({
        id: `${slot.teacher_id}-${slot.session_date}-${slot.start_time}-${index}`,
        teacherId: slot.teacher_id,
        session_date: slot.session_date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        isAvailable: true
      }));

      setTimeSlots(availableSlots);
    } catch (err) {
      setError('Failed to load time slots. Please try again later.');
      console.error('Error fetching time slots:', err);
      setTimeSlots([]); // Reset time slots on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSession = async () => {
    if (!selectedSlot || !selectedTeacher) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacher_id: selectedTeacher.id,
          availability_id: selectedSlot.id,
          session_date: selectedSlot.session_date,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
        }),
      });

      if (!response.ok) throw new Error('Failed to book session');

      setShowConfirmation(true);
    } catch (err) {
      setError('Failed to book session. Please try again later.');
      console.error('Error booking session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    // Convert the calendar date to start of day for comparison
    const calendarDate = new Date(date);
    calendarDate.setHours(0, 0, 0, 0);

    // Check if any time slot exists for this date
    return timeSlots.some(slot => {
      const slotDate = new Date(slot.session_date);
      slotDate.setHours(0, 0, 0, 0);
      return isSameDay(calendarDate, slotDate);
    }) ? 'highlighted-date' : '';
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    // Convert the calendar date to start of day for comparison
    const calendarDate = new Date(date);
    calendarDate.setHours(0, 0, 0, 0);

    // Disable dates that don't have any time slots
    return !timeSlots.some(slot => {
      const slotDate = new Date(slot.session_date);
      slotDate.setHours(0, 0, 0, 0);
      return isSameDay(calendarDate, slotDate);
    });
  };

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setSelectedSlot(null); // Reset selected slot when date changes
    }
  };

  // Reset states when teacher changes
  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSelectedDate(null);
    setSelectedSlot(null);
    setTimeSlots([]);
  };

  return (
    <div className="space-y-6">
      <style>{calendarStyles}</style>
      <h2 className="text-2xl font-semibold">Book 1:1 Session</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      )}

      {/* Teacher Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={`teacher-${teacher.id}`}
            className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all ${
              selectedTeacher?.id === teacher.id
                ? 'ring-2 ring-indigo-600'
                : 'hover:shadow-xl'
            }`}
            onClick={() => handleTeacherSelect(teacher)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={teacher.profile_photo}
                alt={`${teacher.first_name} ${teacher.last_name}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">
                  {teacher.first_name} {teacher.last_name}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">
                    {teacher.rating} ({teacher.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTeacher && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Select Date</h3>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              tileClassName={tileClassName}
              tileDisabled={tileDisabled}
              className="w-full border-none"
              formatDay={(locale, date) => format(date, 'd')}
            />
          </div>

          {/* Time Slots */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate ? `Available Slots for ${format(selectedDate, 'MMMM d, yyyy')}` : 'Select a date to view available slots'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedDate && timeSlots.length > 0 ? (
                timeSlots
                  .filter(slot => {
                    const slotDate = new Date(slot.session_date);
                    slotDate.setHours(0, 0, 0, 0);
                    const selectedDateStart = new Date(selectedDate);
                    selectedDateStart.setHours(0, 0, 0, 0);
                    return isSameDay(slotDate, selectedDateStart);
                  })
                  .map((slot) => (
                    <button
                      key={`slot-${slot.id}`}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        selectedSlot?.id === slot.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-600'
                      }`}
                      disabled={!slot.isAvailable}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2" />
                      <span className="block text-sm">
                        {slot.start_time} - {slot.end_time}
                      </span>
                    </button>
                  ))
              ) : (
                <div className="col-span-2 text-center text-gray-500 py-4">
                  {selectedDate 
                    ? 'No available slots for this date'
                    : 'No available slots for this teacher'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Button */}
      {selectedTeacher && selectedSlot && (
        <div className="flex justify-end">
          <button
            onClick={handleBookSession}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Book Session
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && selectedTeacher && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600">
              Your session has been booked with {selectedTeacher.first_name} for{' '}
              {format(new Date(selectedSlot.session_date), 'MMMM d, yyyy')} at{' '}
              {selectedSlot.start_time}.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneOnOneBooking;