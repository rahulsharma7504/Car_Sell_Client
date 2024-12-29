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
  useToast, 
  Tbody, 
  Tr, 
  Th, 
  Td 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {useAuth} from '../../Context/AuthContext'
import axios from 'axios';
import moment from 'moment';
import Endpoint from '../../Auth/Endpoint';
const MotionTr = motion(Tr); // Animate each row

function UserProfilePage() {
  const toast=useToast()
  const User = JSON.parse(localStorage.getItem("userData"))?.user;

  const { user } = useAuth(); // Use AuthContext hook to access user information
  const [purchaseData,setPurchaseData]=useState([])

  // Fetch Purchase History
  useEffect(()=>{
    async function fetchHistory(){
      try{
        const res=await axios.get(`${Endpoint.URL}/users/purchase-history/${User.id}`);
        setPurchaseData(res.data)

      }catch(error){
        toast({
          title: 'Error fetching purchase history.',
          status: 'error'
        })
      }
      
    }
    fetchHistory()
  },[])


  const [userDetails,setUserDetails]=useState({
      name:user.data.user.username,
      email:user.data.user.email,
      password:user.data.user.password,
      userId:user.data.user.id
  })

  function handleChange(event){
    setUserDetails({...userDetails,[event.target.name]: event.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault();
    const res=await axios.put(`${Endpoint.URL}/users/update-profile/`,userDetails);
    if(res.status===200){
      alert('Profile updated successfully');
    }else{
      alert('Error updating profile');
    }
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
              <form action="" >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter your name" name='name' onChange={handleChange} value={userDetails.name}  />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" name='email' onChange={handleChange} value={userDetails.email} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter new password" onChange={handleChange} name='password'  />
              </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}  mt={4}>Save Changes</Button>
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
                {purchaseData.map((item, index) => (
                  <MotionTr
                    key={item.payment_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    _hover={{ bg: 'teal.100', shadow: 'md' }}
                  >
                    <Td textAlign="center" fontWeight="bold">{item.transaction_id}</Td>
                    <Td textAlign="center">{moment(item.payment_date).format('DD-MM-YYYY')}</Td>
                    <Td textAlign="center" color="green.600">{item.amount}</Td>
                    <Td textAlign="center" color={item.status === 'Completed' ? 'green.500' : 'orange.500'}>
                      {item.payment_status}
                    </Td>
                  </MotionTr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default UserProfilePage;
