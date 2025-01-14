import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { MdPerson, MdEmail, MdLock, MdPhone, MdLocationOn, MdCardTravel } from 'react-icons/md';
import { motion } from 'framer-motion';
import EndPoint from './Endpoint';  // Assume this is the correct path
import { useNavigate } from 'react-router-dom';

// Define motion component
const MotionBox = motion(Box);

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const isFormValid = () => {
    if (!username || !email || !password || !role) return false;
    if (role === 'dealer' && (!address || !phone || !licenseNumber)) return false;
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data before submitting
    if (!isFormValid()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Set loading state
    setIsLoading(true);

    const userData = { username, email, password, role, image };
    if (role === 'dealer') {
      userData.address = address;
      userData.phone = phone;
      userData.licenseNumber = licenseNumber;
    }

    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('role', userData.role);
      if (image) formData.append('image', image);
      
      if (role === 'dealer') {
        formData.append('address', userData.address);
        formData.append('phone', userData.phone);
        formData.append('licenseNumber', userData.licenseNumber);
      }

      const response = await axios.post(`${EndPoint.URL}/users/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        toast({
          title: 'Registration Successful',
          description: "You've registered successfully.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
        // Reset form after successful submission
        resetForm();
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong.';
      toast({
        title: 'Registration Failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('user');
    setAddress('');
    setPhone('');
    setLicenseNumber('');
    setImage(null);
  };

  return (
    <Container maxW="container.sm" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        p={8}
        bg="white"
        boxShadow="lg"
        borderWidth="1px"
      >
        <VStack spacing={6} align="stretch">
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              leftIcon={<Icon as={MdPerson} />}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              leftIcon={<Icon as={MdEmail} />}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              leftIcon={<Icon as={MdLock} />}
            />
          </FormControl>
          <FormControl id="role" isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select role"
            >
              <option value="user">User</option>
              <option value="dealer">Dealer</option>
            </Select>
          </FormControl>

          {role === 'dealer' && (
            <>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  leftIcon={<Icon as={MdLocationOn} />}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  leftIcon={<Icon as={MdPhone} />}
                />
              </FormControl>
              <FormControl id="licenseNumber" isRequired>
                <FormLabel>License Number</FormLabel>
                <Input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="Enter your license number"
                  leftIcon={<Icon as={MdCardTravel} />}
                />
              </FormControl>
            </>
          )}

          <FormControl id="image">
            <FormLabel>Profile Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <Box mt={4} textAlign="center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Profile preview"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              </Box>
            )}
          </FormControl>

          <Button colorScheme="purple" onClick={handleSubmit} isLoading={isLoading}>
            Register
          </Button>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Register;
