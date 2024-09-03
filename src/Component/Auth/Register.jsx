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
  InputRightElement,

  Textarea,
  useToast,
  VStack,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import EndPoint from './Endpoint'
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdLock, MdPhone, MdLocationOn, MdCardTravel, MdImage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Define motion component
const MotionBox = motion(Box);

const Register = () => {
const navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [image, setImage] = useState(null);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, role, image };
    console.log(userData);
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
      console.log(formData);

      const response = await axios.post(`${EndPoint.URL}/users/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast({
        title: response.data.message,
        description: "You've registered successfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('user');
      setAddress('');
      setPhone('');
      setLicenseNumber('');
      setImage(null);

    } catch (error) {
      toast({
        title: error.response.data.message,
        description: 'Something went wronge.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      maxW="container.sm"
      py={8}
      bgSize="cover"
      bgPosition="center"
    >
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
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  leftIcon={<Icon as={MdLocationOn} />}
                />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone</FormLabel>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  leftIcon={<Icon as={MdPhone} />}
                />
              </FormControl>
              <FormControl id="licenseNumber">
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
                <img src={URL.createObjectURL(image)} alt="Profile preview" boxSize="40px" objectFit="cover" />
              </Box>
            )}
          </FormControl>

          <Button colorScheme="purple" onClick={handleSubmit}>
            Register
          </Button>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Register;
