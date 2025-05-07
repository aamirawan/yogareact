export interface TeacherProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    certifications: string[];
    profile_photo: string;
  }
  
  export interface GroupClass {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    user_id: string;
    max_participants: number;
    duration: number; // in minutes
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    
    // Frontend properties (camelCase)
    recurringDays: string[];
    classDate?: string; // Date of the class in YYYY-MM-DD format
    startTime?: string; // Start time in HH:MM format
    endTime?: string; // End time in HH:MM format
    isRecurring?: boolean; // Whether this is a recurring class
    recurringUntil?: string; // End date for recurring classes
    
    // Backend properties (snake_case)
    class_date?: string; // Same as classDate but from backend
    start_time?: string; // Same as startTime but from backend
    end_time?: string; // Same as endTime but from backend
    is_recurring?: boolean; // Same as isRecurring but from backend
    recurring_days?: string[]; // Same as recurringDays but from backend
    
    // Formatted properties from backend
    formatted_date?: string; // Formatted date from backend
    formatted_start_time?: string; // Formatted start time from backend
    formatted_end_time?: string; // Formatted end time from backend
    day_of_week?: string; // Day of week from backend
    
    // For class display
    bookedSpots?: number; // Number of spots already booked
  }
  
  export interface TeacherAvailability {
    id?: string;
    user_id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_recurring: boolean;
    session_duration: number; // Duration in minutes
    isBooked?: boolean; // Optional field to track if a slot is already booked
    session_date: string;
  }
  
  export interface AvailabilityException {
    date: string;
    isAvailable: boolean;
    reason?: string;
  }
  
  export interface ClassSession {
    id: string;
    classId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'Scheduled' | 'InProgress' | 'Completed' | 'Cancelled';
    participants: string[];
  }
  
  export interface IssueReport {
    id: string;
    user_id: string;
    classId?: string;
    sessionId?: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'InProgress' | 'Resolved';
    created_at: string;
    updated_at: string;
  }