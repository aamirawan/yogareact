import { useState, useEffect } from 'react';
import { 
  ClassFormData, 
  EnhancedClass,
  DEFAULT_CLASS_FORM_DATA,
  LEVEL_OPTIONS,
  REMINDER_OPTIONS
} from '../../types/enhancedClass';
import RecurrenceOptions from './RecurrenceOptions';
import { Clock } from 'lucide-react';

interface ClassFormProps {
  initialData?: EnhancedClass;
  onSubmit: (formData: ClassFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ClassForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting
}: ClassFormProps) => {
  const [formData, setFormData] = useState<ClassFormData>(DEFAULT_CLASS_FORM_DATA);
  
  // Effect to update form data when recurring days change
  useEffect(() => {
    // If recurring days are selected, ensure is_recurring and recurrence_type are set correctly
    if (formData.recurring_days.length > 0) {
      setFormData(prev => ({
        ...prev,
        is_recurring: true,
        recurrence_type: 'weekly'
      }));
    }
  }, [formData.recurring_days]);
  
  // Function to generate time options in 30-minute intervals from 6:00 AM to 10:00 PM
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const timeValue = `${hourStr}:${minuteStr}`;
        const displayTime = new Date(`2000-01-01T${timeValue}:00`).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        options.push({ value: timeValue, label: displayTime });
      }
    }
    return options;
  };

  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      // Parse recurring_days to ensure it's an array of numbers
      let recurringDays = [];
      if (initialData.recurring_days) {
        if (Array.isArray(initialData.recurring_days)) {
          recurringDays = initialData.recurring_days;
        } else if (typeof initialData.recurring_days === 'string') {
          try {
            recurringDays = JSON.parse(initialData.recurring_days);
          } catch (e) {
            console.error('Error parsing recurring days:', e);
          }
        }
      }
      
      setFormData({
        title: initialData.title,
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
        max_participants: initialData.max_participants,
        duration: initialData.duration,
        level: initialData.level,
        start_date: initialData.start_date,
        start_time: initialData.start_time,
        is_recurring: !!initialData.is_recurring,
        recurrence_type: initialData.recurrence_type || 'none',
        recurring_days: recurringDays,
        recurring_interval: initialData.recurring_interval || 1,
        recurring_end_date: initialData.recurring_end_date,
        reminder_enabled: !!initialData.reminder_enabled,
        reminder_minutes_before: initialData.reminder_minutes_before || 30
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle different input types
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'start_date') {
      // When start date changes, update the form data
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRecurrenceChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a copy of the form data to modify before submission
    const submissionData = { ...formData };
    
    // If this is a single-day class (no recurring days selected)
    if (!submissionData.is_recurring || submissionData.recurring_days.length === 0) {
      // Set is_recurring to false and recurrence_type to none
      submissionData.is_recurring = false;
      submissionData.recurrence_type = 'none';
      submissionData.recurring_days = [];
    } else {
      // Ensure is_recurring is true and recurrence_type is set to weekly
      submissionData.is_recurring = true;
      submissionData.recurrence_type = 'weekly';
      
      // Get day of week for the start date (0-6, where 0 is Sunday)
      const startDate = new Date(submissionData.start_date);
      const startDayOfWeek = startDate.getDay();
      
      // Add the start date's day of week to recurring days if not already included
      if (!submissionData.recurring_days.includes(startDayOfWeek)) {
        submissionData.recurring_days = [...submissionData.recurring_days, startDayOfWeek].sort((a, b) => a - b);
      }
    }
    
    onSubmit(submissionData);
  };

  // Determine if we're in edit mode
  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Basic class details */}
        <div className="space-y-4 md:col-span-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Class Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {!isEditMode && (
            <>
              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </>
          )}  
        </div>

        {/* Class details - show all fields when creating, limited fields when editing */}
        {!isEditMode ? (
          <>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {LEVEL_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="max_participants" className="block text-sm font-medium text-gray-700">
                Maximum Participants
              </label>
              <input
                type="number"
                id="max_participants"
                name="max_participants"
                min="1"
                max="100"
                value={formData.max_participants}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                min="15"
                max="240"
                step="15"
                value={formData.duration}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </>
        ) : null}
        
        {/* Always show time field in both create and edit modes */}
        <div className={isEditMode ? "md:col-span-2" : ""}>
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 flex items-center">
            <Clock size={16} className="mr-2 text-indigo-500" />
            Start Time
          </label>
          <div className="relative">
            <select
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 pl-3 pr-10 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center'
              }}
            >
              {generateTimeOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Meeting Link field - always show in both create and edit modes */}
        <div className="md:col-span-2">
          <label htmlFor="meeting_link" className="block text-sm font-medium text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-indigo-500">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Meeting Link (Required)
          </label>
          <input
            type="url"
            id="meeting_link"
            name="meeting_link"
            placeholder="https://zoom.us/j/123456789 or other video conferencing link"
            required
            value={formData.meeting_link}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="mt-1 text-sm text-gray-500">Provide a link to the online meeting (Zoom, Google Meet, etc.)</p>
        </div>

        {/* Recurrence section - always show in edit mode */}
        <div className="md:col-span-2 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{isEditMode ? 'Class Recurrence' : 'Recurrence Settings'}</h3>
          
          {/* In edit mode, make the recurrence options more prominent */}
          {isEditMode ? (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Select which days this class recurs on:</p>
              <RecurrenceOptions
                recurringDays={Array.isArray(formData.recurring_days) ? formData.recurring_days : []}
                recurringEndDate={formData.recurring_end_date}
                onRecurrenceChange={handleRecurrenceChange}
              />
            
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-2">Select which days this class recurs on:</p>
              <RecurrenceOptions
                recurringDays={Array.isArray(formData.recurring_days) ? formData.recurring_days : []}
                recurringEndDate={formData.recurring_end_date}
                onRecurrenceChange={handleRecurrenceChange}
              />
            </>
          )}
        </div>

        {/* Reminder settings */}
        <div className="md:col-span-2 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reminder Settings</h3>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="reminder_enabled"
              name="reminder_enabled"
              checked={formData.reminder_enabled}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="reminder_enabled" className="ml-2 block text-sm text-gray-700">
              Send reminders to participants
            </label>
          </div>

          {formData.reminder_enabled && (
            <div>
              <label htmlFor="reminder_minutes_before" className="block text-sm font-medium text-gray-700">
                Remind
              </label>
              <select
                id="reminder_minutes_before"
                name="reminder_minutes_before"
                value={formData.reminder_minutes_before}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {REMINDER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Form actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Class' : 'Create Class'}
        </button>
      </div>
    </form>
  );
};

export default ClassForm;
