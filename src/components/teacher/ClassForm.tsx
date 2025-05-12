import { useState, useEffect, useMemo } from 'react';
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
        recurrence_type: initialData.recurrence_type,
        recurring_days: initialData.recurring_days || [],
        recurring_interval: initialData.recurring_interval,
        recurring_end_date: initialData.recurring_end_date,
        reminder_enabled: !!initialData.reminder_enabled,
        reminder_minutes_before: initialData.reminder_minutes_before
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
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRecurrenceChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
