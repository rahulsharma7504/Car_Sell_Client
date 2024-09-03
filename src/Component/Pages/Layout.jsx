import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  HStack,
  VStack,
  Button,
  useDisclosure,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const MotionFlex = motion(Flex);

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <MotionFlex
        as="header"
        bg="purple.500"
        p={4}
        color="white"
        align="center"
        justify="space-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="lg" fontWeight="bold">
          Car Selling App
        </Text>
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center" display={{ base: 'none', md: 'flex' }}>
          <Link to="/login">
            <Button colorScheme="purple">Login</Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="purple">Sign Up</Button>
          </Link>
        </HStack>
      </MotionFlex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack as="nav" spacing={4}>
            <Link to="/login">
              <Button colorScheme="purple" w="full">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="purple" w="full">
                Sign Up
              </Button>
            </Link>
          </VStack>
        </Box>
      ) : null}

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
