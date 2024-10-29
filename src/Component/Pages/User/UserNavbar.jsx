import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Collapse,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {useAuth} from '../../Context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  
  const {user,logout} =useAuth()
  const [userData,setUserData]=useState(null);
  const { isOpen, onToggle } = useDisclosure();
  useEffect(()=>{
    const User=JSON.parse(localStorage.getItem('userData')).user;
    setUserData(User);
  },[])

  return (
    <Box style={{backgroundColor:'purple', lightingColor:'ActiveCaption'}} color="white" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize="xl" fontWeight="bold">
          Car Shop
        </Text>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Toggle Navigation'}
          display={{ md: 'none' }}
          onClick={onToggle}
          color="white"
        />
        <HStack
          as={'nav'}
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          ml="auto" // Align links to the right
        >
          <Button variant="link" color="white" onClick={()=>navigate('/profile')} _hover={{ color: "teal.300" }}>
            User Profile
          </Button>
          <Button variant="link" color="white" _hover={{ color: "teal.300" }} onClick={()=>logout()}>
            Log-Out
          </Button>
          <Avatar
            size="md"
            name="User Name" // Change this to the user's name dynamically if needed
            src={userData?.image} // Replace with a dynamic image source
            cursor="pointer"
            _hover={{ border: '2px solid teal.300' }}
          />
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="teal.500"
          p={4}
          display={{ md: 'none' }}
          borderRadius="md"
          spacing={2}
        >
          <Button variant="link" color="white" _hover={{ color: "teal.300" }}>
            Test Drives
          </Button>
          <Button variant="link" color="white" _hover={{ color: "teal.300" }}>
            User Profile
          </Button>
          <Button variant="link" color="white" _hover={{ color: "teal.300" }}>
            Logout
          </Button>
          <Avatar
            size="sm"
            name="User Name" // Change this to the user's name dynamically if needed
            src="https://bit.ly/broken-link" // Replace with a dynamic image source
            cursor="pointer"
            _hover={{ border: '2px solid teal.300' }}
          />
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
