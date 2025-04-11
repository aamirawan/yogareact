import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  
  // Get user info from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user's role is not in allowed roles, redirect to appropriate dashboard
  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect based on user's role
    switch (userRole) {
      case 'student':
        return <Navigate to="/student/classes" replace />;
      case 'teacher':
        return <Navigate to="/teacher/profile" replace />;
      case 'admin':
        return <Navigate to="/admin/pages" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // If all checks pass, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
