export interface TeacherProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    specializations: string[];
    certifications: Certification[];
    profilePhoto: string;
    yearsOfExperience: number;
    rating: number;
    totalClasses: number;
    languages: string[];
  }
  
  export interface Certification {
    id: string;
    name: string;
    issuedBy: string;
    issueDate: string;
    expiryDate?: string;
    certificateUrl?: string;
  }
  
  export interface GroupClass {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    teacherId: string;
    maxParticipants: number;
    currentParticipants: number;
    price: number;
    duration: number; // in minutes
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    recurringDays: string[];
    startTime: string;
    endTime: string;
    timezone: string;
    tags: string[];
    isActive: boolean;
  }
  
  export interface TeacherAvailability {
    id: string;
    teacherId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isRecurring: boolean;
    exceptions: AvailabilityException[];
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
    teacherId: string;
    classId?: string;
    sessionId?: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'InProgress' | 'Resolved';
    createdAt: string;
    updatedAt: string;
  }