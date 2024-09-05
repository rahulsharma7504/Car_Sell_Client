import React from 'react';
import { Box, Flex, Text, Container } from '@chakra-ui/react';
import Navbar from './Navbar'; // Default Navbar for unauthenticated users
import { useAuth } from '../Context/AuthContext'; // Import your auth context
import DealerNavbar from './Dealer/DealerNavbar';
import AdminNavbar from './Admin/AdminNavbar';
import UserNavbar from './User/UserNavbar';

const Layout = ({ children }) => {
  const { user } = useAuth(); // Assuming useAuth provides user and loading state
  const isAuthenticated = user?.isAuthenticated;

  // Determine which Navbar to render based on user role and auth status
  const renderNavbar = () => {

    if (!isAuthenticated) {
      return <Navbar />; // Default Navbar for unauthenticated users
    }

    // Render based on user role
    const role = user?.data?.user?.role;
    const isAdmin = user?.data?.user?.is_admin === 1;

    if (isAdmin) {
      return <AdminNavbar />; // Admin Navbar
    } else if (role === 'dealer') {
      return <DealerNavbar />; // Dealer Navbar
    } else if (role === 'user') {
      return <UserNavbar />; // Regular User Navbar
    } else {
      return <Navbar />; // Fallback to default Navbar for any unexpected role
    }
  };

  return (
    <Box>
      {/* Render the appropriate Navbar */}
      {renderNavbar()}

      <Container maxW="container.xl" as="main" py={8}>
        {children}
      </Container>

      <Flex as="footer" bg="purple.500" p={4} color="white" justify="center">
        <Text>© 2024 Car Selling App. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Layout;
