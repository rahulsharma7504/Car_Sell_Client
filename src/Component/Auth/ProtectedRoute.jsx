import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import NotFound from '../Pages/NotFound'; // Ensure you have a NotFound component

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const isAuthenticated = localStorage.getItem('token');
  const userRole = user?.data?.user?.role || 'dealer';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <NotFound />; // Redirect unauthorized roles to 404 page
  }

  return children;
}

export default ProtectedRoute;
