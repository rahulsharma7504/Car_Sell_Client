import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Admin from '../Pages/Admin/Admin';
import Dealer from '../Pages/Dealer/Dealer';
import User from '../Pages/User/User';
import ManageUsers from '../Pages/Admin/ManageUsers';
import ManageDealers from '../Pages/Admin/ManageDealers';
import CarListings from '../Pages/Admin/CarListings';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const isAuthenticated = user?.isAuthenticated;
  const userRole = user?.data?.user?.role;
  const userIsAdmin = user?.data?.user?.is_admin === 1;


  if (userIsAdmin) {
    if (children === "Admin") {
      return <Admin />;
    } else if (children === "ManageUsers") {
      return <ManageUsers />;
    } else if (children === "ManageDealers") {
      return <ManageDealers />;
    }else if(children ==='CarListings') {
      return <CarListings />;
    }
  } else if (userRole === 'dealer') {
    return children === "Dealer" ? <Dealer /> : <Navigate to="/login" />;
  } else if (userRole === 'user') {
    return children === "User" ? <User /> : <Navigate to="/login" />;
  }

}

export default ProtectedRoute;
