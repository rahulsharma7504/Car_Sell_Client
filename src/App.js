import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import NotFound from './Component/Pages/NotFound';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Layout from './Component/Pages/Layout';
import { AuthProvider } from './Component/Context/AuthContext';
import Admin from './Component/Pages/Admin/Admin';
import ManageUser from './Component/Pages/Admin/ManageUsers';
import CarListings from './Component/Pages/Admin/CarListings';
import ManageDealers from './Component/Pages/Admin/ManageDealers';
import AddCar from './Component/Pages/Dealer/AddCar';
import ManageCars from './Component/Pages/Dealer/ManageCars';
import Profile from './Component/Pages/Dealer/Profile';
import Dealer from './Component/Pages/Dealer/Dealer';
import SaleOrder from './Component/Pages/Dealer/SalesOrder';
import TestDrive from './Component/Pages/Dealer/TestDrive';
import Chatting from './Component/Pages/Dealer/Chatting';

// Import Dealer and User components

import CarListing from './Component/Pages/User/User';
import CarDetail from './Component/Pages/User/CarDetail';
import UserProfilePage from './Component/Pages/User/UserProfilePage';
import Cart from './Component/Pages/User/Cart';
import ProtectedRoute from './Component/Auth/ProtectedRoute';

// Import MatrixProvider from './Component/Pages/Admin/MetrixContext'
import MatrixProvider from './Component/Pages/Admin/MetrixContext';
import DealerProvider from './Component/Pages/Dealer/DealerContext';
import { CartProvider } from './Component/Context/CartContext';

function App() {
  return (
    <Router>
      <MatrixProvider>
        <CartProvider>
        <DealerProvider>
          <AuthProvider>
            <Layout>

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
                <Route path="/manage-users" element={<ProtectedRoute role="admin"><ManageUser /></ProtectedRoute>} />
                <Route path="/manage-dealers" element={<ProtectedRoute role="admin"><ManageDealers /></ProtectedRoute>} />
                <Route path="/car-listings" element={<ProtectedRoute role="admin"><CarListings /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute role="admin"><Chatting /></ProtectedRoute>} />

                {/* Dealer Routes */}
                <Route path="/test-drive-requests" element={<ProtectedRoute role="dealer"><TestDrive /></ProtectedRoute>} />

                <Route path="/dealer-dashboard" element={<ProtectedRoute role="dealer"><Dealer /> </ProtectedRoute>} />
                <Route path="/manage-listings" element={<ProtectedRoute role="dealer"><ManageCars /> </ProtectedRoute>} />
                <Route path="/add-new-car" element={<ProtectedRoute role="dealer"><AddCar /> </ProtectedRoute>} />
                <Route path="/sales-orders" element={<ProtectedRoute role="dealer"><SaleOrder /> </ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute role="dealer"><Profile /> </ProtectedRoute>} />

                {/* User Routes */}
                <Route path="/" element={<ProtectedRoute role="user"> <CarListing /> </ProtectedRoute>} />
                <Route path="/car-detail/:id" element={<ProtectedRoute role="user"> <CarDetail /> </ProtectedRoute>} />
                <Route path="/user-profile" element={<ProtectedRoute role="user"> <UserProfilePage /> </ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute role="user"> <Cart /> </ProtectedRoute>} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>

            </Layout>
          </AuthProvider>
        </DealerProvider>
        </CartProvider>
      </MatrixProvider>

    </Router>
  );
}

export default App;
