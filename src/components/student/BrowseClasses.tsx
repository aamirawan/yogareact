import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, Users, Star } from 'lucide-react';

interface ClassItem {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
  level: string;
  duration: number;
  spotsLeft: number;
  rating: number;
  reviews: number;
  isBooked?: boolean;
  bookingId?: string;
  class_date?: string;
  start_time?: string;
}

const BrowseClasses = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const studentId = user?.id;
  const [filters, setFilters] = useState({
    studentId,
    teacher: '',
    focusArea: user?.focus || '',
    //healthConcern: user?.health_concerns || '',
    //sessionType: 'Group Session',
    level: '',
    date: '',
    time: ''
  });

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  
  // Cancellation state
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/get/classes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filters),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Classes data from API:', data.data); // Log the data to see its structure
        
        // Debug: Check for duplicate IDs in the data
        const idMap: Record<string, number> = {};
        data.data.forEach((item: any, index: number) => {
          const id = item.id?.toString() || '';
          if (idMap[id]) {
            console.warn(`Duplicate ID found: ${id} at indexes ${idMap[id]} and ${index}`);
          } else {
            idMap[id] = index;
          }
        });
        
        // Ensure all required fields are present and properly formatted
        const formattedClasses = data.data.map((classItem: any) => ({
          ...classItem,
          // Use class_id as the primary identifier
          id: classItem.class_id?.toString() || classItem.id?.toString() || '', 
          // Make sure we use the right teacher ID
          teacherId: classItem.teacher_id?.toString() || classItem.user_id?.toString() || '',
          // Calculate spots left
          spotsLeft: classItem.max_participants - (classItem.bookedSpots || 0),
          // Booking status
          isBooked: classItem.isBooked || false,
          bookingId: classItem.bookingId || undefined,
          // Ensure dates are properly formatted
          class_date: classItem.class_date || classItem.date || new Date().toISOString().split('T')[0],
          // Make sure profile photo is available
          profile_photo: classItem.profile_photo || 'https://via.placeholder.com/150'
        }));
        
        setClasses(formattedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setClasses([]);
      }
    };

    fetchClasses();
  }, [filters]);

  // Handle booking a class
  const handleBookClass = async (classItem: ClassItem) => {
    setIsLoading(true);
    setError(null);
    setSelectedClass(classItem);
    
    try {
      // Book the class using the bookGroupClass API
      const bookingResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/bookings/group`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Use the id field which now contains the class_id
          class_id: classItem.id,
          instance_date: classItem.class_date // Pass the class date for recurring classes
        }),
      });

      const responseData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(responseData.message || 'Failed to book class');
      }

      // Update the class with booking information
      const updatedClasses = classes.map(c => {
        if (c.id === classItem.id) {
          return { 
            ...c, 
            isBooked: true,
            bookingId: responseData.bookingId,
            spotsLeft: c.spotsLeft - 1 
          };
        }
        return c;
      });
      
      setClasses(updatedClasses);
      setSelectedClass({
        ...classItem,
        isBooked: true,
        bookingId: responseData.bookingId
      });
      setShowConfirmation(true);
    } catch (error: any) {
      console.error('Error booking class:', error);
      setError(error.message || 'Failed to book class. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle canceling a class
  const handleCancelClass = (classItem: ClassItem) => {
    if (!classItem.bookingId) {
      setError('No booking found to cancel');
      return;
    }
    
    setError(null);
    setSelectedClass(classItem);
    setShowCancelConfirmation(true);
    setCancelError(null);
    setCancelSuccess(false);
  };
  
  // Confirm canceling a class
  const confirmCancelClass = async () => {
    if (!selectedClass || !selectedClass.bookingId) return;
    
    setCancelLoading(true);
    setCancelError(null);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/bookings/${selectedClass.bookingId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to cancel booking');
      }
      
      setCancelSuccess(true);
      
      // Update the classes list to show the class as not booked
      const updatedClasses = classes.map(c => {
        if (c.id === selectedClass.id) {
          return {
            ...c,
            isBooked: false,
            bookingId: undefined, // Use undefined instead of null to match the type
            spotsLeft: c.spotsLeft + 1
          };
        }
        return c;
      });
      
      setClasses(updatedClasses);
      
      // Close the confirmation modal after a delay
      setTimeout(() => {
        setShowCancelConfirmation(false);
        setSelectedClass(null);
      }, 2000);
      
    } catch (error: any) {
      console.error('Error canceling booking:', error);
      setCancelError(error.message || 'Failed to cancel booking. Please try again later.');
    } finally {
      setCancelLoading(false);
    }
  };

  const focusAreas = [
    'Yoga for Flexibility',
    'Yoga for Strength',
    'Meditation',
    'PCOS/PCOD',
    'Weight Loss',
    'Stress Relief'
  ].map((area, index) => ({ id: `focus-${index}`, name: area }));

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Group Classes</h2>
        {/* <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search classes..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div> */}
      </div>

      {/* Filters */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white p-4 rounded-lg">
        <select
          name="focusArea"
          value={filters.focusArea}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Focus Area</option>
          {focusAreas.map(area => (
            <option key={area.id} value={area.name}>{area.name}</option>
          ))}
        </select>

        <select
          name="level"
          value={filters.level}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Level</option>
          {levels.map((level, index) => (
            <option key={`level-${index}`} value={level}>{level}</option>
          ))}
        </select>

        <select
          name="teacher"
          value={filters.teacher}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Teacher</option>
          <option value="1">Sarah Johnson</option>
          <option value="2">Michael Chen</option>
        </select>
      </div> */}

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

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem, index) => (
          <div key={`class-${classItem.id}-${index}`} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center p-4">
              <img
                src={classItem.profile_photo}
                alt={classItem.title}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{classItem.title}</h3>
                <p className="text-gray-600">with {classItem.first_name} {classItem.last_name}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {classItem.level}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{classItem.duration} minutes</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{classItem.spotsLeft} spots left</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>{classItem.rating} ({classItem.reviews} reviews)</span>
                </div>
              </div>
              {classItem.isBooked ? (
                <button
                  onClick={() => handleCancelClass(classItem)}
                  disabled={isLoading}
                  className="w-full mt-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  Cancel Booking
                </button>
              ) : (
                <button 
                  onClick={() => handleBookClass(classItem)}
                  disabled={isLoading || classItem.spotsLeft <= 0}
                  className={`w-full mt-4 py-2 rounded-lg ${
                    classItem.spotsLeft <= 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white`}
                >
                  {classItem.spotsLeft <= 0 ? 'Class Full' : 'Book Now'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600">
              You have successfully booked {selectedClass.title} with {selectedClass.first_name} {selectedClass.last_name}.
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
      
      {/* Cancel Confirmation Modal */}
      {showCancelConfirmation && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {cancelSuccess ? (
              <>
                <h3 className="text-xl font-semibold mb-4">Booking Cancelled</h3>
                <p className="text-gray-600 mb-6">
                  Your booking for <span className="font-semibold">{selectedClass.title}</span> has been successfully cancelled.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">Cancel Booking</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel your booking for <span className="font-semibold">{selectedClass.title}</span>?
                </p>
                {cancelError && (
                  <div className="bg-red-50 p-3 rounded-md mb-4">
                    <p className="text-red-700 text-sm">{cancelError}</p>
                  </div>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCancelConfirmation(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    disabled={cancelLoading}
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={confirmCancelClass}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    disabled={cancelLoading}
                  >
                    {cancelLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                        Cancelling...
                      </span>
                    ) : (
                      'Yes, Cancel'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseClasses;