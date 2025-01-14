import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Input,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Endpoint from '../../Auth/Endpoint';
import axios from 'axios';
import { useMatrix } from './MetrixContext';


function ManageDealers() {
  const { setTotelDealer } = useMatrix();
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditClick = (dealer) => {
    setSelectedDealer(dealer);
    setEditMode(true);
    onOpen();
  };

  useEffect(()=>{
    getDealers();
  },[])
  const getDealers=async()=>{
    try {
      const res = await axios.get(`${Endpoint.URL}/users/all-dealers`);
      console.log(res.data.dealers);
      setDealers(res.data.dealers);  
      setTotelDealer(res.data.dealers.length);

    } catch (error) {
      toast({ title: 'Error fetching dealers.', status: 'error' });
    }
  }

  

  const handleSave = async() => {
    const updatedData=
      {
        id: selectedDealer.id,
        email: selectedDealer.email,
        contact_number: selectedDealer.contact_number,
        verification_status: selectedDealer.verification_status,
        status: selectedDealer.status
      }
      console.log(updatedData)
      
   const res= await axios.put(`${Endpoint.URL}/users/update-dealer`,updatedData);
    getDealers();
    setEditMode(false);
    onClose();
    toast({ title: 'Dealer details updated.', status:'success' });
  };

  return (
    <Box p={5} maxW="100%">
      <Stack spacing={4} mb={4}>
        <Input placeholder="Search dealers" />
      </Stack>

      <Table variant="simple">
        <TableCaption>Dealer Management</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Contact</Th>
            <Th>License Verification</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dealers.map(dealer => (
            <Tr key={dealer.id}>
              <Td>{dealer.username}</Td>
              <Td>{dealer.email}</Td>
              <Td>{dealer.status}</Td>
              <Td>{dealer.contact_number}</Td>
              <Td>{dealer.verification_status}</Td>
              <Td>
               
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditClick(dealer)}
                >
                  <EditIcon />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit Dealer Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Edit Dealer' : 'Dealer Details'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={selectedDealer?.email || ''}
                onChange={(e) => setSelectedDealer({ ...selectedDealer, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="contact" mb={4}>
              <FormLabel>Contact</FormLabel>
              <Input
                type="text"
                value={selectedDealer?.contact_number || ''}
                onChange={(e) => setSelectedDealer({ ...selectedDealer, contact_number: e.target.value })}
              />
            </FormControl>
            <FormControl id="license" mb={4}>
              <FormLabel>License Verification</FormLabel>
              <Select
                value="verification"
                onChange={(e) => setSelectedDealer({ ...selectedDealer, verification_status: e.target.value })}
              >
                <option value="verification">Verification</option>
                <option value="reject">Reject</option>
                <option value="verify"> Verify</option>
              </Select>
            </FormControl>
            <FormControl id="status" mb={4}>
              <FormLabel>Status</FormLabel>
              <Select
                value={'Status'}
                onChange={(e) => setSelectedDealer({ ...selectedDealer, status: e.target.value })}
              >
                <option value="Status">Select Status</option>
                <option value="inActive"> In-Active</option>
                <option value="active"> Active</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}  >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ManageDealers;


