import React, { useEffect, useState } from 'react';
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
import { useAuth } from '../../Context/AuthContext';
import EndPoint from '../../Auth/Endpoint';
import axios from 'axios';
import moment from 'moment';


function  TestDriveRequests() {
  const {user}=useAuth()
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(()=>{
    // Fetch test drive requests for the current dealer
    fetchDrives()
  },[])
  async function fetchDrives (){
    // Fetch test drive requests for the current dealer
    const res=await axios.get(`${EndPoint.URL}/dealers/test-drive`);
    if(res.status===200){
      setRequests(res.data.allDrives);
    };
  }

  const handleApprove = async(id) => {
    const res=await axios.put(`${EndPoint.URL}/dealers/test-drive/${id}`);
    if(res.status===200){
      fetchDrives();
      toast({
        title: "Request approved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    
  };

  const handleDecline = async(id) => {
    const res=await axios.put(`${EndPoint.URL}/dealers/decline/test-drive/${id}`);
    if(res.status==200){
      fetchDrives();
      toast({
        title: "Request declined.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
   
   
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
                  {request.customer_name}
                </Button>
              </Td>
              <Td>{request.car_name}</Td>
              <Td>{moment(request.requested_date).format('DD-MM-YYYY')}</Td>
              <Td>{request.status}</Td>
              <Td>
                <Stack direction="row" spacing={4}>
                  {request.status === 'pending' && (
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
              <Box mb={3}><strong>Customer Name:</strong> {selectedRequest.customer_name}</Box>
              <Box mb={3}><strong>Car Model:</strong> {selectedRequest.car_name}</Box>
              <Box mb={3}><strong>Preferred Date/Time:</strong> {moment(selectedRequest.requested_date).format('DD-MM-YYYY')}</Box>
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
