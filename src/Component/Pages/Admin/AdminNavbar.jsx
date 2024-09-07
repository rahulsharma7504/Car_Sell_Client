import React from 'react';
import { Box, Flex, Heading, IconButton, VStack, HStack, Button, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link ,useNavigate} from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../../Context/AuthContext';
// MotionBox for animation
const MotionBox = motion(Box);

function AdminNavbar() {
  const { user,setUser ,logout} = useAuth();

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  const logOut = () => {
    logout()
  };
  return (
    <Box>
      <Flex
        as={MotionBox}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        p={4}
        bg="purple.700"
        color="white"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="md"
      >
        <Link to='admin-dashboard'>
        <Heading as="h1" size="lg" >
          Admin Panel
        </Heading>
        </Link>
        {isMobile ? (
          <>
            <IconButton
              aria-label="Open Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="outline"
              colorScheme="whiteAlpha"
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <VStack spacing={4} align="stretch" p={4}>
                    <Button as={Link} to="/manage-users" onClick={onClose}>Manage Users</Button>
                    <Button as={Link} to="/manage-dealers" onClick={onClose}>Manage Dealers</Button>
                    <Button as={Link} to="/car-listings" onClick={onClose}>Car Listings</Button>
                    <Button as={Link} onClick={logOut}>Logout</Button>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <HStack spacing={6}>
            <Button as={Link} to="/manage-users">Manage Users</Button>
            <Button as={Link} to="/manage-dealers">Manage Dealers</Button>
            <Button as={Link} to="/car-listings">Car Listings</Button>
            <Button  onClick={logOut}>Logout</Button> 

          </HStack>
        )}
      </Flex>
    </Box>
  );
}

export default AdminNavbar;


