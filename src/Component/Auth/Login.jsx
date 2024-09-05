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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon, EmailIcon } from '@chakra-ui/icons';
import axios from 'axios'; // Import Axios
import EndPoint from './Endpoint'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
const MotionBox = motion(Box);

function Login() {
const navigate=useNavigate();
  const { user,setUser ,login} = useAuth(); // Use AuthContext hook to handle login
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${EndPoint.URL}/users/login`, {
        email,
        password,
      });
  
      if (response && response.data) {
        // Ensure the response contains the expected userData and token
        if (response.data.userData && response.data.token) {
          login(response.data.userData, response.data.token);
          
         
        } else {
          console.error('Invalid response data:', response.data);
        }
      } else {
        console.error('Response is not valid:', response);
      }
  
      // Show success toast on successful login
      toast({
        title: 'Login Successful!',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
    } catch (error) {
      // Show error toast on login failure
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
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
                onChange={(e) => setEmail(e.target.value)} // Update state on change
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
                onChange={(e) => setPassword(e.target.value)} // Update state on change
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
          >
            Login
          </Button>

          <HStack justifyContent="center">
            <Text fontSize="sm">Don't have an account?</Text>
            <Link href="/register" color="purple.500" fontWeight="bold">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </MotionBox>
    </Container>
  );
}

export default Login;
