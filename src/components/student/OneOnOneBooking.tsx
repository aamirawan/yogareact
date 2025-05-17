import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Teacher, TimeSlot } from '../../types/student';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';
import { classesApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Add custom styles for the calendar
const calendarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  .react-calendar {
    width: 100%;
    border: 1px solid #E5E7EB;
    border-radius: 1rem;
    padding: 1.5rem;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .react-calendar__tile {
    padding: 0;
    font-size: 1rem;
    color: #000000;
    font-family: 'Inter', sans-serif;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px auto;
    position: relative;
  }
  
  .react-calendar__tile--now {
    background: transparent !important;
    color: #E32552 !important;
    font-weight: bold;
  }

  .react-calendar__tile--active {
    background: transparent !important;
    color: white !important;
    font-weight: 500;
    position: relative;
  }
  
  .react-calendar__tile--active abbr {
    background: #121212;
    color: white;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-calendar__tile:disabled {
    background-color: transparent !important;
    color: #9ca3af !important;
    cursor: not-allowed !important;
  }
  
  .react-calendar__navigation {
    display: none;
  }
  
  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.875rem;
    color: #6B7280;
    font-family: 'Inter', sans-serif;
    margin-bottom: 0.5rem;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5rem;
    abbr {
      text-decoration: none;
    }
  }
  
  .react-calendar__month-view__days__day--weekend {
    color: #000000;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #9CA3AF;
  }
  
  .react-calendar__month-view__days {
    row-gap: 0.5rem;
  }
  
  .react-calendar__month-view__days__day {
    aspect-ratio: 1/1;
  }
  
  abbr[title] {
    text-decoration: none;
    cursor: pointer;
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());
  const [displayedTeachers, setDisplayedTeachers] = useState<Teacher[]>([]);
  const [showAllTeachers, setShowAllTeachers] = useState(false);
  // We don't need visibleTimeSlots anymore as we're using allTimeSlots with timeSlotIndex
  const [timeSlotIndex, setTimeSlotIndex] = useState(0);
  const timeSlotDisplayCount = 5;
  
  // Generate all time slots for the day with half-hour intervals
  const allTimeSlots = [
    '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM', 
    '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', 
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', 
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];

  // Fetch teachers when component mounts
  useEffect(() => {
    fetchTeachers();
  }, []);
  
  // Auto-select first teacher when teachers are loaded
  useEffect(() => {
    if (teachers.length > 0 && !selectedTeacher) {
      setSelectedTeacher(teachers[0]);
      setDisplayedTeachers(teachers.slice(0, 3));
    }
  }, [teachers]);

  // Fetch time slots when a teacher is selected
  useEffect(() => {
    if (selectedTeacher) {
      fetchTimeSlots(selectedTeacher.id);
    }
  }, [selectedTeacher]);
  
  // Auto-select first available date and time slot when time slots are loaded
  useEffect(() => {
    if (timeSlots.length > 0 && !selectedDate) {
      // Find the first date with available slots
      const firstAvailableSlot = timeSlots[0];
      const firstDate = new Date(firstAvailableSlot.session_date);
      setSelectedDate(firstDate);
      
      // Auto-select the first time slot for this date
      const slotsForDate = timeSlots.filter(slot => {
        const slotDate = new Date(slot.session_date);
        return isSameDay(slotDate, firstDate);
      });
      
      if (slotsForDate.length > 0) {
        setSelectedSlot(slotsForDate[0]);
        
        // Convert API time format to display format for finding index
        const apiTime = slotsForDate[0].start_time;
        let [hours, minutes] = apiTime.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // Convert 0 to 12
        const formattedTime = `${hour}:${minutes.substring(0, 2)} ${ampm}`;
        
        // Find the index of the time slot in allTimeSlots
        const timeSlotIndex = allTimeSlots.findIndex(time => time === formattedTime);
        if (timeSlotIndex >= 0) {
          setTimeSlotIndex(Math.max(0, Math.min(timeSlotIndex, allTimeSlots.length - timeSlotDisplayCount)));
        }
      }
    }
  }, [timeSlots]);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      // Use the direct fetch for teachers
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/teachers/profile`);

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
      // Use the API utility function
      const data = await classesApi.getOneOnOneSessions(teacherId);
      console.log('Raw time slots data received:', data);
      // Handle case when no slots are available
      if (!Array.isArray(data)) {
        setTimeSlots([]);
        return;
      }

      const availableSlots: TimeSlot[] = data.map((slot: TimeSlotResponse, index: number) => ({
        id: `${slot.teacher_id}-${slot.session_date}-${slot.start_time}-${index}`,
        classId: slot.class_id,
        teacherId: teacherId,
        session_date: slot.session_date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        isAvailable: true
      }));

      setTimeSlots(availableSlots);
    } catch (err) {
      setError('Failed to load time slots. Please try again later.');
      console.error('Error fetching time slots:', err);
      setTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSession = async () => {
    console.log('Selected slot:', selectedSlot);
    console.log('Selected teacher:', selectedTeacher);
    if (!selectedSlot || !selectedTeacher) return;
    
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate('/account/login');
      return;
    }

    setIsLoading(true);
    try {
      // Format the date and time for the scheduledAt field
      const sessionDate = selectedSlot.session_date;
      const startTime = selectedSlot.start_time;
      
      // Log the data being sent to the backend
      console.log('Booking session with data:', {
        teacher_id: selectedSlot.teacherId,
        availability_id: selectedSlot.classId,
        session_date: sessionDate,
        start_time: startTime,
        end_time: selectedSlot.end_time
      });

      // Use the API utility function
      const response = await classesApi.bookOneOnOneSession({
        teacher_id: selectedSlot.teacherId,
        availability_id: selectedSlot.classId,
        session_date: sessionDate,
        start_time: startTime,
        end_time: selectedSlot.end_time,
        // Additional fields to match the Bookings table schema
        booking_type: 'one_on_one',
        credit_used: 1
      });
      
      // Log the response to help debug
      console.log('Booking response:', response);
      
      // Check if the response indicates success
      if (response && response.error) {
        throw new Error(response.message || 'Failed to book session');
      }

      // First show the success popup - this needs to happen before we modify any other state
      setShowConfirmation(true);
      
      // Then update the UI to reflect the booking
      // Remove the booked slot from available slots
      setTimeSlots(prevSlots => prevSlots.filter(slot => slot.id !== selectedSlot.id));
      
      // Calculate remaining slots for the selected date
      const remainingSlotsForDate = timeSlots.filter(
        slot => slot.id !== selectedSlot.id && 
        new Date(slot.session_date).toDateString() === new Date(sessionDate).toDateString()
      );
      
      // Update the selected slot state based on remaining slots
      if (remainingSlotsForDate.length === 0) {
        // No more slots for this date, reset selection but keep the popup visible
        setTimeout(() => {
          if (showConfirmation) { // Only update if popup is still showing
            setSelectedSlot(null);
          }
        }, 100);
      } else {
        // Select the first available slot for this date, but keep the popup visible
        setTimeout(() => {
          if (showConfirmation) { // Only update if popup is still showing
            setSelectedSlot(remainingSlotsForDate[0]);
          }
        }, 100);
      }
    } catch (err) {
      // Show detailed error message
      const errorMessage = err instanceof Error ? 
        err.message : 
        'Failed to book session. Please try again later.';
      
      setError(errorMessage);
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

  // Use a more generic type to match react-calendar's onChange prop
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      
      // Find slots for the selected date
      const slotsForDate = timeSlots.filter(slot => {
        const slotDate = new Date(slot.session_date);
        return isSameDay(slotDate, value);
      });
      
      // Auto-select the first time slot for this date
      if (slotsForDate.length > 0) {
        setSelectedSlot(slotsForDate[0]);
        
        // Find the index of the time slot in allTimeSlots
        const timeSlotIndex = allTimeSlots.findIndex(time => time === slotsForDate[0].start_time);
        if (timeSlotIndex >= 0) {
          setTimeSlotIndex(Math.max(0, Math.min(timeSlotIndex, allTimeSlots.length - timeSlotDisplayCount)));
        }
      } else {
        setSelectedSlot(null);
      }
    }
  };

  // Reset states when teacher changes
  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSelectedDate(null);
    setSelectedSlot(null);
    setTimeSlots([]);
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    const prevMonth = new Date(activeMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setActiveMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(activeMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setActiveMonth(nextMonth);
  };
  
  // Handle time slot navigation
  
  const handlePrevTimeSlot = () => {
    const newIndex = Math.max(0, timeSlotIndex - 1);
    setTimeSlotIndex(newIndex);
  };
  
  const handleNextTimeSlot = () => {
    const maxStartIndex = Math.max(0, allTimeSlots.length - timeSlotDisplayCount);
    const newIndex = Math.min(maxStartIndex, timeSlotIndex + 1);
    setTimeSlotIndex(newIndex);
  };

  // Handle view all teachers toggle
  const toggleViewAllTeachers = () => {
    if (showAllTeachers) {
      setDisplayedTeachers(teachers.slice(0, 3));
    } else {
      setDisplayedTeachers([...teachers]);
    }
    setShowAllTeachers(!showAllTeachers);
  };

  return (
    <div className="bg-white min-h-screen mb-[25px]">
      <style>{calendarStyles}</style>
      
      {/* Page header with title */}
      <div className="bg-[#F8F8F8] py-12">
        <h1 className="text-3xl font-bold text-center text-[#121212]">
          1:1 Classes
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Title and subtitle */}
        <div className="mb-8 mt-8">
          <h2 className="text-[27px] font-semibold text-[#E32552] mb-2">
            #1 Authentic 1:1 Yoga Classes!
          </h2>
          <p className="text-[18px] text-black">
            Top Recommended for you!
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4 mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#121212] mx-auto"></div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Teacher Cards */}
          <div className="lg:w-1/2">
            {/* Teacher Cards */}
            <div className="mb-6">
              {displayedTeachers.map((teacher) => (
                <div
                  key={`teacher-${teacher.id}`}
                  className={`rounded-[12px] p-4 mb-4 cursor-pointer transition-all ${selectedTeacher?.id === teacher.id 
                    ? 'bg-black border-2' 
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'}`}
                  onClick={() => handleTeacherSelect(teacher)}
                >
                  <div className="flex items-center">
                    <div className="w-[130px] h-[140px] rounded-[15.2px] overflow-hidden bg-[#99928C] relative mr-4">
                      <img
                        src={teacher.profile_photo || 'https://via.placeholder.com/150'}
                        alt={`${teacher.first_name} ${teacher.last_name}`}
                        className="w-full h-full object-cover"
                      />        
                    </div>
                    <div>
                      <h3 className={`font-semibold text-[20px] mb-1 ${selectedTeacher?.id === teacher.id ? 'text-white' : 'text-black'}`}>
                        {teacher.first_name} {teacher.last_name}
                      </h3>
                      
                      <div className="flex space-x-2 mb-2">
                        <div className={`rounded-[8px] px-[10px] py-[4px] text-xs ${selectedTeacher?.id === teacher.id 
                          ? 'bg-[#1A1A1A] border border-[#333333] text-white' 
                          : 'bg-gray-100 text-gray-700'}`}>
                          <span>PCOS/PCOD</span>
                        </div>
                        <div className={`rounded-[8px] px-[10px] py-[4px] text-xs ${selectedTeacher?.id === teacher.id 
                          ? 'bg-[#1A1A1A] border border-[#333333] text-white' 
                          : 'bg-gray-100 text-gray-700'}`}>
                          <span>Weight Loss</span>
                        </div>
                      </div>
                      
                      {/* Star rating */}
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="mr-1">
                            {star <= 4 ? (
                              <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.1853 0.36499L16.0851 9.28957H25.4689L17.8772 14.8053L20.777 23.7298L13.1853 18.2141L5.5936 23.7298L8.49337 14.8053L0.901674 9.28957H10.2855L13.1853 0.36499Z" fill="#F49F0C"/>
                              </svg>
                            ) : (
                              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5374 0.36499L15.4371 9.28957H24.821L17.2293 14.8053L20.129 23.7298L12.5374 18.2141L4.94565 23.7298L7.84542 14.8053L0.253725 9.28957H9.63758L12.5374 0.36499Z" fill="#BABABA"/>
                              </svg>
                            )}
                          </div>
                        ))}
                        <span className={`ml-2 text-sm font-medium ${selectedTeacher?.id === teacher.id ? 'text-white' : 'text-gray-700'}`}>
                          4.8
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16455 17.6154L17.2819 9.49805M17.2819 9.49805H9.16455M17.2819 9.49805V17.6154" 
                          stroke={selectedTeacher?.id === teacher.id ? "#FFFFFF" : "#121212"} 
                          strokeWidth="1.62348" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* View All Teachers Link */}
              <div className="flex justify-center mt-6">
                <button 
                  className="text-black underline text-sm font-medium"
                  onClick={toggleViewAllTeachers}
                >
                  View All Teachers
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar and Time Slots */}
          <div className="lg:w-1/2">
            {selectedTeacher && (
              <div>
                {/* Calendar header with select date and arrows - outside the calendar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#000000" strokeWidth="2"/>
                      <path d="M3 10H21" stroke="#000000" strokeWidth="2"/>
                      <path d="M8 2L8 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M16 2L16 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <h3 className="text-base font-medium font-['Inter']">Select Date</h3>
                  </div>
                  <div className="flex items-center">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full" 
                      aria-label="Previous month"
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full ml-2" 
                      aria-label="Next month"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Calendar Section */}
                <div className="p-4 rounded-lg">
                  <div className="text-xl font-bold mb-4 font-['Inter']">
                    {format(activeMonth, 'MMMM yyyy')}
                  </div>
                  
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    tileClassName={tileClassName}
                    tileDisabled={tileDisabled}
                    className="w-full border-none"
                    formatDay={(_, date) => format(date, 'd')}
                    activeStartDate={activeMonth}
                    formatShortWeekday={(locale, date) => format(date, 'EEE').substring(0, 2)}
                  />
                </div>

                {/* Time Slots */}
                <div className="p-4 rounded-lg mt-6">
                  {/* Time slot selection with slider */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <button 
                        className="p-2 focus:outline-none" 
                        onClick={handlePrevTimeSlot}
                        disabled={timeSlotIndex === 0}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <div className="flex space-x-2 overflow-hidden">
                        {selectedDate ? (
                          allTimeSlots.map((time) => {
                            // Check if this time is available in the actual time slots
                            // Convert API time format (HH:MM:SS) to display format (H:MM AM/PM)
                            const matchingSlot = timeSlots.find(slot => {
                              const slotDate = new Date(slot.session_date);
                              
                              // Convert the API time format to the display format
                              const apiTime = slot.start_time;
                              let [hours, minutes] = apiTime.split(':');
                              let hour = parseInt(hours, 10);
                              const ampm = hour >= 12 ? 'PM' : 'AM';
                              hour = hour % 12;
                              hour = hour ? hour : 12; // Convert 0 to 12
                              const formattedTime = `${hour}:${minutes.substring(0, 2)} ${ampm}`;
                              
                              return isSameDay(slotDate, selectedDate) && formattedTime === time;
                            });
                            
                            // Check if this is the selected slot
                            let isSelected = false;
                            if (selectedSlot) {
                              // Convert the selected slot time to display format
                              const apiTime = selectedSlot.start_time;
                              let [hours, minutes] = apiTime.split(':');
                              let hour = parseInt(hours, 10);
                              const ampm = hour >= 12 ? 'PM' : 'AM';
                              hour = hour % 12;
                              hour = hour ? hour : 12; // Convert 0 to 12
                              const formattedTime = `${hour}:${minutes.substring(0, 2)} ${ampm}`;
                              
                              isSelected = time === formattedTime;
                            }
                            
                            const isAvailable = !!matchingSlot;
                            return (
                              <button
                                key={`time-${time}`}
                                onClick={() => isAvailable && matchingSlot && setSelectedSlot(matchingSlot)}
                                className={`px-4 py-2 rounded-[8px] text-center transition-all min-w-[120px] font-['Inter'] ${
                                  isSelected
                                    ? 'bg-[#000] text-white font-medium'
                                    : isAvailable 
                                      ? 'border-2 border-black hover:bg-gray-50 text-black font-medium'
                                      : 'border-2 border-black text-black opacity-60 cursor-not-allowed'
                                }`}
                                disabled={!isAvailable}
                              >
                                {time}
                              </button>
                            );
                          }).slice(timeSlotIndex, timeSlotIndex + timeSlotDisplayCount)
                        ) : (
                          <div className="text-center text-gray-500 py-2 px-4 w-full">
                            Select a date to view available slots
                          </div>
                        )}
                      </div>
                      
                      <button 
                        className="p-2 focus:outline-none" 
                        onClick={handleNextTimeSlot}
                        disabled={timeSlotIndex + timeSlotDisplayCount >= allTimeSlots.length}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {/* Book button - always visible if a date is selected */}
                  {selectedDate && (
                    <div className="mt-6">
                      <button
                        onClick={handleBookSession}
                        className="w-full py-3 bg-[#E32552] text-white rounded-[8px] font-medium text-base hover:bg-[#d01e4a] transition-colors font-['Inter']"
                        disabled={!selectedSlot || isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                          </div>
                        ) : isAuthenticated ? (
                          'Book your Slot'
                        ) : (
                          'Login to Book'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Success Popup Component */}
        {showConfirmation && selectedTeacher && selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="mb-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0ZM40 72C22.3269 72 8 57.6731 8 40C8 22.3269 22.3269 8 40 8C57.6731 8 72 22.3269 72 40C72 57.6731 57.6731 72 40 72Z" fill="#121212"/>
                  <path d="M40 20C35.5817 20 32 23.5817 32 28C32 32.4183 35.5817 36 40 36C44.4183 36 48 32.4183 48 28C48 23.5817 44.4183 20 40 20Z" fill="#E32552"/>
                  <path d="M40 40C31.1634 40 24 47.1634 24 56H56C56 47.1634 48.8366 40 40 40Z" fill="#E32552"/>
                  <path d="M28 28L52 28" stroke="#E32552" strokeWidth="4"/>
                </svg>
              </div>
              
              {/* Text Content */}
              <h2 className="text-3xl font-bold mb-2">Yay! You're in.</h2>
              <p className="text-xl mb-6">
                See you on {format(new Date(selectedSlot.session_date), 'MMMM d, yyyy')} at{' '}
                {selectedSlot.start_time.substring(0, 5)} for your session with {selectedTeacher.first_name}!
              </p>
              
              {/* Close Button */}
              <button 
                onClick={() => setShowConfirmation(false)}
                className="bg-black text-white py-3 px-12 rounded-md font-medium text-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {/* Error Popup */}
        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full flex flex-col items-center text-center">
              {/* Error Icon */}
              <div className="mb-4 text-red-500">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              {/* Text Content */}
              <h2 className="text-3xl font-bold mb-2">Oops!</h2>
              <p className="text-xl mb-6">{error}</p>
              
              {/* Close Button */}
              <button 
                onClick={() => setError(null)}
                className="bg-black text-white py-3 px-12 rounded-md font-medium text-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneOnOneBooking;