import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Heading, Text, useDisclosure, Collapse, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {useMatrix} from '../Admin/MetrixContext'
const MotionBox = motion(Box);
function Dashboard() {
  const { totelUser, totelDealer, totelCar, totelPending, setTotelUser, setTotelDealer, setTotelCar, setTotelPending }=useMatrix()


  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalDealers: 0,
    totalCarListings: 0,
    pendingDealerApprovals: 0,
    recentActivities: [],
    showRecentActivities: false
  });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await axios.get('/api/admin/metrics'); // Replace with your API endpoint
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    }
    
    fetchMetrics();
  }, []);

  return (
    <Box p={4}>
      <Heading mb={6} size="lg" color="purple.700">Dashboard</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {/* Total Users Box */}
        <MotionBox
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          shadow="md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading size="md" mb={2}>Total Users</Heading>
          <Text fontSize="2xl" color="purple.600">{totelUser}</Text>
        </MotionBox>

        {/* Total Dealers Box */}
        <MotionBox
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          shadow="md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading size="md" mb={2}>Total Dealers</Heading>
          <Text fontSize="2xl" color="purple.600">{totelDealer}</Text>
        </MotionBox>

        {/* Total Car Listings Box */}
        <MotionBox
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          shadow="md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading size="md" mb={2}>Total Car Listings</Heading>
          <Text fontSize="2xl" color="purple.600">{totelCar}</Text>
        </MotionBox>

        {/* Pending Dealer Approvals Box */}
        <MotionBox
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          shadow="md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading size="md" mb={2}>Pending Dealer Approvals</Heading>
          <Text fontSize="2xl" color="purple.600">{totelPending}</Text>
        </MotionBox>
      </SimpleGrid>

      {/* Recent Activities Section */}
      <Box mt={6}>
        <Button
          onClick={() => setMetrics(prev => ({ ...prev, showRecentActivities: !prev.showRecentActivities }))}
          colorScheme="purple"
          mb={4}
        >
          {metrics.showRecentActivities ? 'Hide Recent Activities' : 'Show Recent Activities'}
        </Button>

        <Collapse in={metrics.showRecentActivities}>
          <MotionBox
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="gray.50"
            shadow="md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading size="md" mb={4}>Recent Activities</Heading>
            {metrics.recentActivities.length > 0 ? (
              metrics.recentActivities.map((activity, index) => (
                <Box key={index} mb={2} p={3} borderWidth="1px" borderRadius="md" bg="white">
                  {activity}
                </Box>
              ))
            ) : (
              <Text>No recent activities.</Text>
            )}
          </MotionBox>
        </Collapse>
      </Box>
    </Box>
  );
}

export default Dashboard;
