import React from 'react';
import {useAuth} from '../../Context/AuthContext'

import {
  
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import {Link, useNavigate} from 'react-router-dom'
import { HamburgerIcon, CloseIcon, AddIcon, ChatIcon } from '@chakra-ui/icons';
import { FaCar, FaHome, FaCalendarAlt, FaShoppingCart, FaUser, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
const Links = [
  { name: 'Dashboard', icon: FaHome, href: '/dealer-dashboard' },
  { name: 'Manage Listings', icon: FaCar, href: '/manage-listings' },
  { name: 'Add New Car', icon: AddIcon, href: '/add-new-car' },
  { name: 'Test Drive Requests', icon: FaCalendarAlt, href: '/test-drive-requests' },
  { name: 'Sales & Orders', icon: FaShoppingCart, href: '/sales-orders' },
  { name: 'Profile', icon: FaUser, href: '/profile' },
];

const NavLink = ({ link }) => (
  <>
  
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={link.href}
  >
    <HStack>
      <Icon as={link.icon} boxSize={4} />
      <Box>{link.name}</Box>
    </HStack>
  </Link>

  </>
  
);

export default function DealerNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" fontSize="lg">
              Dealer Portal
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} link={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* Additional items like notifications or settings could go here */}
            <IconButton size={'md'} icon={<FaSignOutAlt />} />
            <button onClick={() =>{
              logout()
            }}><b> Logout</b></button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <VStack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} link={link} />
              ))}
            </VStack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
