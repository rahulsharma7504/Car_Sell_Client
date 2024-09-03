import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
     isAuthenticated: false,
     data:null
    });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ isAuthenticated: true });
      navigate('/');
    }
  }, [navigate]); // Add navigate to the dependency array

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>  useContext(AuthContext);
