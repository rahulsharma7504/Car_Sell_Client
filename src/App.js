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
            <Route
              path="/dealer-dashboard"
              element={
                <ProtectedRoute >
                  {'Dealer'}
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  {'User'}
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
