import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatrix } from '../Pages/Admin/MetrixContext';
import { useDealer } from '../Pages/Dealer/DealerContext';
import { useCart } from './CartContext';
import { useOrder } from './OrderContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { cartPendingRequests } = useCart();
  const { fetchOrders } = useOrder();
  const { TotalCar } = useDealer();
  const { getMetrix } = useMatrix();
  const navigate = useNavigate();

  // Initialize user state with default values
  const [user, setUser] = useState({
    isAuthenticated: false,
    data: null,  // Store user data like roles, email, etc.
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Load user data from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setUser({
        isAuthenticated: true,
        data: JSON.parse(userData),  // Parse stored user data
      });
    }
    setLoading(false); // Set loading to false once the initial load is done
  }, []);

  // Login function to set user state and save to localStorage
  const login = async (userData, token) => {
    setLoading(true); // Set loading true when login starts

    // Store the token and user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update the user state
    setUser({
      isAuthenticated: true,
      data: userData,
    });

    try {
      // Check if the user or dealer role is present
      const { user, dealer } = userData;

      if (user) {
        // User role check
        if (user.role === 'admin') {
          await getMetrix(); // Fetch admin data
          navigate('/admin-dashboard'); // Admin redirects here
        } else {
          navigate('/'); // Non-admin user redirects here
        }
      } else if (dealer) {
        await TotalCar(); // Fetch dealer data
        await fetchOrders(); // Fetch orders for dealer
        await cartPendingRequests(); // Fetch pending cart requests
        navigate('/dealer-dashboard'); // Dealer redirects here
      } else {
        // If neither user nor dealer is found
        console.log("Role not found in userData", userData);
        navigate('/login'); // Redirect to login if no role matches
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.'); // Set error state in case of failure
      console.error('Error during login:', err);
      navigate('/login'); // Redirect to login in case of error
    } finally {
      setLoading(false); // Set loading to false once all operations are done
    }
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
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);
