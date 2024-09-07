import React, { useState } from 'react';
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

// Mock dealer data
const mockDealers = [
  { id: 1, name: 'Dealer A', email: 'dealerA@example.com', status: 'Pending', contact: '123-456-7890', license: 'Verified' },
  { id: 2, name: 'Dealer B', email: 'dealerB@example.com', status: 'Verified', contact: '321-654-0987', license: 'Not Verified' },
  // Add more dealers as needed
];

function ManageDealers() {
  const [dealers, setDealers] = useState(mockDealers);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditClick = (dealer) => {
    setSelectedDealer(dealer);
    setEditMode(true);
    onOpen();
  };

  const handleApprove = (id) => {
    setDealers(dealers.map(dealer => dealer.id === id ? { ...dealer, status: 'Verified' } : dealer));
    toast({ title: 'Dealer approved.', status: 'success' });
  };

  const handleReject = (id) => {
    setDealers(dealers.map(dealer => dealer.id === id ? { ...dealer, status: 'Rejected' } : dealer));
    toast({ title: 'Dealer rejected.', status: 'error' });
  };

  const handleSave = () => {
    // Save updated dealer details
    setEditMode(false);
    onClose();
    toast({ title: 'Dealer details updated.', status: 'success' });
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
              <Td>{dealer.name}</Td>
              <Td>{dealer.email}</Td>
              <Td>{dealer.status}</Td>
              <Td>{dealer.contact}</Td>
              <Td>{dealer.license}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleApprove(dealer.id)}
                  mr={2}
                >
                  <CheckIcon />
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleReject(dealer.id)}
                  mr={2}
                >
                  <CloseIcon />
                </Button>
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
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={selectedDealer?.name || ''}
                onChange={(e) => setSelectedDealer({ ...selectedDealer, name: e.target.value })}
              />
            </FormControl>
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
                value={selectedDealer?.contact || ''}
                onChange={(e) => setSelectedDealer({ ...selectedDealer, contact: e.target.value })}
              />
            </FormControl>
            <FormControl id="license" mb={4}>
              <FormLabel>License Verification</FormLabel>
              <Select
                value={selectedDealer?.license || ''}
                onChange={(e) => setSelectedDealer({ ...selectedDealer, license: e.target.value })}
              >
                <option value="Verified">Verified</option>
                <option value="Not Verified">Not Verified</option>
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


