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

const initialOrders = [
  {
    id: 1,
    carModel: 'Toyota Corolla',
    customerName: 'John Doe',
    saleDate: '2024-09-10',
    status: 'Completed',
  },
  {
    id: 2,
    carModel: 'Honda Civic',
    customerName: 'Jane Smith',
    saleDate: '2024-09-12',
    status: 'Pending',
  },
  // Add more sales order objects as needed
];

function SalesOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleStatusUpdate = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Order status updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  return (
    <Box p={5}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Car Model</Th>
            <Th>Customer Name</Th>
            <Th>Sale Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.carModel}</Td>
              <Td>{order.customerName}</Td>
              <Td>{order.saleDate}</Td>
              <Td>{order.status}</Td>
              <Td>
                <Stack direction="row" spacing={4}>
                  <Button colorScheme="blue" onClick={() => handleViewDetails(order)}>
                    View Details
                  </Button>
                  {order.status === 'Pending' && (
                    <Button
                      colorScheme="green"
                      onClick={() => handleStatusUpdate(order.id, 'Completed')}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={3}><strong>Order ID:</strong> {selectedOrder.id}</Box>
              <Box mb={3}><strong>Car Model:</strong> {selectedOrder.carModel}</Box>
              <Box mb={3}><strong>Customer Name:</strong> {selectedOrder.customerName}</Box>
              <Box mb={3}><strong>Sale Date:</strong> {selectedOrder.saleDate}</Box>
              <Box mb={3}><strong>Status:</strong> {selectedOrder.status}</Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default SalesOrders;
