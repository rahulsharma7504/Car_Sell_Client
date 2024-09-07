import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css'; // Add some custom styles if needed

function NotFound() {
  return (
    <motion.div
      className="not-found-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <motion.div
        className="not-found-car"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        🚗💨
      </motion.div>
      <Link to="/" className="not-found-link">
        Go Back Home
      </Link>
    </motion.div>
  );
}

export default NotFound;
