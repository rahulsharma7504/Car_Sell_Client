import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import Admin from '../Pages/Admin/Admin';
import DealerPage from '../Pages/Dealer/Dealer'; // renamed to avoid conflicts with const Dealer
import UserPage from '../Pages/User/User'; // renamed to avoid conflicts with const User
import ManageUsers from '../Pages/Admin/ManageUsers';
import ManageDealers from '../Pages/Admin/ManageDealers';
import CarListings from '../Pages/Admin/CarListings';
import ManageCars from '../Pages/Dealer/ManageCars';
import AddCar from '../Pages/Dealer/AddCar';
import TestDrive from '../Pages/Dealer/TestDrive';
import SalesOrder from '../Pages/Dealer/SalesOrder';
import Profile from '../Pages/Dealer/Profile';
import CarDetailPage from '../Pages/User/CarDetail';
import Chatting from '../Pages/Dealer/Chatting';
import UserProfilePage from '../Pages/User/UserProfilePage';
import Cart from '../Pages/User/Cart';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Ensure that user data is defined before accessing its properties
  const isAuthenticated = localStorage.getItem('token');
  const userRole = user?.data?.user?.role;
  const dealerData = user?.data?.dealer;
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Handle admin routes
  if (userRole === 'admin') {
    if (children === "Admin") {
      return <Admin />;
    } else if (children === "ManageUsers") {
      return <ManageUsers />;
    } else if (children === "ManageDealers") {
      return <ManageDealers />;
    } else if (children === 'CarListings') {
      return <CarListings />;
    }
  } 
  // Handle user routes
  else if (userRole === 'user') {
    if(children=== 'User'){
      return <UserPage />;
    }else if(children === 'car-detail'){
      return <CarDetailPage/>
    }else if(children === 'Profile'){
      return <UserProfilePage/>;
    }else if(children === 'Cart'){
      return <Cart/>
    }
  } 
  // Handle dealer routes
  else if (dealerData) {
    if (children === 'Dealer') {
      return <DealerPage />;
    } else if (children === 'ManageCars') {
      return <ManageCars />;
    } else if (children === 'AddCar') {
      return <AddCar />;
    } else if (children === 'TestDrive') {
      return <TestDrive />;
    } else if (children === 'SalesOrder') {
      return <SalesOrder />;
    } else if (children === 'Profile') {
      return <Profile />;
    }else if(children === 'Chatting'){
      return <Chatting />; // Placeholder for chatting component
    }
  }

  // If no valid role is found, redirect to login
  // return <Navigate to="/login" />;
}

export default ProtectedRoute;
