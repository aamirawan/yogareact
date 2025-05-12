import { useState, useEffect } from 'react';
import { EnhancedClass, ClassFormData, ClassException } from '../../types/enhancedClass';
import classService from '../../services/classService';
import ClassForm from './ClassForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useToast } from '../../context/ToastContext';
import { PlusCircle, Edit, Trash2, Bell, X } from 'lucide-react';
import ClassDayOptionsModal from './ClassDayOptionsModal';
import { format, addDays } from 'date-fns';

const EnhancedClassManagement = () => {
  const { showToast } = useToast();
  const [classes, setClasses] = useState<EnhancedClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<EnhancedClass | null>(null);
  
  // State for day options modal
  const [dayOptionsModal, setDayOptionsModal] = useState({
    isOpen: false,
    classId: 0,
    className: '',
    dayName: '',
    dayIndex: 0,
    date: ''
  });

  // Fetch teacher's classes (now includes exceptions data)
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch classes with exceptions included
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
      console.log(`Fetching classes for user ID: ${userId}`);
      
      const fetchedClasses = await classService.getTeacherClasses(userId);
      console.log('Fetched classes with exceptions:', fetchedClasses);
      
      // Process exceptions to ensure dates are properly formatted
      const processedClasses = fetchedClasses.map(classItem => {
        // Process exceptions if they exist
        if (classItem.exceptions && Array.isArray(classItem.exceptions)) {
          classItem.exceptions = classItem.exceptions.map(ex => {
            // Ensure we have a valid date format for the exception
            let formattedDate = ex.exception_date;
            
            // Handle different date formats
            if (formattedDate.includes('T')) {
              formattedDate = formattedDate.split('T')[0];
            }
            
            return {
              ...ex,
              exception_date: formattedDate
            };
          });
        }
        return classItem;
      });
      
      // Log detailed information about each class and its exceptions
      processedClasses.forEach(cls => {
        console.log(`CLASS ID: ${cls.id}, TITLE: ${cls.title}`);
        console.log(`  - Recurring days: ${JSON.stringify(cls.recurring_days)}`);
        console.log(`  - Exceptions count: ${cls.exceptions ? cls.exceptions.length : 0}`);
        
        // Log each exception in detail
        if (cls.exceptions && cls.exceptions.length > 0) {
          cls.exceptions.forEach(ex => {
            console.log(`    * Exception ID: ${ex.id}, Type: ${ex.exception_type}, Date: ${ex.exception_date}`);
            try {
              const exDate = new Date(ex.exception_date);
              console.log(`      Day of week: ${exDate.getDay()} (${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][exDate.getDay()]})`);
            } catch (err) {
              console.error(`      Error parsing date: ${ex.exception_date}`, err);
            }
          });
        }
      });
      
      setClasses(processedClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to load classes. Please try again.');
      showToast('Failed to load classes', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  // Handle creating a new class
  const handleCreateClass = async (formData: ClassFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await classService.createClass(formData);
      
      // Refresh data
      await fetchClasses();
      
      // Close form and show success message
      setShowForm(false);
      showToast('Class created successfully', 'success');
    } catch (error) {
      console.error('Error creating class:', error);
      setError('Failed to create class. Please try again.');
      showToast('Failed to create class', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle updating an existing class
  const handleUpdateClass = async (classId: number, formData: ClassFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await classService.updateClass(classId.toString(), formData, { update_type: 'all_instances' });
      
      // Refresh data
      await fetchClasses();
      
      // Reset state and show success message
      setEditingClass(null);
      setShowForm(false);
      showToast('Class updated successfully', 'success');
    } catch (error) {
      console.error('Error updating class:', error);
      setError('Failed to update class. Please try again.');
      showToast('Failed to update class', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting a class
  const handleDeleteClass = async (classId: number) => {
    if (!window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      await classService.deleteClass(
        classId.toString(), 
        { delete_type: 'all_instances' }
      );
      
      // Refresh data
      await fetchClasses();
      
      // Show success message
      showToast('Class deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting class:', error);
      setError('Failed to delete class. Please try again.');
      showToast('Failed to delete class', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle toggling class active status
  const handleToggleClassStatus = async (classId: number, isActive: boolean) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await classService.updateClass(classId.toString(), { is_active: isActive }, { update_type: 'all_instances' });
      
      // Refresh data
      await fetchClasses();
      
      // Show success message
      showToast(`Class ${isActive ? 'activated' : 'deactivated'} successfully`, 'success');
    } catch (error) {
      console.error('Error updating class status:', error);
      setError('Failed to update class status. Please try again.');
      showToast('Failed to update class status', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (error) {
      return timeString;
    }
  };
  
  // Get all occurrence dates for a specific day of the week
  const getAllOccurrenceDates = (classItem: EnhancedClass, dayIndex: number): string[] => {
    try {
      // Parse the start date
      const startDate = new Date(classItem.start_date);
      const endDate = classItem.recurring_end_date 
        ? new Date(classItem.recurring_end_date) 
        : new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // Default to 1 year from now
      
      // Find the first occurrence of this day of the week
      let currentDate = new Date(startDate);
      const currentDayOfWeek = currentDate.getDay();
      const daysToAdd = (dayIndex - currentDayOfWeek + 7) % 7;
      currentDate = addDays(currentDate, daysToAdd);
      
      // Generate all occurrences until the end date
      const occurrenceDates: string[] = [];
      while (currentDate <= endDate) {
        occurrenceDates.push(format(currentDate, 'yyyy-MM-dd'));
        currentDate = addDays(currentDate, 7); // Add 7 days for weekly recurrence
      }
      
      console.log(`All occurrences for class ${classItem.id}, day ${dayIndex}:`, occurrenceDates);
      return occurrenceDates;
    } catch (error) {
      console.error('Error calculating occurrence dates:', error);
      return [];
    }
  };
  
  // Check if a class is cancelled on a specific day of the week
  const isClassCancelledOnDay = (classItem: EnhancedClass, dayIndex: number): boolean => {
    console.log(`Checking if class ${classItem.id} is cancelled on day ${dayIndex}`);
    
    // If this day is not in the recurring days, it can't be cancelled
    if (!classItem.recurring_days?.includes(dayIndex)) {
      console.log(`Day ${dayIndex} is not in recurring days for class ${classItem.id}`);
      return false;
    }
    
    // Get the exceptions for this class directly from the class object
    const exceptions = classItem.exceptions || [];
    
    // If there are no exceptions, the class is not cancelled
    if (exceptions.length === 0) {
      return false;
    }
    
    // Filter to only cancelled exceptions
    const cancelledExceptions = exceptions.filter(ex => ex.exception_type === 'cancelled');
    
    // Check if any exception's day of week matches the UI day index
    for (const exception of cancelledExceptions) {
      try {
        // Get the exception date (ensure it's in YYYY-MM-DD format)
        const exceptionDateStr = exception.exception_date.split('T')[0];
        
        // Convert to Date object and get day of week
        const exceptionDate = new Date(exceptionDateStr);
        const exceptionDayOfWeek = exceptionDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        console.log(`Exception date ${exceptionDateStr} is day ${exceptionDayOfWeek}, checking against UI day ${dayIndex}`);
        
        // If the day of week of the exception matches the UI day index, the class is cancelled
        if (exceptionDayOfWeek === dayIndex) {
          console.log(`✅ MATCH! Class ${classItem.id} is CANCELED on day ${dayIndex} due to exception on ${exceptionDateStr}`);
          return true;
        }
      } catch (error) {
        console.error(`Error processing exception date ${exception.exception_date}:`, error);
      }
    }
    
    return false;
  };
    
  // Get the next upcoming occurrence date for a specific day of the week
  const getNextUpcomingDate = (classItem: EnhancedClass, dayIndex: number): string => {
    try {
      // Get all occurrence dates
      const allDates = getAllOccurrenceDates(classItem, dayIndex);
      
      // Find the first date that is today or in the future
      const today = format(new Date(), 'yyyy-MM-dd');
      const upcomingDate = allDates.find(date => date >= today);
      
      return upcomingDate || (allDates.length > 0 ? allDates[0] : classItem.start_date);
    } catch (error) {
      console.error('Error getting next upcoming date:', error);
      return classItem.start_date;
    }
  };
  
  // Open the day options modal
  const handleDayClick = (classItem: EnhancedClass, dayIndex: number, dayName: string) => {
    const nextDate = getNextUpcomingDate(classItem, dayIndex);
    
    setDayOptionsModal({
      isOpen: true,
      classId: classItem.id,
      className: classItem.title,
      dayName,
      dayIndex,
      date: nextDate
    });
  };
  
  // Close the day options modal
  const handleCloseModal = () => {
    setDayOptionsModal(prev => ({ ...prev, isOpen: false }));
  };
  
  // Handle canceling a class for a specific date
  const handleCancelClass = async (classId: number, date: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Ensure we have a properly formatted date (YYYY-MM-DD)
      const formattedDate = date.split('T')[0];
      console.log(`Canceling class ${classId} for date ${formattedDate}`);
      
      // Get the day of the week for this date (for logging purposes)
      const cancelDate = new Date(formattedDate);
      const dayOfWeek = cancelDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
      console.log(`Canceling class on day of week: ${dayOfWeek} (0=Sunday, 1=Monday, etc.)`);
      
      // Create an exception for this class instance
      const result = await classService.createClassException(classId.toString(), {
        exception_date: formattedDate,
        exception_type: 'cancelled',
        reason: 'Cancelled by teacher'
      });
      
      console.log('Cancel class result:', result);
      
      // Close the modal immediately
      handleCloseModal();
      
      // Refresh data to get updated exceptions
      await fetchClasses();
      
      // Show success message
      showToast('Class cancelled successfully', 'success');
    } catch (error) {
      console.error('Error cancelling class:', error);
      setError('Failed to cancel class. Please try again.');
      showToast('Failed to cancel class', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle changing the time for a specific class instance
  const handleChangeTime = async (classId: number, date: string, newTime: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create an exception for this class instance with the new time
      await classService.createClassException(classId.toString(), {
        exception_date: date,
        exception_type: 'modified',
        new_start_time: newTime
      });
      
      // Refresh data
      await fetchClasses();
      
      // Show success message
      showToast('Class time updated successfully', 'success');
    } catch (error) {
      console.error('Error updating class time:', error);
      setError('Failed to update class time. Please try again.');
      showToast('Failed to update class time', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Render classes
  const renderClasses = () => {
    if (classes.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No classes found. Create your first class to get started.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4">
        {classes.map(classItem => {
          return (
            <div key={classItem.id} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden w-full hover:shadow-lg transition-shadow duration-200">
              {/* Class item with improved horizontal layout */}
              <div className="px-6 py-5 flex flex-col md:flex-row md:items-center">
                {/* Left section: Time and Title */}
                <div className="flex-shrink-0 md:w-1/4 mb-4 md:mb-0">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatTime(classItem.start_time)}
                  </div>
                  <div className="text-lg font-medium text-gray-700 mt-1">
                    {classItem.title}
                  </div>
                </div>
                
                {/* Middle section: Day selector and class details */}
                <div className="md:w-1/2 flex-grow">
                  {/* Day selector - iPhone style - clickable */}
                  {classItem.is_recurring && (
                    <div className="flex justify-center space-x-3 mb-3">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                        // Check if this day is selected in the recurring days array
                        const isInRecurringDays = classItem.recurring_days?.includes(index) || false;
                        
                        // Check if this day should be marked as canceled based on class exceptions
                        const isCanceled = isClassCancelledOnDay(classItem, index);
                        
                        return (
                          <button 
                            key={index}
                            type="button"
                            onClick={() => {
                              if (isInRecurringDays) {
                                // If day is in recurring days, show options modal
                                handleDayClick(classItem, index, day);
                              } else {
                                // If day is not in recurring days, add it
                                const currentDays = Array.isArray(classItem.recurring_days) ? [...classItem.recurring_days] : [];
                                const newDays = [...currentDays, index];
                                
                                // Update the class with new recurring days
                                handleUpdateClass(classItem.id, {
                                  title: classItem.title,
                                  subtitle: classItem.subtitle || '',
                                  description: classItem.description || '',
                                  max_participants: classItem.max_participants,
                                  duration: classItem.duration,
                                  level: classItem.level,
                                  start_date: classItem.start_date,
                                  start_time: classItem.start_time,
                                  is_recurring: classItem.is_recurring,
                                  recurrence_type: classItem.recurrence_type,
                                  recurring_days: newDays,
                                  recurring_interval: classItem.recurring_interval,
                                  recurring_end_date: classItem.recurring_end_date,
                                  reminder_enabled: classItem.reminder_enabled,
                                  reminder_minutes_before: classItem.reminder_minutes_before,
                                  is_active: classItem.is_active
                                });
                              }
                            }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium relative ${
                              isCanceled
                                ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer line-through' // Canceled days in bright red with strike-through
                                : isInRecurringDays
                                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer' // Selected days in blue
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200' // Not in recurring days
                            }`}
                          >
                            {day}
                            {isCanceled && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-0.5 w-full bg-white opacity-70 rotate-45 transform origin-center"></div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Class details */}
                  <div className="text-sm text-gray-500 flex flex-col md:flex-row md:space-x-4">
                    <div>{classItem.duration} minutes • {classItem.level}</div>
                    {classItem.max_participants > 0 && (
                      <div>Max {classItem.max_participants} participants</div>
                    )}
                  </div>
                </div>
                
                {/* Right section: Action buttons */}
                <div className="md:w-1/4 flex justify-end space-x-2 mt-4 md:mt-0">
                  <button 
                    onClick={() => {
                      setEditingClass(classItem);
                      setShowForm(true);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Edit className="h-5 w-5 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClass(classItem.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
              
              {/* Toggle switches */}
              <div className="px-6 py-3 bg-gray-50 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-center mb-2 md:mb-0">
                  <span className="text-sm font-medium text-gray-700 mr-2">Active</span>
                  <button 
                    onClick={() => handleToggleClassStatus(classItem.id, !classItem.is_active)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${classItem.is_active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span 
                      className={`${classItem.is_active ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>
                <div className="flex items-center">
                  <Bell className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">30 min before</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Day Options Modal */}
      <ClassDayOptionsModal
        isOpen={dayOptionsModal.isOpen}
        onClose={handleCloseModal}
        classId={dayOptionsModal.classId}
        className={dayOptionsModal.className}
        dayName={dayOptionsModal.dayName}
        dayIndex={dayOptionsModal.dayIndex}
        date={dayOptionsModal.date}
        onCancelClass={handleCancelClass}
        onChangeTime={handleChangeTime}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Your Classes</h1>
        <button
          onClick={() => {
            setEditingClass(null);
            setShowForm(true);
          }}
          className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle size={18} />
          Create Class
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="space-y-4">
          {renderClasses()}
        </div>
      )}
      
      {/* Class form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {editingClass ? 'Edit Class' : 'Create New Class'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingClass(null);
                }}
                className="text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 p-2 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="overflow-visible">
              <ClassForm 
                initialData={editingClass || undefined}
                onSubmit={(formData) => {
                  if (editingClass) {
                    handleUpdateClass(editingClass.id, formData);
                  } else {
                    handleCreateClass(formData);
                  }
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingClass(null);
                }}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedClassManagement;
