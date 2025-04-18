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
        setClasses(data.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setClasses([]);
      }
    };

    fetchClasses();
  }, [filters]);

  const handleBookClass = async (classItem: ClassItem) => {
    setIsLoading(true);
    setError(null);
    setSelectedClass(classItem);

    try {
      // First check if user has an active subscription
      const subscriptionResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/students/subscription/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!subscriptionResponse.ok) {
        throw new Error('Failed to check subscription status');
      }

      const subscriptionData = await subscriptionResponse.json();
      
      if (!subscriptionData.isActive) {
        setError('You need an active subscription to book classes');
        return;
      }

      // Check if there are spots available
      if (classItem.spotsLeft <= 0) {
        setError('No spots available for this class');
        return;
      }

      // Book the class
      const bookingResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL.replace(/\/api$/, '')}/api/bookings/group`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          class_id: classItem.id,
          student_id: studentId,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error('Failed to book class');
      }

      setShowConfirmation(true);
      
      // Refresh the classes list to update spots left
      const updatedClasses = classes.map(c => {
        if (c.id === classItem.id) {
          return { ...c, spotsLeft: c.spotsLeft - 1 };
        }
        return c;
      });
      setClasses(updatedClasses);
    } catch (error) {
      console.error('Error booking class:', error);
      setError('Failed to book class. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const focusAreas = [
    'Yoga for Flexibility',
    'Yoga for Strength',
    'Meditation',
    'PCOS/PCOD',
    'Weight Loss',
    'Stress Relief'
  ];

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
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        <select
          name="level"
          value={filters.level}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Level</option>
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
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
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-lg shadow overflow-hidden">
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
            </div>
          </div>
        ))}
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
    </div>
  );
};

export default BrowseClasses;