import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the Login component
import NotFound from './Component/Pages/NotFound'
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Layout from './Component/Pages/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* 404 Route - should be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
