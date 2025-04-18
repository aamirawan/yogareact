import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TeacherAvailability } from '../../types/teacher';
import './TeacherCalendar.css'; // Import custom CSS for styling

const TeacherCalendar = () => {
  const [availability, setAvailability] = useState<TeacherAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [error, setError] = useState<string | null>(null);

  // Fetch existing availability slots when component mounts
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const teacherId = user?.id;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/teachers/availability/${teacherId}`, {
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setError(null); // Clear any previous errors when a new date is selected
  };

  const handleSaveSlot = async () => {
    if (!selectedDate) return;

    // Convert input times to minutes since midnight for easier comparison
    const getMinutesSinceMidnight = (timeString: string) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const newStartMinutes = getMinutesSinceMidnight(startTime);
    const newEndMinutes = getMinutesSinceMidnight(endTime);

    // Validate end time is after start time
    if (newEndMinutes <= newStartMinutes) {
      setError('End time must be after start time.');
      return;
    }

    // Check for overlapping slots
    const overlappingSlot = availability.find(slot => {
      const slotDate = new Date(slot.session_date).toDateString();
      const selectedDateStr = selectedDate.toDateString();

      if (slotDate !== selectedDateStr) return false;

      const existingStartMinutes = getMinutesSinceMidnight(slot.start_time);
      const existingEndMinutes = getMinutesSinceMidnight(slot.end_time);

      // Check if new slot overlaps with existing slot
      const hasOverlap = (
        (newStartMinutes < existingEndMinutes && newEndMinutes > existingStartMinutes) || // New slot overlaps with existing slot
        (newStartMinutes === existingStartMinutes || newEndMinutes === existingEndMinutes) // Exact same start or end time
      );

      return hasOverlap;
    });

    if (overlappingSlot) {
      setError('Time slot overlaps with an existing slot.');
      return;
    }

    // Calculate session duration in minutes
    const sessionDuration = newEndMinutes - newStartMinutes;

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;

      const newSlot: TeacherAvailability = {
        user_id: userId,
        day_of_week: selectedDate.getDay(),
        start_time: startTime,
        end_time: endTime,
        is_recurring: false,
        session_duration: sessionDuration,
        session_date: selectedDate.toISOString()
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/teachers/availability`, {
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
      setSelectedDate(null); // Clear selection after saving
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error creating availability slot:', error);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/teachers/availability/${id}`, {
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

  const isDateDisabled = ({ date }: { date: Date }) => {
    return date < new Date();
  };

  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const slots = availability.filter(slot => new Date(slot.session_date).toDateString() === date.toDateString());
      if (slots.length > 0) {
        return (
          <div className="slot-indicator" title={slots.map(slot => `Start: ${slot.start_time}, End: ${slot.end_time}`).join('\n')}></div>
        );
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Availability Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileDisabled={isDateDisabled}
        tileContent={tileContent}
        tileClassName={({ date, view }) => {
          if (view === 'month' && selectedDate && date.toDateString() === selectedDate.toDateString()) {
            return 'react-calendar__tile--active';
          }
          return null;
        }}
      />
      {selectedDate && (
        <div className="time-selection">
          <label>
            Start Time:
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label>
            End Time:
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
          <button onClick={handleSaveSlot}>Save Slot</button>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
      <div className="slots-list">
        {availability.map(slot => (
          <div key={slot.id} className="slot-item">
            <span>{`Date: ${new Date(slot.session_date).toLocaleDateString()}, Start: ${slot.start_time}, End: ${slot.end_time}`}</span>
            <button onClick={() => handleDeleteSlot(slot.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCalendar;