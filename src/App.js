import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import NotFound from './Component/Pages/NotFound';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Layout from './Component/Pages/Layout';
import { AuthProvider, useAuth } from './Component/Context/AuthContext';
import Admin from './Component/Pages/Admin/Admin';
import Dealer from './Component/Pages/Dealer/Dealer';
import User from './Component/Pages/User/User';
import ProtectedRoute from './Component/Auth/ProtectedRoute';
import ManageUser from './Component/Pages/Admin/ManageUsers';
import MatrixProvider from './Component/Pages/Admin/MetrixContext'
function App() {
  const { user } = useAuth;

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={

                <ProtectedRoute >

                  {'Admin'}
                  {/* Admin specific routes */}
                </ProtectedRoute>
              }
            />
            <Route path="/manage-users" element={  <ProtectedRoute >{'ManageUsers'}</ProtectedRoute>}/>
            <Route path="/manage-dealers" element={  <ProtectedRoute >{'ManageDealers'}</ProtectedRoute>}/>
            <Route path="/car-listings" element={  <ProtectedRoute >{'CarListings'}</ProtectedRoute>}/>
            
            {/* Dealers Route */}
            <Route path="/dealer-dashboard"element={<ProtectedRoute >{'Dealer'}</ProtectedRoute>}/>
            <Route path="/manage-listings"element={<ProtectedRoute >{'ManageCars'}</ProtectedRoute>}/>
            <Route path="/add-new-car"element={<ProtectedRoute >{'AddCar'}</ProtectedRoute>}/>
            <Route path="/test-drive-requests"element={<ProtectedRoute >{'TestDrive'}</ProtectedRoute>}/>
            <Route path="/sales-orders"element={<ProtectedRoute >{'SalesOrder'}</ProtectedRoute>}/>
            <Route path="/Profile"element={<ProtectedRoute >{'Profile'}</ProtectedRoute>}/>

            <Route path="/user-dashboard"
              element={
                <ProtectedRoute>
                  {'User'}
                </ProtectedRoute>
              }
            />
            <Route path="/car-detail"
              element={
                <ProtectedRoute>
                  {'car-detail'}
                </ProtectedRoute>
              }
            />

            {/* 404 Route - should be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
