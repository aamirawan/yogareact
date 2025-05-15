const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api';

// Helper function to handle fetch requests
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers,
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(errorData.message || 'Something went wrong');
  }
  
  return response.json();
};

// Public endpoints (no authentication required)
export const publicApi = {
  getSubscriptionPackages: async () => {
    try {
      return await fetch(`${API_URL}/public/packages`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch packages');
          }
          return response.json();
        });
    } catch (error) {
      console.error('Error fetching subscription packages:', error);
      throw error;
    }
  },
};

// Protected endpoints (require authentication)
export const protectedApi = {
  getSubscriptionPackageById: async (id: number) => {
    try {
      return await fetchWithAuth(`/student/packages/${id}`);
    } catch (error) {
      console.error(`Error fetching package with id ${id}:`, error);
      throw error;
    }
  },
  
  createSubscriptionOrder: async (data: { subscriptionPackageId: number, amount: number, transactionId: string }) => {
    try {
      return await fetchWithAuth('/student/order', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error creating subscription order:', error);
      throw error;
    }
  },
  
  getUserSubscriptions: async () => {
    try {
      return await fetchWithAuth('/student/my-orders');
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
      throw error;
    }
  },
};

// Default export for backward compatibility
const api = {
  get: (endpoint: string) => fetchWithAuth(endpoint),
  post: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint: string) => fetchWithAuth(endpoint, {
    method: 'DELETE',
  }),
};

export default api;
