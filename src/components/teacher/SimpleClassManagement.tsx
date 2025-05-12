import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { EnhancedClass, ClassInstance, ClassFormData } from '../../types/enhancedClass';
import classService from '../../services/classService';
import ClassForm from './ClassForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useToast } from '../../context/ToastContext';
import { PlusCircle, Edit, Trash2, Bell } from 'lucide-react';

const SimpleClassManagement = () => {
  const { showToast } = useToast();
  const [classes, setClasses] = useState<EnhancedClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<EnhancedClass | null>(null);

  // Get user ID from localStorage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id;
  };

  // Fetch teacher's classes
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userId = getUserId();
      if (!userId) {
        setError('User not found. Please log in again.');
        return;
      }
      
      const fetchedClasses = await classService.getTeacherClasses(userId);
      setClasses(fetchedClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setError('Failed to load classes. Please try again.');
      showToast('Failed to load classes', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchClasses();
  }, []);

  // Handle creating a new class
  const handleCreateClass = async (formData: ClassFormData) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Handle updating an existing class
  const handleUpdateClass = async (classId: number, formData: ClassFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await classService.updateClass(classId.toString(), formData);
      
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
      setIsLoading(false);
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

  // Get recurring days from class
  const getRecurringDays = (classItem: EnhancedClass): number[] => {
    if (!classItem.is_recurring) return [];
    
    if (!classItem.recurring_days) return [];
    
    try {
      if (Array.isArray(classItem.recurring_days)) {
        return classItem.recurring_days;
      } else {
        return JSON.parse(classItem.recurring_days as string);
      }
    } catch (e) {
      console.error('Error parsing recurring days:', e);
      return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Classes</h1>
        <button
          onClick={() => {
            setEditingClass(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          New Class
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
          {classes.map(classItem => {
            const recurringDays = getRecurringDays(classItem);
            
            return (
              <div key={classItem.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Class header with time - iPhone alarm style */}
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900">{formatTime(classItem.start_time)}</h3>
                      <h4 className="text-lg font-medium text-gray-700">{classItem.title}</h4>
                    </div>
                    <div className="flex space-x-2">
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
                  
                  {/* Day selector - iPhone style */}
                  {classItem.is_recurring && (
                    <div className="mt-4 flex justify-center space-x-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                        const isSelected = recurringDays.includes(index) || recurringDays.includes(index.toString());
                        return (
                          <div 
                            key={index} 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              isSelected 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Class details */}
                  <div className="mt-3 text-sm text-gray-500">
                    <div>{classItem.duration} minutes • {classItem.level}</div>
                    {classItem.max_participants > 0 && (
                      <div>Max {classItem.max_participants} participants</div>
                    )}
                  </div>
                </div>
                
                {/* Toggle switches */}
                <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">Active</span>
                    <div className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600">
                      <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">30 min before</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {classes.length === 0 && (
            <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow">
              No classes scheduled. Click "New Class" to create one.
            </div>
          )}
        </div>
      )}
      
      {/* Class form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {editingClass ? 'Edit Class' : 'Create New Class'}
              </h2>
            </div>
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleClassManagement;
