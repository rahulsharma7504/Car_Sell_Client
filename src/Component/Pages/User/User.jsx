import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  Text,
  Select,
  SimpleGrid,
  Image,
  VStack,
  Stack,
  Badge,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import EndPoint from '../../Auth/Endpoint';
import { Link, useParams , useNavigate} from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const CarListing = () => {
  const {user}=useAuth()
  const navigate=useNavigate();
  const [carListing, setCarListing] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOption, setSortOption] = useState('');

  // Fetch car data from API
  useEffect(() => {
    fetch(`${EndPoint.URL}/users/all-cars`)
      .then(response => response.json())
      .then(data => {
        setCarListing(data.cars);
        setFilteredCars(data.cars); // Update filteredCars when data is fetched
      })
      .catch(error => console.error('Error:', error));
  }, [user]); 

  // Search Function
  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value);
    setFilteredCars(
      carListing.filter((car) => {
        return car.name.toLowerCase().includes(value) || car.price.toLowerCase().includes(value);
      })
    );
  };

  // Sorting Function
  const handleSort = (e) => {
    const value = e.target.value;
    setSortOption(value);

    const sortedCars = [...filteredCars].sort((a, b) => {
      if (value === 'lowToHigh') {
        return a.price - b.price;
      } else if (value === 'highToLow') {
        return b.price - a.price;
      } else {
        return 0; // No sorting
      }
    });
    setFilteredCars(sortedCars);
  };
const CarDetailToRedirect=(carId)=>{
  navigate(`/car-detail/${carId}`);
}
  return (
    <Box>
      {/* Search Bar */}
      <Box bg="gray.100" py={6} px={8}>
        <Heading mb={4}>Find Your Dream Car</Heading>
        <InputGroup maxW="600px">
          <Input
            placeholder="Search by Price && Name..."
            value={search}
            onChange={handleSearch}
          />
          <InputRightElement>
            <IconButton icon={<SearchIcon />} aria-label="Search" />
          </InputRightElement>
        </InputGroup>
      </Box>

      {/* Filter and Sorting Options */}
      <Flex justify="space-between" px={8} py={4}>
        <Text fontSize="xl">Available Cars {filteredCars.length}</Text>
        <Select placeholder="Sort by Price" maxW="200px" onChange={handleSort} value={sortOption}>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </Select>
      </Flex>

      {/* Car Listings */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} px={8}>
        {filteredCars.map((car) => (
          <Box
            key={car.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image src={JSON.parse(car.image_url)[1]} alt={`${car.name} ${car.model}`} />
            {
            }
            <Box p={6}>
              <VStack align="start" spacing={3}>
                <Badge colorScheme="blue">{car.name}</Badge>
                <Heading size="md">{car.Year}</Heading>
                <Text fontWeight="bold" color="gray.600">
                  ₹{car.price.toLocaleString()}
                </Text>
                <Button onClick={()=>CarDetailToRedirect(car.id)} colorScheme="blue" mt={3}>
                  View Details
                </Button>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CarListing;
