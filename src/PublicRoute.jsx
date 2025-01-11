import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    // Redirect based on user role
    switch (loggedInUser.role) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'manager':
        return <Navigate to="/manager" />;
      case 'employee':
        return <Navigate to="/employee" />;
      case 'junior_employee':
        return <Navigate to="/junior_employee" />;
      default:
        return <Navigate to={`${loggedInUser.role}`} />;
    }
  }

  return children;
};

export default PublicRoute;
