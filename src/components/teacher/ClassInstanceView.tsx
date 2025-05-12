import { useState } from 'react';
import { ClassInstance } from '../../types/enhancedClass';
import classService from '../../services/classService';

interface ClassInstanceViewProps {
  instance: ClassInstance;
  onUpdate: () => void;
  onClose: () => void;
}

const ClassInstanceView = ({ instance, onUpdate, onClose }: ClassInstanceViewProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(instance.start_time);
  const [duration, setDuration] = useState(instance.duration);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    // Parse the time string (HH:MM)
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Create a date object and set the time
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    // Format the time
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate end time
  const calculateEndTime = (startTimeStr: string, durationMinutes: number) => {
    const [hours, minutes] = startTimeStr.split(':').map(Number);
    
    let totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    
    const date = new Date();
    date.setHours(endHours, endMinutes, 0, 0);
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Handle cancellation of a single instance
  const handleCancelInstance = async () => {
    try {
      setIsSubmitting(true);
      
      await classService.deleteClass(instance.class_id.toString(), {
        delete_type: 'single_instance',
        exception_date: instance.date,
        reason: deleteReason || 'Cancelled by instructor'
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error cancelling class instance:', error);
      alert('Failed to cancel class instance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle editing a single instance
  const handleEditInstance = async () => {
    try {
      setIsSubmitting(true);
      
      await classService.updateClass(instance.class_id.toString(), {
        start_time: startTime,
        duration: duration
      }, {
        update_type: 'single_instance',
        exception_date: instance.date
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating class instance:', error);
      alert('Failed to update class instance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
      {/* Header */}
      <div className="bg-indigo-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">{instance.title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-indigo-100 mt-1">{instance.subtitle}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {isEditing ? (
          // Edit form
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Edit Class Instance</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <p className="mt-1 text-gray-900">{formatDate(instance.date)}</p>
            </div>
            
            <div>
              <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="start_time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
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
                min="15"
                max="240"
                step="15"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditInstance}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : isDeleting ? (
          // Delete confirmation
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Cancel Class Instance</h4>
            <p className="text-gray-700">
              Are you sure you want to cancel this class instance on {formatDate(instance.date)}?
              This will only cancel this specific instance, not the entire series.
            </p>
            
            <div>
              <label htmlFor="delete_reason" className="block text-sm font-medium text-gray-700">
                Reason for cancellation (optional)
              </label>
              <textarea
                id="delete_reason"
                rows={3}
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Let your students know why this class is cancelled"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                Keep Class
              </button>
              <button
                type="button"
                onClick={handleCancelInstance}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cancelling...' : 'Cancel Class'}
              </button>
            </div>
          </div>
        ) : (
          // View details
          <div className="space-y-4">
            {instance.is_exception && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This is a modified instance of a recurring class.
                      {instance.exception_reason && (
                        <span className="font-medium"> Reason: {instance.exception_reason}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Date</h4>
                <p className="mt-1 text-gray-900">{formatDate(instance.date)}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Time</h4>
                <p className="mt-1 text-gray-900">
                  {formatTime(instance.start_time)} - {calculateEndTime(instance.start_time, instance.duration)}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                <p className="mt-1 text-gray-900">{instance.duration} minutes</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Level</h4>
                <p className="mt-1 text-gray-900">{instance.level}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Maximum Participants</h4>
                <p className="mt-1 text-gray-900">{instance.max_participants}</p>
              </div>
              
              {instance.is_recurring && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Recurrence</h4>
                  <p className="mt-1 text-gray-900">
                    {instance.original_class.recurrence_type === 'weekly' ? 'Weekly' : 
                     instance.original_class.recurrence_type === 'daily' ? 'Daily' : 
                     instance.original_class.recurrence_type === 'monthly' ? 'Monthly' : 
                     instance.original_class.recurrence_type === 'custom' ? 'Custom' : 'None'}
                  </p>
                </div>
              )}
            </div>
            
            {instance.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="mt-1 text-gray-900">{instance.description}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsDeleting(true)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel Instance
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Instance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassInstanceView;
