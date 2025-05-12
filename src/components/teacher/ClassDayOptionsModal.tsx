import React, { useMemo } from 'react';
import { X, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface ClassDayOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: number;
  className: string;
  dayName: string;
  dayIndex: number;
  date: string;
  onCancelClass: (classId: number, date: string) => void;
  onChangeTime: (classId: number, date: string, newTime: string) => void;
}

const ClassDayOptionsModal: React.FC<ClassDayOptionsModalProps> = ({
  isOpen,
  onClose,
  classId,
  className,
  dayName,
  dayIndex,
  date,
  onCancelClass,
  onChangeTime
}) => {
  const [newTime, setNewTime] = React.useState('');
  
  // Generate time options in 30-minute intervals from 6:00 AM to 10:00 PM
  const timeOptions = useMemo(() => {
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
  }, []);

  if (!isOpen) return null;

  const handleCancelClass = () => {
    onCancelClass(classId, date);
    onClose();
  };

  const handleChangeTime = () => {
    if (newTime) {
      onChangeTime(classId, date, newTime);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {className} - {dayName}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Calendar size={18} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">
              {date ? format(new Date(date), 'MMMM d, yyyy') : 'Date not specified'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer" onClick={handleCancelClass}>
            <div className="flex items-center">
              <AlertTriangle size={18} className="text-orange-500 mr-2" />
              <h4 className="font-medium text-gray-900">Cancel this class</h4>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Cancel only this instance of the class. Students will be notified.
            </p>
          </div>

          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center">
              <Clock size={18} className="text-blue-500 mr-2" />
              <h4 className="font-medium text-gray-900">Change time for this class</h4>
            </div>
            <div className="mt-2">
              <div className="relative">
                <div className="flex items-center absolute inset-y-0 left-0 pl-3 pointer-events-none">
                  <Clock size={16} className="text-indigo-500" />
                </div>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="mt-1 block w-full pl-10 pr-10 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center'
                  }}
                >
                  <option value="">Select a new time</option>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleChangeTime}
                disabled={!newTime}
                className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Apply Time Change
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Change the time for this specific instance only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDayOptionsModal;
