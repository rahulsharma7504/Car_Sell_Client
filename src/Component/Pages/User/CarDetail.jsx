import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import EndPoint from '../../Auth/Endpoint';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  SimpleGrid,
  Stack,
  Grid,
  GridItem,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { FaPhone, FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../Context/AuthContext';
import FeedBack from './FeedBack';

const CarDetailPage = () => {
  const toast = useToast()
  const { user } = useAuth()
  const [startDate, setStartDate] = useState(null); // State for selected date
  const [isOpen, setIsOpen] = useState(false); // State to open/close date picker

  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`${EndPoint.URL}/users/car-details/${id}`);
      setCarDetails(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  //For Date-Picker
  const handleDateChange = (date) => {

    setStartDate(date); // Set selected date
    handleBooking()
    setIsOpen(false); // Close the date picker after selection
  };
  //For Booking a Car
  const handleBooking = async () => {
    try {

     
      // Check if the car is already booked on the selected date
      // Add your booking logic here
      const User = JSON.parse(localStorage.getItem('userData'))?.user
      const bookingDetails = {
        carId: id,
        dealerId: carDetails.id,
        userId: User.id,
        requested_date: startDate,
        customer_name: User.username,
        car_name: carDetails?.name
      }
      const res = await axios.post(`${EndPoint.URL}/users/book-car`, bookingDetails);
      if (res.status === 200) {
        toast({
          title: res.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

      }


    }

    catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleClick = (phone) => {
    window.location.href = `https://wa.me/${phone}?text=Hello!%20I%20want%20to%20connect%20with%20you.`;
  };

  return (
    <Box p={5}>
      <Flex direction="column" align="center" mb={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          {carDetails?.name}
        </Heading>
        <Text fontSize="lg" color="gray.600">
          ₹ {carDetails?.price} /- (Price)
        </Text>
      </Flex>

      <SimpleGrid columns={[1, null, 2]} spacing={8}>
        <Box>
          <Image
            src={carDetails?.image_url ? JSON.parse(carDetails.image_url)[0] : ""}
            alt="Car Image"
            borderRadius="lg"
            mb={4}
          />
          <SimpleGrid columns={3} spacing={2}>
            {carDetails?.image_url && JSON.parse(carDetails.image_url).slice(1).map((url, index) => (
              <Image key={index} src={url} alt={`Car Image ${index + 1}`} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={3}>
            Car Specifications
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Make:</Text>
              <Text>{carDetails?.name}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Year:</Text>
              <Text>{carDetails?.year}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Features:</Text>
              <Stack spacing={2}>
                {carDetails?.features &&
                  JSON.parse(carDetails.features).map((feature, index) => (
                    <Badge key={index} colorScheme="blue">
                      {feature}
                    </Badge>
                  ))}
              </Stack>
            </GridItem>
          </Grid>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={[1, null, 2]} spacing={8} mt={10}>
        <Box>
          <Heading as="h2" size="lg" mb={3}>
            Dealer Information
          </Heading>
          <Text fontWeight="bold">Dealer Name:</Text>
          <Text>{carDetails?.username}</Text>
          <Text fontWeight="bold">Location:</Text>
          <Text>{carDetails?.address}</Text>
          <Text fontWeight="bold">Phone:</Text>
          <Text>+91 {carDetails?.contact_number}</Text>
        </Box>
        <FeedBack FeedBack={{ carId:id,dealerId:carDetails?.dealer_id  }} />

      </SimpleGrid>

      <Flex justify="start" mt={10}>
        <Button leftIcon={<FaRegCalendarAlt />} onClick={() => setIsOpen(!isOpen)} colorScheme="teal" mr={4}>
          Schedual test-Drive
        </Button>
        {isOpen && (
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            inline
          />
        )}
        <Button leftIcon={<FaPhone />} onClick={()=>handleClick(carDetails.contact_number)} colorScheme="blue">
          Contact Dealer
        </Button>
      </Flex>
    </Box>
  );
};

export default CarDetailPage;
