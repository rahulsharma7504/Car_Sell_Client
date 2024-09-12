import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  Badge,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EndPoint from '../../Auth/Endpoint';
import axios from 'axios';
import { useMatrix } from './MetrixContext';

const CarListing = () => {
  const { setTotelCar } = useMatrix();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${EndPoint.URL}/dealers/cars`);
      setCars(response.data.cars); // Assuming 'cars' is an array in your API response
      console.log(typeof response.data.cars[0].image_url);
      setTotelCar(response.data.cars.length); // Update total car count in matrix context
      setLoading(false);
    } catch (err) {
      console.error('Error fetching car data:', err);
      setError('Failed to load car data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px" p={5}>
      {cars.map((car) => (
        <Box
          key={car.id}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
        >
          <Carousel showThumbs={false} showStatus={false}>
            {JSON.parse(car.image_url).map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                alt={car.name}
                objectFit="cover"
                h="300px"
              />
            ))}
          </Carousel>

          <Box p="6">
            <Stack spacing={3}>
              <Heading size="md">{car.name}</Heading>
              <Text>{car.year}</Text>
              <Text color="teal.500" fontSize="2xl">
                ${car.price}
              </Text>
              <VStack align="start">
                {JSON.parse(car.features).map((feature, index) => (
                  <Badge key={index} colorScheme="green">
                    {feature}
                  </Badge>
                ))}
              </VStack>
              <Text mt={2} fontSize="sm">
                {car.description}
              </Text>
              <Text mt={2} fontSize="md">
                {car.username}
              </Text>
            </Stack>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CarListing;
