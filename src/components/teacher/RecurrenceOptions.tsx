import { useState } from 'react';
import { DAYS_OF_WEEK } from '../../types/enhancedClass';

interface RecurrenceOptionsProps {
  recurringDays: number[];
  recurringEndDate?: string;
  onRecurrenceChange: (field: string, value: any) => void;
}

const RecurrenceOptions = ({
  recurringDays,
  recurringEndDate,
  onRecurrenceChange
}: RecurrenceOptionsProps) => {
  const [showEndDate, setShowEndDate] = useState(!!recurringEndDate);

  const handleDayToggle = (day: number) => {
    // Ensure recurringDays is an array
    const currentDays = Array.isArray(recurringDays) ? recurringDays : [];
    const normalizedDays = currentDays.map(d => typeof d === 'string' ? parseInt(d, 10) : d);
    
    // Check if day is already selected
    const isSelected = normalizedDays.includes(day);
    
    // Toggle the day
    const newDays = isSelected
      ? normalizedDays.filter(d => d !== day)
      : [...normalizedDays, day];
    
    // Update the recurring days
    onRecurrenceChange('recurring_days', newDays);
    
    // Set isRecurring based on whether any days are selected
    onRecurrenceChange('isRecurring', newDays.length > 0);
    
    // If days are selected, set recurrence type to weekly
    if (newDays.length > 0) {
      onRecurrenceChange('recurrenceType', 'weekly');
    } else {
      onRecurrenceChange('recurrenceType', 'none');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Repeat on
        </label>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map(day => (
            <button
              key={day.value}
              type="button"
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                recurringDays.includes(day.value)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleDayToggle(day.value)}
            >
              {day.label.charAt(0)}
            </button>
          ))}
        </div>
      </div>

      {/* End date options */}
      <div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="has-end-date"
            checked={showEndDate}
            onChange={(e) => {
              setShowEndDate(e.target.checked);
              if (!e.target.checked) {
                onRecurrenceChange('recurringEndDate', undefined);
              }
            }}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="has-end-date" className="ml-2 block text-sm text-gray-700">
            End date
          </label>
        </div>
        {showEndDate && (
          <input
            type="date"
            value={recurringEndDate || ''}
            onChange={(e) => onRecurrenceChange('recurringEndDate', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        )}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
