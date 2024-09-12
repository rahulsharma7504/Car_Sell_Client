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

const initialRequests = [
  {
    id: 1,
    customerName: 'John Doe',
    carModel: 'Toyota Corolla',
    preferredDateTime: '2024-09-20 14:00',
    status: 'Pending',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    carModel: 'Honda Civic',
    preferredDateTime: '2024-09-22 10:00',
    status: 'Approved',
  },
  // Add more test drive request objects as needed
];

function TestDriveRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleApprove = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: 'Approved' } : request
      )
    );
    toast({
      title: "Request approved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDecline = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: 'Declined' } : request
      )
    );
    toast({
      title: "Request declined.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  return (
    <Box p={5}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Customer Name</Th>
            <Th>Car Model</Th>
            <Th>Preferred Date/Time</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request.id}>
              <Td>
                <Button variant="link" onClick={() => handleViewDetails(request)}>
                  {request.customerName}
                </Button>
              </Td>
              <Td>{request.carModel}</Td>
              <Td>{request.preferredDateTime}</Td>
              <Td>{request.status}</Td>
              <Td>
                <Stack direction="row" spacing={4}>
                  {request.status === 'Pending' && (
                    <>
                      <Button colorScheme="green" onClick={() => handleApprove(request.id)}>
                        Approve
                      </Button>
                      <Button colorScheme="red" onClick={() => handleDecline(request.id)}>
                        Decline
                      </Button>
                    </>
                  )}
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Request Details Modal */}
      {selectedRequest && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Test Drive Request Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={3}><strong>Customer Name:</strong> {selectedRequest.customerName}</Box>
              <Box mb={3}><strong>Car Model:</strong> {selectedRequest.carModel}</Box>
              <Box mb={3}><strong>Preferred Date/Time:</strong> {selectedRequest.preferredDateTime}</Box>
              <Box mb={3}><strong>Status:</strong> {selectedRequest.status}</Box>
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

export default TestDriveRequests;
