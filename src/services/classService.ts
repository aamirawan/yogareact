import { EnhancedClass, ClassInstance, ClassFormData, UpdateOptions, DeleteOptions } from '../types/enhancedClass';

const API_URL = import.meta.env.VITE_BACKEND_API_URL?.replace(/\/api$/, '') || '';

/**
 * Service for interacting with the enhanced class API
 */
class ClassService {
  /**
   * Get all classes for a teacher with their exceptions
   * @param teacherId - ID of the teacher
   */
  async getTeacherClasses(teacherId: string): Promise<EnhancedClass[]> {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/classes/teacher/${teacherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching teacher classes:', error);
      throw error;
    }
  }
  
  /**
   * Get a single class by ID
   * @param classId - ID of the class
   */
  async getClassById(classId: string): Promise<EnhancedClass> {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/classes/${classId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch class');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching class:', error);
      throw error;
    }
  }
  
  /**
   * Get class instances for a date range
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @param teacherId - Optional teacher ID filter
   */
  async getClassInstances(startDate: string, endDate: string, teacherId?: string): Promise<ClassInstance[]> {
    try {
      const token = localStorage.getItem('token');
      
      let url = `${API_URL}/api/classes/instances?start_date=${startDate}&end_date=${endDate}`;
      if (teacherId) {
        url += `&teacher_id=${teacherId}`;
      }
      
      console.log('Fetching class instances from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Failed to fetch class instances: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // If the API returns an empty array or no data property, return an empty array instead of failing
      if (!data || !data.data) {
        console.log('No class instances found, returning empty array');
        return [];
      }
      
      console.log(`Found ${data.data.length} class instances`);
      return data.data;
    } catch (error) {
      console.error('Error fetching class instances:', error);
      // Return empty array instead of throwing to prevent UI from breaking
      return [];
    }
  }
  
  /**
   * Create a new class
   * @param classData - Class data to create
   */
  async createClass(classData: ClassFormData): Promise<EnhancedClass> {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Add user_id to the class data
      const dataWithUserId = {
        ...classData,
        user_id: user.id
      };
      
      const response = await fetch(`${API_URL}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataWithUserId)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create class');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  }
  
  /**
   * Update an existing class
   * @param classId - ID of the class to update
   * @param classData - Updated class data
   * @param options - Update options (single instance, future instances, or all)
   */
  async updateClass(classId: string, classData: Partial<ClassFormData>, options: UpdateOptions): Promise<EnhancedClass> {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/classes/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...classData,
          ...options
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update class');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    }
  }
  
  /**
   * Get all exceptions for a class
   * @param classId - ID of the class
   */
  async getClassExceptions(classId: string): Promise<any[]> {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/classes/${classId}/exceptions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch class exceptions');
      }
      
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching class exceptions:', error);
      return [];
    }
  }

  /**
   * Create an exception for a class instance
   * @param classId - ID of the class
   * @param exceptionData - Exception data
   */
  async createClassException(classId: string, exceptionData: {
    exception_date: string;
    exception_type: 'cancelled' | 'modified' | 'rescheduled';
    new_start_time?: string;
    new_duration?: number;
    reason?: string;
  }): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/classes/${classId}/exceptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(exceptionData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create class exception');
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error creating class exception:', error);
      throw error;
    }
  }
  
  /**
   * Delete a class
   * @param classId - ID of the class to delete
   * @param options - Delete options (single instance or all)
   */
  async deleteClass(classId: string, options: DeleteOptions): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/classes/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(options)
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete class');
      }
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  }
}

export default new ClassService();
