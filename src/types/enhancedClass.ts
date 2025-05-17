export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
export type ExceptionType = 'cancelled' | 'rescheduled' | 'modified';
export type ClassLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ClassException {
  id: number;
  class_id: number;
  exception_date: string;
  exception_type: ExceptionType;
  new_start_time?: string;
  new_duration?: number;
  reason?: string;
  created_at: string;
}

export interface EnhancedClass {
  id: number;
  user_id: number;
  title: string;
  subtitle?: string;
  description?: string;
  max_participants: number;
  duration: number;
  level: ClassLevel;
  
  // Timing fields
  start_date: string;
  start_time: string;
  
  // Recurring settings
  is_recurring: boolean;
  recurrence_type: RecurrenceType;
  recurring_days: number[] | null;
  recurring_interval: number;
  recurring_end_date?: string;
  
  // Status
  is_active: boolean;
  
  // Notification settings
  reminder_enabled: boolean;
  reminder_minutes_before: number;
  
  // Online meeting details
  meeting_link?: string;
  
  // Other fields
  created_at: string;
  updated_at: string;
  
  // Related data
  exceptions: ClassException[];
}

export interface ClassInstance {
  id: string;
  class_id: number;
  title: string;
  subtitle?: string;
  description?: string;
  max_participants: number;
  duration: number;
  level: ClassLevel;
  user_id: number;
  date: string;
  day_of_week: number;
  start_time: string;
  is_recurring: boolean;
  is_exception: boolean;
  exception_reason?: string;
  original_class: EnhancedClass;
}

export interface ClassFormData {
  title: string;
  subtitle: string;
  description: string;
  max_participants: number;
  duration: number;
  level: ClassLevel;
  
  // Timing fields
  start_date: string;
  start_time: string;
  
  // Recurring settings
  is_recurring: boolean;
  recurrence_type: RecurrenceType;
  recurring_days: number[];
  recurring_interval: number;
  recurring_end_date?: string;
  
  // Status
  is_active?: boolean;
  
  // Notification settings
  reminder_enabled: boolean;
  reminder_minutes_before: number;
  
  // Online meeting details
  meeting_link?: string;
}

export interface UpdateOptions {
  update_type: 'single_instance' | 'future_instances' | 'all_instances';
  exception_date?: string;
  split_date?: string;
}

export interface DeleteOptions {
  delete_type: 'single_instance' | 'all_instances';
  exception_date?: string;
  reason?: string;
}

export const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

export const RECURRENCE_OPTIONS = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Every day' },
  { value: 'weekly', label: 'Every week' },
  { value: 'monthly', label: 'Every month' },
  { value: 'custom', label: 'Custom' }
];

export const LEVEL_OPTIONS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

export const REMINDER_OPTIONS = [
  { value: 15, label: '15 minutes before' },
  { value: 30, label: '30 minutes before' },
  { value: 60, label: '1 hour before' },
  { value: 120, label: '2 hours before' },
  { value: 1440, label: '1 day before' }
];

export const DEFAULT_CLASS_FORM_DATA: ClassFormData = {
  title: '',
  subtitle: '',
  description: '',
  max_participants: 20,
  duration: 60,
  level: 'Beginner',
  start_date: new Date().toISOString().split('T')[0],
  start_time: '09:00',
  is_recurring: false,
  recurrence_type: 'none',
  recurring_days: [],
  recurring_interval: 1,
  reminder_enabled: true,
  reminder_minutes_before: 30,
  meeting_link: ''
};
