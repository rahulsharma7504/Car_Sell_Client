import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDealer } from './DealerContext';
const Dashboard = () => {
  const { totalCars } = useDealer();
  // Example data
  const [stats, setStats] = useState({
    totalCarListings: totalCars.length,
    testDriveRequests: { pending: 5, completed: 25 },
    sales: 85,
    pendingApprovals: 10,
  });

  return (
    <Box p={5}>
      <Heading mb={6}>Dealer Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {/* Total Car Listings Widget */}
        <Stat
          p={4}
          borderRadius="md"
          boxShadow="md"
          bg={useColorModeValue('white', 'gray.700')}
        >
          <StatLabel>Total Car Listings</StatLabel>
          <StatNumber>{stats.totalCarListings}</StatNumber>
        </Stat>
        
        {/* Test Drive Requests Widget */}
        <Stat
          p={4}
          borderRadius="md"
          boxShadow="md"
          bg={useColorModeValue('white', 'gray.700')}
        >
          <StatLabel>Test Drive Requests</StatLabel>
          <Flex justify="space-between">
            <StatNumber color="yellow.500">{stats.testDriveRequests.pending} Pending</StatNumber>
            <StatNumber color="green.500">{stats.testDriveRequests.completed} Completed</StatNumber>
          </Flex>
        </Stat>

        {/* Sales Widget */}
        <Stat
          p={4}
          borderRadius="md"
          boxShadow="md"
          bg={useColorModeValue('white', 'gray.700')}
        >
          <StatLabel>Sales</StatLabel>
          <StatNumber>{stats.sales}</StatNumber>
        </Stat>

       
      </SimpleGrid>

      <VStack spacing={4} mt={6} align="stretch">
        <Link to="/add-new-car">
          <Button colorScheme="teal" size="lg">
            Add New Car
          </Button>
        </Link>
        <Link to="/manage-listings">
          <Button colorScheme="blue" size="lg">
            Manage Listings
          </Button>
        </Link>
        <Link to="/test-drive-requests">
          <Button colorScheme="orange" size="lg">
            View Test Drive Requests
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Dashboard;
