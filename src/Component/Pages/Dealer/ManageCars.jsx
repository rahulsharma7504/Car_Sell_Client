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

function ManageListings() {
  const { totalCars, setTotalCars } = useDealer();
  const [filterStatus, setFilterStatus] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCar, setEditingCar] = useState(null);
  const [edititems, setEditItems] = useState({
    name: '',
    year: '',
    price: ''
  });

  const toast = useToast();

  const handleEdit = (car) => {
    setEditingCar(car);
    setEditItems({
      name: car.name,
      year: car.year,
      price: car.price
    });
    onOpen();
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${EndPoint.URL}/dealers/edit-car/${editingCar.id}`, edititems);

      if (res.status === 200) {
        // Update the totalCars state with the updated car
        setTotalCars((prevCars) =>
          prevCars.map((car) =>
            car.id === editingCar.id ? { ...car, ...edititems } : car
          )
        );
        setEditingCar(null);
        onClose();
        toast({
          title: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to update the car listing',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async(carId) => {

    const res=await axios.delete(`${EndPoint.URL}/dealers/delete-car/${carId}`);
    if(res.status===200){
      // Update the totalCars state with the deleted car
      setTotalCars(prevCars => prevCars.filter(car => car.id!== carId));
      toast({
        title: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }else{
      toast({
        title: 'Failed to delete the car listing',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

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
                <Image src={JSON.parse(car.image_url)[1]} alt={car.name} boxSize="100px" />
              </Td>
              <Td>{`${car.name}`}</Td>
              <Td>{car.price}</Td>
              <Td>{car.year}</Td>
              <Td>
                <Select>
                  {JSON.parse(car.features).map((feature, index) => (
                    <option key={index} value={feature}>{feature}</option>
                  ))}
                </Select>
              </Td>
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
              <Input
                placeholder="Car Name"
                value={edititems.name}
                onChange={(e) => setEditItems({ ...edititems, name: e.target.value })}
                mb={3}
              />
              <Input
                placeholder="Car Year"
                value={edititems.year}
                onChange={(e) => setEditItems({ ...edititems, year: e.target.value })}
                mb={3}
              />
              <Input
                placeholder="Price"
                value={edititems.price}
                onChange={(e) => setEditItems({ ...edititems, price: e.target.value })}
                mb={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSave}>
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
