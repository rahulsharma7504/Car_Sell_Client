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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { useOrder } from '../../Context/OrderContext';
import moment from 'moment';



function SalesOrders() {
  const { ApprovalRequestData,updateStatus, orderData } = useOrder()
  const [orders, setOrders] = useState(orderData);
  const toast = useToast();


  if (orderData === null) {
    return <div>Loading...</div>;
  }

  const handleApprove=async(orderId,userId,carId)=>{
      updateStatus(orderId, 'Approve',userId,carId);
  }
  const handleReject=async(orderId,userId,carId)=>{
      updateStatus(orderId, 'Reject',userId,carId);
  }


  return (
    <Box p={5}>
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
          {orders?.map((order) => (
            <Tr key={order.id}>
              <Td>{order.order_id}</Td>
              <Td>{order.carName}</Td>
              <Td>{order.username}</Td>
              <Td>{moment(order.created_at).format('DD-MM-YYYY')}</Td>

              <Td>{order.status}</Td>
              <Td>
                <Stack direction="row" spacing={4}>
                  {order.status === 'Pending' ? (
                    <>
                      <Button
                        colorScheme="red"
                        onClick={() => handleReject(order.order_id,order.user_id,order.car_id)}>
                        Reject 
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={() => handleApprove(order.order_id,order.user_id,order.car_id)}>
                        Approve
                      </Button>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

    </Box>
  );
}

export default SalesOrders;
