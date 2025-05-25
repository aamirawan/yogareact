import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import categoryIcon from '../../assets/images/category.svg';
import dayIcon from '../../assets/images/day.svg';
import nightIcon from '../../assets/images/night.svg';
import { classesApi } from '../../utils/api'; // Using fetch-based API client
import { formatDateToString, getNextDays, getDayOfWeekShort, formatDateForDisplay, getDayOfWeekNumber, createClassInstancesForDate, formatTimeTo12Hour } from '../../utils/dateUtils';
import { useAuth } from '../../context/AuthContext';

// Types
interface ClassItem {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
  };
  time: string;
  date: string;
  duration: number;
  category: string;
  signedUp: number;
  isJoined: boolean;
  recurring_days?: number[];
}

// Backend response structure is now handled directly in the API utility

// Date selector component
const DateSelector: React.FC<{
  dates: { day: number; weekday: string }[];
  selectedDate: number;
  onSelectDate: (day: number) => void;
}> = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <div className="flex flex-row items-center space-x-2 overflow-x-auto pb-2">
      {dates.map((date) => (
        <button
          key={date.day}
          onClick={() => onSelectDate(date.day)}
          className={`px-4 py-2 text-sm font-bold rounded border border-[#6D6D6E] min-w-[100px] ${
            selectedDate === date.day
              ? 'bg-[#121212] text-white'
              : 'bg-white text-[#676B5F]'
          }`}
        >
          {date.day} {date.weekday}
        </button>
      ))}
    </div>
  );
};

// Tag filter component - we're keeping this for display purposes but not using it for filtering
const TagFilter: React.FC<{
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}> = ({ tags, selectedTag, onSelectTag }) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4 my-4" style={{ marginBottom: '8px', marginTop: '8px' }}>
      {tags.map((tag) => (
        <div
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={`flex items-center justify-center px-4 py-2 rounded-full text-sm ${
            selectedTag === tag
              ? 'bg-[#E9E9E9] text-[#121212]'
              : 'bg-white border border-[#C8C8C8] text-[#121212]'
          }`}
        >
          {tag}
          {selectedTag === tag && (
            <span className="ml-2 w-2 h-2 border border-black rounded-full flex items-center justify-center">
              <span className="text-xs">×</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// Class card component
const ClassCard: React.FC<{
  classItem: ClassItem;
  onJoin: (classItem: ClassItem) => void;
  isAuthenticated: boolean;
}> = ({ classItem, onJoin, isAuthenticated }) => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    if (isAuthenticated) {
      // If user is logged in, proceed with booking
      onJoin(classItem);
    } else {
      // If user is not logged in, redirect to login page
      navigate('/account/login');
    }
  };
  
  return (
    <>
    <div className="w-full border border-[#CFCFCF] rounded-[10px] p-5 mb-5 relative hidden md:block">
      {/* Desktop View - unchanged */}
      <div className="hidden md:block">
        {/* Time and duration on the same line at the top */}
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg text-[#121212]">
            {classItem.time}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-[#121212]" />
            <span className="font-semibold text-sm text-[#121212]">{classItem.duration} mins</span>
          </div>
        </div>

        <div className="flex flex-row">
          {/* Left column with instructor avatar */}
          <div className="flex-shrink-0 w-[81px] h-[81px] rounded-full overflow-hidden mr-6">
            <img
              src={classItem.instructor.avatar}
              alt={classItem.instructor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle column with class details */}
          <div className="flex-grow">
            <h3 className="text-base font-semibold text-[#121212] mb-2">
              {classItem.title}
            </h3>
            <p className="text-[#545454] mb-2">{classItem.instructor.name}</p>
            
            {/* Category tag */}
            <div className="inline-flex items-center border border-[#676B5F] rounded-lg px-2 py-1 text-xs text-[#676B5F]">
              <span className="mr-1">
                <img src={categoryIcon} alt="Category" className="w-4 h-4" />
              </span>
              {classItem.category}
            </div>
          </div>

          {/* Right column with CTA */}
          <div className="flex flex-col items-end justify-end ml-4 min-w-[120px]">
            {/* Button and signup count */}
            <div className="mt-auto">
              <button
                onClick={handleButtonClick}
                className={`px-5 py-2 rounded-lg text-white text-sm font-medium ${
                  classItem.isJoined ? 'bg-[#E32552]' : 'bg-[#121212]'
                }`}
              >
                {classItem.isJoined ? "You're in!" : 'Count me in'}
              </button>
              <p className="text-xs text-center mt-2 text-[#676B5F]">{classItem.signedUp} Signed up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Mobile View - based on Figma design */}
    <div className="w-full border border-[#CFCFCF] rounded-[10px] p-5 mb-5 relative md:hidden">
      <div className="md:hidden">
        {/* Time and duration on the same line at the top */}
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg text-[#121212]">
            {classItem.time}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-[#121212]" />
            <span className="font-semibold text-sm text-[#121212]">{classItem.duration} mins</span>
          </div>
        </div>

        <div className="relative pt-4">
          {/* Instructor avatar - positioned to match Figma design */}
          <div className="absolute top-4 w-[77px] h-[77px] rounded overflow-hidden">
            <img
              src={classItem.instructor.avatar}
              alt={classItem.instructor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Class details - positioned to match Figma design */}
          <div className="pl-[100px] pr-2 mb-4">
            <h3 className="text-base font-semibold text-[#121212] mb-1">
              {classItem.title}
            </h3>
            <p className="text-[#545454] mb-2">{classItem.instructor.name}</p>
          </div>

          {/* Category tag and CTA button */}
          <div className="flex justify-between items-center mt-2">
            <div className="inline-flex items-center border border-[#676B5F] rounded-lg px-2 py-1 text-xs text-[#676B5F]">
              <span className="mr-1">
                <img src={categoryIcon} alt="Category" className="w-4 h-4" />
              </span>
              {classItem.category}
            </div>
            
            <button
              onClick={handleButtonClick}
              className={`px-5 py-2 rounded-lg text-white text-sm font-medium ${
                classItem.isJoined ? 'bg-[#E32552]' : 'bg-[#121212]'
              }`}
            >
              {classItem.isJoined ? "You're in!" : 'Count me in'}
            </button>
          </div>
          
          {/* Signup count */}
          <div className="text-right mt-1 mr-1">
            <p className="text-xs text-[#676B5F]">{classItem.signedUp} Signed up</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// Day group component
const DayGroup: React.FC<{
  title: string;
  classes: ClassItem[];
  onJoin: (classItem: ClassItem) => void;
  isAuthenticated: boolean;
}> = ({ title, classes, onJoin, isAuthenticated }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-[#121212] mb-4">{title}</h2>
      <div className="space-y-4">
        {classes.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} onJoin={onJoin} isAuthenticated={isAuthenticated} />
        ))}
      </div>
    </div>
  );
};

// Success Popup Component
interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  classTime: string;
  classTitle: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose, classTime, classTitle }) => {
  if (!isOpen) return null;
  
  return (
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
        <p className="text-xl mb-6">See you at {classTime} for {classTitle}!</p>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="bg-black text-white py-3 px-12 rounded-md font-medium text-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main component
const GroupClasses: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // State for theme toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // State for success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successClassInfo, setSuccessClassInfo] = useState({ time: '', title: '' });
  
  // State for loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for dates
  const [dates, setDates] = useState<{ day: number; weekday: string; date: Date }[]>([]);
  const [selectedDateObj, setSelectedDateObj] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  
  // We're keeping categories for display but not using them for filtering
  const [selectedTag, setSelectedTag] = useState('PCOS/PCOS');
  
  // Tags data - keeping the original categories
  const tags = [
    'PCOS/PCOS',
    'PCOS/PCOS +',
  ];
  
  // State for classes
  const [classGroups, setClassGroups] = useState<Record<string, ClassItem[]>>({});
  
  // State for user bookings
  const [userBookings, setUserBookings] = useState<any[]>([]);
  
  // Initialize dates for the next 7 days
  useEffect(() => {
    const today = new Date();
    const nextDays = getNextDays(today, 7);
    
    const formattedDates = nextDays.map(date => ({
      day: date.getDate(),
      weekday: getDayOfWeekShort(date),
      date: date
    }));
    
    setDates(formattedDates);
    setSelectedDateObj(today);
    setSelectedDate(today.getDate());
  }, []);
  
  // Fetch user bookings on component mount
  useEffect(() => {
    fetchUserBookings();
  }, []); // Fetch once on component mount

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      if (dates.length === 0) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // We don't need to pass a specific date to the API anymore
        // as we'll filter classes based on recurring days
        // For non-logged-in users, the API will return all classes without student-specific filtering
        const response = await classesApi.getAvailableClasses();
        
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch classes');
        }
        
        console.log('API Response:', response); // Debug log to check API response
        
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
          console.log('No classes found in API response');
          setClassGroups({});
          return;
        }
        
        // Process the generic classes based on the selected date
        const selectedDayOfWeek = getDayOfWeekNumber(selectedDateObj);
        console.log('Selected day of week:', selectedDayOfWeek); // 0 for Sunday, 1 for Monday, etc.
        
        // Transform backend data to frontend format
        const transformedClasses = response.data.map((cls: any) => {
          // Extract teacher name from the joined data
          const firstName = cls.first_name || cls.teacher_first_name || '';
          const lastName = cls.last_name || cls.teacher_last_name || '';
          const instructorName = firstName && lastName 
            ? `${firstName} ${lastName}`
            : 'Unknown Instructor';
          
          return {
            id: cls.class_id || cls.id || String(Math.random()),
            title: cls.title || cls.class_name || 'Yoga Class',
            instructor: {
              name: instructorName,
              avatar: cls.profile_photo || cls.profile_image || cls.teacher_profile_image || 'https://via.placeholder.com/81',
            },
            time: cls.start_time ? formatTimeTo12Hour(cls.start_time) : '8:30 PM',
            date: cls.start_date || cls.class_date || formatDateToString(selectedDateObj),
            duration: cls.duration || 60,
            category: cls.level || cls.class_level || 'General',
            signedUp: cls.participants_count || cls.booked_seats || 0,
            isJoined: false, // Will be updated after checking bookings
            recurring_days: cls.recurring_days || [], // Keep track of recurring days
          };
        });
        
        // Create class instances for the selected date based on recurring days
        const classesForSelectedDate = createClassInstancesForDate(transformedClasses, selectedDateObj);
        console.log('Classes for selected date:', classesForSelectedDate);
        
        // Now check if any of these classes are already booked by the user (only if logged in)
        const updatedClasses = classesForSelectedDate.map(cls => {
          // For non-logged-in users, no classes are joined
          if (!isAuthenticated) {
            return cls; // Return class as-is without checking bookings
          }
          
          // For recurring classes, we need to get the original class ID (without the date suffix)
          const originalClassId = cls.id.includes('_') ? cls.id.split('_')[0] : cls.id;
          
          // The date for this class instance
          const classDate = cls.date;
          
          // Debug info about the class we're checking
          console.log(`Checking class: ID=${originalClassId}, Date=${classDate}`);
          
          // Check if this class is already booked by the user for this date
          const isBooked = userBookings.some(booking => {
            // Get booking class ID - handle both classId and class_id formats
            const bookingClassId = String(booking.classId || booking.class_id);
            
            // Get booking date (from scheduledAt field)
            const bookingDate = booking.scheduledAt ? booking.scheduledAt.split('T')[0] : '';
            
            // Log the comparison we're making
            console.log(`  Comparing with booking: ID=${bookingClassId}, Date=${bookingDate}`);
            
            // Simple comparison - just check if the IDs match without date check
            // This is because we're already filtering the classes by date with createClassInstancesForDate
            const matchId = bookingClassId === String(originalClassId);
            const matchDate = bookingDate === classDate;
            
            console.log(`  ID match: ${matchId}, Date match: ${matchDate}`);
            
            if (matchId && matchDate) {
              console.log(`  FOUND MATCH: Class ${originalClassId} on ${classDate} is booked!`);
              return true;
            }
            
            // If dates don't match but IDs do, still log it for debugging
            if (matchId) {
              console.log(`  ID matched but date didn't: booking date=${bookingDate}, class date=${classDate}`);
            }
            
            return false;
          });
          
          // Return the class with updated booking status
          return {
            ...cls,
            isJoined: isBooked
          };
        });
        
        console.log('Classes with booking status:', updatedClasses);
        
        // Group classes by date
        const grouped = {
          [formatDateToString(selectedDateObj)]: updatedClasses
        };
        
        console.log('Grouped Classes:', grouped);
        setClassGroups(grouped);
      } catch (err) {
        console.error('Failed to fetch classes:', err);
        setError('Failed to load classes. Please try again later.');
        
        // Set some fallback data for development
        setClassGroups({
          [formatDateToString(new Date())]: [
            {
              id: '1',
              title: "45-Min Yoga Practice: Take Time For Yourself",
              instructor: {
                name: 'Aishwariya Mandop',
                avatar: 'https://via.placeholder.com/81',
              },
              time: '8:30 pm',
              date: formatDateToString(new Date()),
              duration: 60,
              category: 'General',
              signedUp: 14,
              isJoined: false,
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchClasses();
  }, [selectedDateObj, dates, isAuthenticated, userBookings]); // Refetch when the selected date, dates array, or auth state changes
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    const newSelectedDate = dates.find(d => d.day === day)?.date;
    if (newSelectedDate) {
      setSelectedDateObj(newSelectedDate);
    }
  };

  // Fetch user bookings function (to be reused)
  const fetchUserBookings = async () => {
    // If user is not authenticated, don't try to fetch bookings
    if (!isAuthenticated) {
      console.log('User not authenticated, skipping booking fetch');
      setUserBookings([]);
      return [];
    }
    
    try {
      const response = await classesApi.getUserBookings();
      
      if (response.success && response.data) {
        console.log('User bookings refreshed:', response.data);
        
        // Log each booking in detail for debugging
        response.data.forEach((booking: any, index: number) => {
          console.log(`Booking ${index + 1}:`);
          console.log(`- ID: ${booking.id}`);
          console.log(`- Class ID: ${booking.classId}`);
          console.log(`- Scheduled At: ${booking.scheduledAt}`);
          console.log(`- Class Date: ${booking.classDate}`);
          console.log(`- Status: ${booking.bookingStatus}`);
          
          // Extract date from scheduledAt for debugging
          if (booking.scheduledAt) {
            const scheduledDate = booking.scheduledAt.split('T')[0];
            console.log(`- Extracted Date: ${scheduledDate}`);
          }
        });
        
        setUserBookings(response.data);
        return response.data;
      } else {
        console.log('No bookings found or error fetching bookings');
        setUserBookings([]);
        return [];
      }
    } catch (err) {
      console.error('Failed to fetch user bookings:', err);
      setUserBookings([]);
      return [];
    }
  };

  // Handle joining a class
  const handleJoinClass = async (classItem: ClassItem) => {
    // For non-logged in users, this function won't be called directly
    // as the ClassCard component will redirect to login page instead
    // This is just a safeguard
    if (!isAuthenticated) {
      navigate('/account/login');
      return;
    }
    
    try {
      setLoading(true);
      
      // If the class is already joined, don't try to book it again
      if (classItem.isJoined) {
        alert('You are already booked for this class!');
        return;
      }
      
      // Extract the class ID (remove the date suffix if it's a recurring class instance)
      const originalClassId = classItem.id.includes('_') 
        ? classItem.id.split('_')[0] 
        : classItem.id;
      
      // Use the date from the class item as the instance date
      const instanceDate = classItem.date;
      
      console.log('Booking class:', originalClassId, 'for date:', instanceDate);
      
      // Call the API to book the class
      const response = await classesApi.bookGroupClass(originalClassId, instanceDate);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to book class');
      }
      
      // Update the UI to show the class as joined
      setClassGroups(prevGroups => {
        const updatedGroups = { ...prevGroups };
        
        Object.keys(updatedGroups).forEach(date => {
          updatedGroups[date] = updatedGroups[date].map(c => 
            c.id === classItem.id ? { ...c, isJoined: true, signedUp: c.signedUp + 1 } : c
          );
        });
        
        return updatedGroups;
      });
      
      // Show success popup with class details
      setSuccessClassInfo({
        time: classItem.time,
        title: classItem.title
      });
      setShowSuccessPopup(true);
      
      // Refresh user bookings to ensure consistency
      await fetchUserBookings();
      
      // Show success message
      alert('Class booked successfully!');
    } catch (error) {
      console.error('Error booking class:', error);
      alert(error instanceof Error ? error.message : 'Failed to book class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Get classes for the selected date
  const getClassesForSelectedDate = () => {
    const selectedDateStr = formatDateToString(selectedDateObj);
    return classGroups[selectedDateStr] || [];
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        classTime={successClassInfo.time}
        classTitle={successClassInfo.title}
      />
      
      {/* Page title */}
      <div className="bg-[#F8F8F8] py-12">
        <h1 className="text-3xl font-bold text-center text-[#121212]">
          Group Classes
        </h1>
      </div>

      <div className="max-w-[1224px] mx-auto px-4" style={{marginTop: '30px'}}>
        {/* Live Classes section with theme toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-[#121212]">Live Classes</h2>
          
          <div className="flex items-center space-x-2" 
            style={{
              border: '1px solid #E9E9E9',
              borderRadius: '5px',
              backgroundColor: '#E9E9E9',
              width: '86px',
              height: '40px',
              padding: '5px'
            }}            
          >
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 bg-[#E9E9E9] rounded flex items-center justify-center"
            >
              <img src={dayIcon} alt="Day" />
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 bg-[#121212] rounded flex items-center justify-center"
            >
              <img src={nightIcon} alt="Night" />
            </button>
          </div>
        </div>

        {/* Date selector */}
        <DateSelector
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />

        {/* Divider */}
        <div className="border-t border-[#CFCFCF] my-6" style={{ marginBottom: '0' }}></div>

        {/* Tag filters - displayed but not used for filtering */}
        <div className="flex items-center mb-4" style={{ marginBottom: '0' }}>
          <div className="mr-4">
            <img src={categoryIcon} alt="Category" />
          </div>
          <TagFilter
            tags={tags}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[#CFCFCF] my-6" style={{ marginTop: '0' }}></div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-lg">Loading classes...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* No classes found */}
        {!loading && !error && Object.keys(classGroups).length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg">No classes found for the selected filters.</p>
          </div>
        )}

        {/* Classes for selected date */}
        {!loading && !error && Object.keys(classGroups).length > 0 && (
          <>
            {getClassesForSelectedDate().length > 0 ? (
              <DayGroup
                title={formatDateForDisplay(selectedDateObj)}
                classes={getClassesForSelectedDate()}
                onJoin={handleJoinClass}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">No classes available for {formatDateForDisplay(selectedDateObj)}.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupClasses;
