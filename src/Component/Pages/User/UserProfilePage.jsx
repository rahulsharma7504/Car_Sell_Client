import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import moment from 'moment';
import Endpoint from '../../Auth/Endpoint';

const MotionTr = motion(Tr); // Animate each row

function UserProfilePage() {
  const toast = useToast();
  const User = JSON.parse(localStorage.getItem("userData"))?.user;
  const { user } = useAuth(); // Use AuthContext hook to access user information
  const [purchaseData, setPurchaseData] = useState(null); // To hold the purchase data
  const [userDetails, setUserDetails] = useState({
    name: user?.data?.user?.username || '',
    email: user?.data?.user?.email || '',
    password: user?.data?.user?.password || '',
    userId: user?.data?.user?.id || '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch Purchase History
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get(`${Endpoint.URL}/users/purchase-history/${User.id}`);
        setPurchaseData(res?.data);
      } catch (error) {
        toast({
          title: 'Error fetching purchase history.',
          status: 'error',
        });
      }
    }
    fetchHistory();
  }, [User.id, toast]);

  // Handle User Profile Update
  function handleChange(event) {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${Endpoint.URL}/users/update-profile/`, userDetails);
      if (res.status === 200) {
        toast({
          title: 'Profile updated successfully.',
          status: 'success',
        });
      } else {
        toast({
          title: 'Error updating profile.',
          status: 'error',
        });
      }
    } catch (error) {
      toast({
        title: 'Error updating profile.',
        status: 'error',
      });
    }
    setLoading(false);
  }

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Heading mb={4}>User Dashboard</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Purchase History</Tab>
        </TabList>

        <TabPanels>
          {/* Tab 1: User Profile */}
          <TabPanel>
            <Heading size="md" mb={4}>Edit Profile</Heading>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Enter your name" name="name" onChange={handleChange} value={userDetails.name} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter your email" name="email" onChange={handleChange} value={userDetails.email} />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter new password" onChange={handleChange} name="password" />
                </FormControl>
                <Button colorScheme="blue" type="submit" mt={4} isLoading={loading}>
                  Save Changes
                </Button>
              </form>
            </Stack>
          </TabPanel>

          {/* Tab 2: Purchase History */}
          <TabPanel>
            <Heading size="md" mb={4}>Purchase History</Heading>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr bgGradient="linear(to-r, teal.500, green.500)">
                  <Th color="white" fontSize="lg" textAlign="center">Purchase ID</Th>
                  <Th color="white" fontSize="lg" textAlign="center">Date</Th>
                  <Th color="white" fontSize="lg" textAlign="center">Amount</Th>
                  <Th color="white" fontSize="lg" textAlign="center">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Ensure purchaseData is valid before mapping */}
                {purchaseData && purchaseData.length > 0 ? (
                  purchaseData.map((item, index) =>
                    item?.findPayments?.map((payment, paymentIndex) => (
                      <MotionTr
                        key={payment.payment_id || `${item.order.order_id}-${paymentIndex}`} // Ensure unique keys
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + paymentIndex * 0.1, duration: 0.5 }}
                        _hover={{ bg: 'teal.100', shadow: 'md' }}
                      >
                        <Td textAlign="center" fontWeight="bold">{payment.payment_id}</Td>
                        <Td textAlign="center">{moment(payment.payment_date).format('DD-MM-YYYY')}</Td>
                        <Td textAlign="center" color="green.600">{payment.amount}</Td>
                        <Td textAlign="center" color={payment.status === 'Completed' ? 'green.500' : 'orange.500'}>
                          {payment.payment_status}
                        </Td>
                      </MotionTr>
                    ))
                  )
                ) : (
                  <Tr>
                    <Td colSpan="4" textAlign="center">No purchase history available.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default UserProfilePage;
