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
  Badge,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import EndPoint from '../../Auth/Endpoint';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import styles from '../Styles/User.module.css';

const CarListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carListing, setCarListing] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOption, setSortOption] = useState('');

  // Fetch car data from API
  useEffect(() => {
    fetch(`${EndPoint.URL}/users/all-cars`)
      .then((response) => response.json())
      .then((data) => {
        setCarListing(data.cars);
        setFilteredCars(data.cars); // Update filteredCars when data is fetched
      })
      .catch((error) => console.error('Error:', error));
  }, [user]);

  // Search Function
  const handleSearch = (e) => {
    const value = e.target.value;
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

  const CarDetailToRedirect = (carId) => {
    navigate(`/car-detail/${carId}`);
  };

  return (
    <Box className={styles.container}>
      {/* Search Bar */}
      <Box className={styles.header}>
        <Heading mb={4}>Find Your Dream Car</Heading>
        <InputGroup className={styles.searchInput}>
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
      <Flex className={styles.filterContainer}>
        <Text className="text mx-4" >Available Cars {filteredCars.length}</Text>
        <Select className={styles.sortSelect} placeholder="Sort by Price" onChange={handleSort} value={sortOption}>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </Select>
      </Flex>

      {/* Car Listings */}
      <SimpleGrid className={styles.cardGrid}>
        {filteredCars.map((car) => (
          <Box key={car.id} className={styles.card}>
            <Image className={styles.cardImage} src={JSON.parse(car.image_url)[1]} alt={`${car.name} ${car.model}`} />
            <Box className={styles.cardContent}>
              <VStack align="start" spacing={3}>
                <Badge className={styles.badge}>{car.name}</Badge>
                <Heading size="md">{car.Year}</Heading>
                <Text fontWeight="bold" color="gray.600">
                  ₹{car.price.toLocaleString()}
                </Text>
                <Button onClick={() => CarDetailToRedirect(car.id)} className={styles.viewButton}>
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
