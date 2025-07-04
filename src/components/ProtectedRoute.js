// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userType }) => {
  // Check if user is authenticated
  const token = localStorage.getItem('userToken');
  const userData = localStorage.getItem('userData');
  
  if (!token || !userData) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  try {
    const user = JSON.parse(userData);
    
    // Check if user type matches the required user type for this route
    if (userType && user.userType !== userType) {
      // User type doesn't match, redirect to appropriate dashboard
      if (user.userType === 'jobseeker') {
        return <Navigate to="/dashboard" replace />;
      } else if (user.userType === 'company') {
        return <Navigate to="/company-dashboard" replace />;
      } else {
        // Unknown user type, redirect to login
        return <Navigate to="/login" replace />;
      }
    }
    
    // User is authenticated and has correct permissions
    return children;
    
  } catch (error) {
    // Invalid user data, redirect to login
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;