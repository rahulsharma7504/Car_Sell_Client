import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  VStack,
  HStack,
  useToast,
  Container,
  Text,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon, EmailIcon } from '@chakra-ui/icons';
import axios from 'axios'; // Import Axios
import EndPoint from './Endpoint';
import { useAuth } from '../Context/AuthContext'; // Import context for auth state
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingComponent from '../Loading/Loading';

const MotionBox = motion(Box);

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const toast = useToast();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Validation check
  const isFormValid = () => email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    if (!isFormValid()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in both email and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${EndPoint.URL}/users/login`, {
        email,
        password,
      });

      if (response && response.data) {
        if (response.data.token) {
          // If successful, login using the provided token
          login(response.data, response.data.token);

          toast({
            title: 'Login Successful!',
            description: "You've successfully logged in.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Invalid Credentials',
            description: 'Please check your email and password.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      // Handle error if the API call fails
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Disable the loading state after the request completes
    }
  };

  return (
    <>

      <Container centerContent>
        <MotionBox
          maxW="md"
          p="8"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={6} align="stretch">
            <Heading as="h2" size="lg" textAlign="center" color="purple.700">
              Car Selling App Login
            </Heading>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputRightElement>
                  <EmailIcon color="gray.500" />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleClickShowPassword}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              colorScheme="purple"
              size="lg"
              onClick={handleLogin}
              w="full"
              mt={4}
              isLoading={isLoading} // Show loading state on button
              loadingText="Logging in"
            >
              Login
            </Button>

            <HStack justifyContent="center">
              <VStack spacing={1}>
                <Text fontSize="sm" >Don't have an account?</Text>
                <NavLink to="/forgot-password" className="forget-link" color="purple.500" fontSize="sm">
                  Forgot Password?
                </NavLink>
              </VStack>
              <NavLink to="/register" className="forget-link" color="purple.500" fontWeight="bold">
                Sign Up
              </NavLink>
            </HStack>
          </VStack>
        </MotionBox>
      </Container>
    </>
  );
}

export default Login;
