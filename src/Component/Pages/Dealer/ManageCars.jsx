import React, { useState } from 'react';
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

const initialCars = [
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: 'Toyota Corolla',
    model: '2021',
    price: '$20,000',
    status: 'Active',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: 'Honda Civic',
    model: '2020',
    price: '$18,000',
    status: 'Pending',
  },
  // Add more car objects as needed
];

function ManageListings() {
  const [cars, setCars] = useState(initialCars);
  const [filterStatus, setFilterStatus] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCar, setEditingCar] = useState(null);
  const toast = useToast();

  const handleEdit = (car) => {
    setEditingCar(car);
    onOpen();
  };

  const handleDelete = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
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
    ? cars.filter(car => car.status === filterStatus)
    : cars;

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
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCars.map((car) => (
            <Tr key={car.id}>
              <Td>
                <Image src={car.image} alt={car.name} boxSize="100px" />
              </Td>
              <Td>{`${car.name} (${car.model})`}</Td>
              <Td>{car.price}</Td>
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
              <Input placeholder="Car Model" defaultValue={editingCar.model} mb={3} />
              <Input placeholder="Price" defaultValue={editingCar.price} mb={3} />
              <Select placeholder="Status" defaultValue={editingCar.status}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </Select>
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
