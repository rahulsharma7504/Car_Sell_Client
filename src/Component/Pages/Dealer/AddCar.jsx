import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Image,
  Flex,
} from '@chakra-ui/react';
import Endpoint from '../../Auth/Endpoint'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
function AddNewCar() {
  const { user } = useAuth(); // Get user data from context

  const [carName, setCarName] = useState('');
  const [yearOfManufacture, setYearOfManufacture] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState({
    airConditioning: false,
    gps: false,
    bluetooth: false,
  });
  const toast = useToast();

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
    
  };

const dealerId=JSON.parse(localStorage.getItem('userData')).dealer.id;
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      // Validate form inputs
      if (!dealerId || !carName || !yearOfManufacture || !price || !description || !images.length || !features) {
          throw new Error('All fields are required');
      }

      // Handle form submission
      const formData = new FormData();
      formData.append('dealer_id', dealerId);  // Replace with actual dealer ID
      formData.append('name', carName);
      formData.append('yearOfManufacture', yearOfManufacture);
      formData.append('price', price);
      formData.append('description', description);
      images.forEach(image => formData.append('images', image));
      formData.append('features', JSON.stringify(features));

      const response = await axios.post(`${Endpoint.URL}/dealers/add-car`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      if (response.status === 200) {
          toast({
              title: "Car added successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
          });

          // Reset form
          setCarName('');
          setYearOfManufacture('');
          setPrice('');
          setImages([]);
          setDescription('');
          setFeatures({
              airConditioning: false,
              gps: false,
              bluetooth: false,
          });
      }

  } catch (error) {
      console.error('Error adding car:', error.response?.data?.message || error.message);

      toast({
          title: error.response?.data?.message || 'Something went wrong',
          status: "error",
          duration: 3000,
          isClosable: true,
      });
  }
};

  const handleReset = () => {
    setCarName('');
    setYearOfManufacture('');
    setPrice('');
    setImages([]);
    setDescription('');
    setFeatures({
      airConditioning: false,
      gps: false,
      bluetooth: false,
    });
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl id="carName" isRequired>
            <FormLabel>Car Name/Model</FormLabel>
            <Input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Enter car name/model"
            />
          </FormControl>

          <FormControl id="yearOfManufacture" isRequired>
            <FormLabel>Year of Manufacture</FormLabel>
            <Input
              type="number"
              value={yearOfManufacture}
              onChange={(e) => setYearOfManufacture(e.target.value)}
              placeholder="Enter year of manufacture"
            />
          </FormControl>

          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </FormControl>

          <FormControl id="images">
            <FormLabel>Images</FormLabel>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <Flex wrap="wrap" mt={2}>
              {images.map((file, index) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  boxSize="100px"
                  objectFit="cover"
                  alt={`Preview ${index}`}
                  mr={2}
                  mb={2}
                />
              ))}
            </Flex>
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter car description"
            />
          </FormControl>

          <FormControl id="features">
            <FormLabel>Additional Features</FormLabel>
            <Checkbox

              name="airConditioning"
              onChange={()=>{
                setFeatures({...features, airConditioning:!features.airConditioning });
              }}
            >
              Air Conditioning
            </Checkbox>
            <Checkbox
              name="gps"
              onChange={()=>{
                setFeatures({...features, gps:!features.gps });
              }}
            >
              GPS
            </Checkbox>
            <Checkbox
              name="bluetooth"
              onChange={()=>{
                setFeatures({...features, bluetooth:!features.bluetooth });
              }}
            >
              Bluetooth
            </Checkbox>
          </FormControl>

          <Flex>
            <Button colorScheme="blue" type="submit" mr={3}>
              Save
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

export default AddNewCar;
