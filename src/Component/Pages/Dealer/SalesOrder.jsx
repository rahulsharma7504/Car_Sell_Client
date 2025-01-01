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
import moment from 'moment';
import { useOrder } from '../../Context/OrderContext';
import { useCart } from '../../Context/CartContext';

function SalesOrders() {
  const { orderData } = useOrder()
  const toast = useToast();
  const { cartPending, updateCartRequest } = useCart()

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
                  <Th>Image</Th>
                  <Th>Car Name</Th>
                  <Th>Customer Name</Th>
                  <Th>Request Date</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartPending ? (
                  cartPending.map((request) => (
                    <Tr key={request.id}>
                      <Td><img src={JSON.parse(request.carImage)[1]} alt="C-image" width={62} /></Td>
                      <Td>{request.carName}</Td>
                      <Td>{request.username}</Td>
                      <Td>{moment(request.requested_date).format('DD-MM-YYYY')}</Td>
                      <Td>{request.status}</Td>
                      {
                        request.status === 'pending' ? (
                          <Td>
                            <Stack direction="row" spacing={4}>
                              <Button colorScheme="green" onClick={() => updateCartRequest(request, 'approve')}>Approve</Button>
                              <Button colorScheme="red" onClick={() => updateCartRequest(request, 'reject')}>Decline</Button>
                            </Stack>
                          </Td>
                        ) : (
                          <Td>{request.status}</Td>
                        )
                      }
                    </Tr>
                  ))) : (
                  <Tr>
                    <Td colSpan={6}>No pending requests found.</Td>
                  </Tr>

                )}

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
                  <Th>Payment-ID</Th>
                  <Th>Sale Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  orderData && orderData.length > 0 ? (
                    orderData.map((item) => (
                      <Tr key={item.order.order_id}>
                        <Td>{item.order.order_id}</Td>
                        <Td>{item.order.name}</Td>
                        <Td>
                          {item.payments.length > 0 ? (
                            item.payments.map((payment, index) => (
                              <div key={index}>
                                Payment ID: {payment.paymentId}, Amount: {payment.amount}
                              </div>
                            ))
                          ) : (
                            "No payments"
                          )}
                        </Td>
                        <Td>{moment(item.order.saleDate).format('DD-MM-YYYY')}</Td>
                        <Td>{item.order.status}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={5}>No sales found.</Td>
                    </Tr>
                  )
                }




              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SalesOrders;
