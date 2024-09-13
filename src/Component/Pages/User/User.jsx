import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  Heading,
  Stack,
  Divider,
  useColorModeValue,
  Grid,
  GridItem,
  Text,
  Image,
} from '@chakra-ui/react';

// Demo Cars Data
const demoCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    price: 25000,
    mileage: 12000,
    color: 'Red',
    transmission: 'Automatic',
    location: 'New York',
    image: 'https://via.placeholder.com/400x250', // Placeholder image
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 23000,
    mileage: 15000,
    color: 'Blue',
    transmission: 'Manual',
    location: 'Los Angeles',
    image: 'https://via.placeholder.com/400x250',
  },
  {
    id: 3,
    make: 'BMW',
    model: 'X5',
    year: 2024,
    price: 55000,
    mileage: 8000,
    color: 'Black',
    transmission: 'Automatic',
    location: 'Chicago',
    image: 'https://via.placeholder.com/400x250',
  },
  // Add more demo cars as needed
];

const CarSearch = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
  const [transmission, setTransmission] = useState('');
  const [location, setLocation] = useState('');
  const [filteredCars, setFilteredCars] = useState(demoCars);

  // Sample data for filters
  const carMakes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Audi'];
  const carModels = ['Corolla', 'Civic', 'Mustang', 'X5', 'A4'];
  const carYears = ['2024', '2023', '2022', '2021', '2020'];
  const carColors = ['Red', 'Blue', 'Black', 'White', 'Gray'];
  const carTransmissions = ['Automatic', 'Manual'];
  const carLocations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

  // Filter cars based on user input
  const handleSearch = () => {
    const filtered = demoCars.filter(car => {
      return (
        (make === '' || car.make === make) &&
        (model === '' || car.model === model) &&
        (year === '' || car.year.toString() === year) &&
        (price === '' || car.price <= price) &&
        (mileage === '' || car.mileage <= mileage) &&
        (color === '' || car.color === color) &&
        (transmission === '' || car.transmission === transmission) &&
        (location === '' || car.location === location)
      );
    });
    setFilteredCars(filtered);
  };

  return (
    <Box
      maxWidth="1000px"
      mx="auto"
      mt={8}
      p={6}
      boxShadow="lg"
      borderRadius="md"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Find Your Perfect Car
      </Heading>

      {/* Search Filters */}
      <Stack spacing={4}>
        <Input
          placeholder="Search by keyword (e.g., 'Sedan')" size="lg" borderColor="teal.500"/>

        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <Select
            placeholder="Select Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            borderColor="teal.500"
            flex="1"
          >
            {carMakes.map((make, index) => (
              <option key={index} value={make}>{make}</option>
            ))}
          </Select>

          <Select
            placeholder="Select Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            borderColor="teal.500"
            flex="1"
          >
            {carModels.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </Select>
        </Flex>

        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <Select
            placeholder="Select Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            borderColor="teal.500"
            flex="1"
          >
            {carYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </Select>

          <Input
            placeholder="Max Price ($)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            borderColor="teal.500"
            flex="1"
          />
        </Flex>

        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <Input
            placeholder="Max Mileage (km)"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            borderColor="teal.500"
            flex="1"
          />

          <Select
            placeholder="Select Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            borderColor="teal.500"
            flex="1"
          >
            {carColors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </Select>
        </Flex>

        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <Select
            placeholder="Select Transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            borderColor="teal.500"
            flex="1"
          >
            {carTransmissions.map((trans, index) => (
              <option key={index} value={trans}>{trans}</option>
            ))}
          </Select>

          <Select
            placeholder="Select Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            borderColor="teal.500"
            flex="1"
          >
            {carLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </Select>
        </Flex>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleSearch}
          w="full"
        >
          Search
        </Button>
      </Stack>

      <Divider my={8} />

      {/* Search Results - Demo Cars */}
      <Box>
        <Heading as="h3" size="md" mb={4}>
          Search Results
        </Heading>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {filteredCars.length === 0 ? (
            <Text>No results found. Try adjusting your search filters.</Text>
          ) : (
            filteredCars.map(car => (
              <GridItem
                key={car.id}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                boxShadow="md"
              >
                <Image
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  borderRadius="md"
                  mb={4}
                />
                <Heading as="h4" size="md" mb={2}>
                  {car.make} {car.model}
                </Heading>
                <Text fontSize="sm">Year: {car.year}</Text>
                <Text fontSize="sm">Price: ${car.price}</Text>
                <Text fontSize="sm">Mileage: {car.mileage} km</Text>
                <Text fontSize="sm">Color: {car.color}</Text>
                <Text fontSize="sm">Transmission: {car.transmission}</Text>
                <Text fontSize="sm">Location: {car.location}</Text>
              </GridItem>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CarSearch;
