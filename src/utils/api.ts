// API base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000/api'; // Default to localhost if env var not set

// Helper function to handle fetch requests with authentication
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'An error occurred');
  }
  
  return response.json();
};

// Class related API calls
export const classesApi = {
  // Get available classes for students - now gets all generic classes
  getAvailableClasses: async (date?: string) => {
    try {
      // Using POST as per the backend implementation
      // If date is provided, it will filter by date, otherwise it gets all generic classes
      return await fetchWithAuth('/students/get/classes', {
        method: 'POST',
        body: JSON.stringify(date ? { date } : {})
      });
    } catch (error) {
      console.error('Error fetching available classes:', error);
      throw error;
    }
  },
  
  // Get one-on-one sessions
  getOneOnOneSessions: async (teacherId: string) => {
    try {
      return await fetchWithAuth(`/students/get/one/on/one/sessions?teacher_id=${teacherId}`);
    } catch (error) {
      console.error('Error fetching one-on-one sessions:', error);
      throw error;
    }
  },
  
  // Book a group class
  bookGroupClass: async (classId: string, instanceDate: string) => {
    try {
      return await fetchWithAuth('/students/bookings/group', {
        method: 'POST',
        body: JSON.stringify({ 
          class_id: classId,
          instance_date: instanceDate
        })
      });
    } catch (error) {
      console.error('Error booking group class:', error);
      throw error;
    }
  },
  
  // Get user bookings
  getUserBookings: async () => {
    try {
      return await fetchWithAuth('/students/bookings');
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },
  
  // Book a one-on-one session
  bookOneOnOneSession: async (bookingData: {
    teacher_id: string,
    availability_id: string,
    session_date: string,
    start_time: string,
    end_time: string,
    booking_type?: string,
    credit_used?: number
  }) => {
    try {
      return await fetchWithAuth('/students/bookings/one-on-one', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      });
    } catch (error) {
      console.error('Error booking one-on-one session:', error);
      throw error;
    }
  }
};
