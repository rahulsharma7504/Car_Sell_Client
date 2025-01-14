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
  Spinner,
  Tooltip,
  FormHelperText,
} from '@chakra-ui/react';
import Endpoint from '../../Auth/Endpoint';
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
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const toast = useToast();

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const dealerId = JSON.parse(localStorage.getItem('userData')).dealer.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carName || !yearOfManufacture || !price || !description || !images.length) {
      toast({
        title: 'Missing fields',
        description: 'Please fill all fields and upload images.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true); // Start loading state

      // Handle form submission
      const formData = new FormData();
      formData.append('dealer_id', dealerId);
      formData.append('name', carName);
      formData.append('yearOfManufacture', yearOfManufacture);
      formData.append('price', price);
      formData.append('description', description);
      images.forEach((image) => formData.append('images', image));
      formData.append('features', JSON.stringify(features));

      const response = await axios.post(`${Endpoint.URL}/dealers/add-car`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        toast({
          title: 'Car added successfully.',
          status: 'success',
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
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading state
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
    <Box p={5} maxW="lg" mx="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
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

          <FormControl id="images" isRequired>
            <FormLabel>Car Images</FormLabel>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <FormHelperText mt={1}>You can upload multiple images of the car.</FormHelperText>
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

          <FormControl id="description" isRequired>
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
              isChecked={features.airConditioning}
              onChange={() => setFeatures({ ...features, airConditioning: !features.airConditioning })}
            >
              Air Conditioning
            </Checkbox>
            <Checkbox
              name="gps"
              isChecked={features.gps}
              onChange={() => setFeatures({ ...features, gps: !features.gps })}
            >
              GPS
            </Checkbox>
            <Checkbox
              name="bluetooth"
              isChecked={features.bluetooth}
              onChange={() => setFeatures({ ...features, bluetooth: !features.bluetooth })}
            >
              Bluetooth
            </Checkbox>
          </FormControl>

          <Flex mt={4} justify="flex-end">
            <Button
              colorScheme="blue"
              type="submit"
              spinnerPlacement="end"
              rightIcon={<Spinner size="sm" />}
              mr={3}
              isDisabled={isLoading}
            >
              Save
            </Button>
            <Button variant="outline" onClick={handleReset} isDisabled={isLoading}>
              Reset
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

export default AddNewCar;
