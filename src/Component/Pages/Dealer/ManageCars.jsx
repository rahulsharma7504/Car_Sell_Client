import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Image,
  IconButton,
  Input,
  Select,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import EndPoint from '../../Auth/Endpoint';
import axios from 'axios';
import { useDealer } from './DealerContext';
import { type } from '@testing-library/user-event/dist/type';


function ManageListings() {
  const { totalCars, setTotalCars } = useDealer();
  // const [cars, setCars] = useState(initialCars);
  const [filterStatus, setFilterStatus] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCar, setEditingCar] = useState(null);
  const toast = useToast();


  
// Function to fetch total cars for a dealer








  const handleEdit = (car) => {
    setEditingCar(car);
    onOpen();
  };

  console.log()
  const handleDelete = (carId) => {
    setTotalCars(totalCars.filter(car => car.id !== carId));
    toast({
      title: "Car listing deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredCars = filterStatus
    ? totalCars.filter(car => car.status === filterStatus)
    : totalCars;

  return (
    <Box p={5}>
      <Flex mb={5} justifyContent="space-between" alignItems="center">
        <Input placeholder="Search by model..." w="200px" />
        <Select placeholder="Filter by status" w="200px" onChange={handleFilter}>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </Select>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Car Image</Th>
            <Th>Car Name/Model</Th>
            <Th>Price</Th>
            <Th>Year</Th>
            <Th>Features</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCars.map((car) => (
            <Tr key={car.id}>
              <Td>
                <h6></h6>
                <Image src={JSON.parse(car.image_url)[1]} alt={car.name} boxSize="100px" />
              </Td>
              <Td>{`${car.name}`}</Td>
              <Td>{car.price}</Td>
              <Td>{car.year}</Td>
              <Td><select name="" id=""> 
              {
               JSON.parse(car.features).map((i)=>{
                 return <option value={i}>{i}</option>
  
               })          
                }
                </select></Td>
              <Td>{car.status}</Td>
              <Td>
                <Stack direction="row" spacing={4}>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => handleEdit(car)}
                    aria-label="Edit car"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(car.id)}
                    aria-label="Delete car"
                    colorScheme="red"
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit Car Modal */}
      {editingCar && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Car Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Include a form here to edit car details */}
              <Input placeholder="Car Name" defaultValue={editingCar.name} mb={3} />
              <Input placeholder="Car Year" defaultValue={editingCar.year} mb={3} />
              <Input placeholder="Price" defaultValue={editingCar.price} mb={3} />
              
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default ManageListings;
