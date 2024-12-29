import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { useOrder } from '../../Context/OrderContext';
import moment from 'moment';

function SalesOrders() {
  const toast = useToast();

  // const handleApprove = async (orderId, userId, carId) => {
  //   updateStatus(orderId, 'Approve', userId, carId);
  // };

  // const handleReject = async (orderId, userId, carId) => {
  //   updateStatus(orderId, 'Reject', userId, carId);
  // };

  return (
    <Box p={5}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>User Payment Requests</Tab>
          <Tab>All Dealer Car Sales</Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanels>
          {/* First Tab - User Payment Requests */}
          <TabPanel>
            <h3><b>User Payment Requests</b></h3><hr height={'22px'} />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Car Model</Th>
                  <Th>Customer Name</Th>
                  <Th>Request Date</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                
                {/* Display User Payment Requests here */}
              </Tbody>
            </Table>
          </TabPanel>

          {/* Second Tab - All Dealer Car Sales */}
          <TabPanel>
            <h3><b>All Dealer Car Sales</b></h3><hr height={'22px'} />
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Car Model</Th>
                  <Th>Dealer Name</Th>
                  <Th>Sale Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Display All Dealer Car Sales here */}
                {/* {orders?.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.order_id}</Td>
                    <Td>{order.carName}</Td>
                    <Td>{order.dealerName}</Td>
                    <Td>{moment(order.sale_date).format('DD-MM-YYYY')}</Td>
                    <Td>{order.status}</Td>
                  </Tr>
                ))} */}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SalesOrders;
