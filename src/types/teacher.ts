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
    recurringDays: string[];
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