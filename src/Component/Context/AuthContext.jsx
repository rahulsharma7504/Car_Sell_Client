import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize user state with default values
  const [user, setUser] = useState({
    isAuthenticated: false,
    data: null,  // Store user data like roles, email, etc.
  });

  // Load user data from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      // If token exists, update the state with user data
      setUser({
        isAuthenticated: true,
        data: JSON.parse(userData),  // Parse stored user data
      });
    }
  }, []);

  // Login function to set user state and save to localStorage
  const login = (userData, token) => {
    // Store the token and user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update the user state
    setUser({
      isAuthenticated: true,
      data: userData,
    });
    const { user, dealer } = userData;
    if (user) {
      if (user.is_admin === 1) {
        navigate('/admin-dashboard');
      } else if (user.is_admin === 0) {
        navigate(dealer ? '/dealer-dashboard' : '/user-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }


    // Redirect user to a protected route (e.g., dashboard)
  };

  // Logout function to clear user state and localStorage
  const logout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    // Reset user state
    setUser({
      isAuthenticated: false,
      data: null,
    });

    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);
