import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import EndPoint from '../../Auth/Endpoint';

import { useNavigate } from 'react-router-dom';
const initialProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1234567890',
  address: '123 Main St, Springfield, USA',
  password: '********', // Password should be handled securely
};

function Profile() {
  const navigate=useNavigate()
  const dealerData=JSON.parse(localStorage.getItem('userData')).dealer;
  const [profile, setProfile] = useState(dealerData);
  const [editProfile, setEditProfile] = useState(dealerData);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async() => {
    try {
      setProfile(editProfile);
    const res= await axios.post(`${EndPoint.URL}/dealers/profile/${dealerData.id}`,profile);
    if(res.status===200){
      toast({
        title: res.data?.message,
        status: 'success',
        duration: 2000, 
        isClosable: true,
      });
      navigate('/dealer-dashboard')
    }
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      
    }
    
   
  };

  const handlePasswordChange = () => {
    // Implement password change logic here
    toast({
      title: 'Password changed successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsChangingPassword(false);
  };

  return (
    <Box p={5}>
      <Stack spacing={4} maxW="600px" mx="auto">
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="username"
            value={editProfile.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={editProfile.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            name="contact_number"
            value={editProfile.contact_number}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="address">
          <FormLabel>Dealership Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={editProfile.address}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleUpdate}>
          Update
        </Button>
        <Button colorScheme="blue" onClick={() => setIsChangingPassword(true)}>
          Change Password
        </Button>
      </Stack>

      {/* Change Password Modal */}
      <Modal isOpen={isChangingPassword} onClose={() => setIsChangingPassword(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="newPassword">
              <FormLabel>Old Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter Old password"
                // Implement change password logic here
              />
            </FormControl>
            <FormControl id="confirmPassword" mt={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter new password"
                // Implement change password logic here
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePasswordChange}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Profile;
