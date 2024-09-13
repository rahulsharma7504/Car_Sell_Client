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
    IconButton,
  } from "@chakra-ui/react";
  import { FaPhone, FaRegCalendarAlt } from "react-icons/fa";
  
  const CarDetailPage = () => {
    return (
      <Box p={5}>
        {/* Header Section */}
        <Flex direction="column" align="center" mb={5}>
          <Heading as="h1" size="2xl" textAlign="center">
            Car Model Name
          </Heading>
          <Text fontSize="lg" color="gray.600">
            ₹ 10,00,000 /- (Price)
          </Text>
        </Flex>
  
        {/* Image Gallery and Car Specifications */}
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          {/* Image Gallery */}
          <Box>
            <Image
              src="" alt="Car Image"
              borderRadius="lg"
              mb={4}
            />
            <SimpleGrid columns={3} spacing={2}>
              <Image src="" alt="Car Image 1" />
              <Image src="car-image-url2" alt="Car Image 2" />
              <Image src="car-image-url3" alt="Car Image 3" />
            </SimpleGrid>
          </Box>
  
          {/* Car Specifications */}
          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Car Specifications
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Text fontWeight="bold">Make:</Text>
                <Text>Toyota</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Model:</Text>
                <Text>Fortuner</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Year:</Text>
                <Text>2023</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Mileage:</Text>
                <Text>10,000 km</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Fuel Type:</Text>
                <Text>Diesel</Text>
              </GridItem>
              <GridItem>
                <Text fontWeight="bold">Transmission:</Text>
                <Text>Automatic</Text>
              </GridItem>
            </Grid>
          </Box>
        </SimpleGrid>
  
        {/* Dealer Info and User Reviews */}
        <SimpleGrid columns={[1, null, 2]} spacing={8} mt={10}>
          {/* Dealer Information */}
          <Box>
            <Heading as="h2" size="lg" mb={3}>
              Dealer Information
            </Heading>
            <Text fontWeight="bold">Dealer Name:</Text>
            <Text>ABC Motors Pvt. Ltd.</Text>
            <Text fontWeight="bold">Location:</Text>
            <Text>Delhi, India</Text>
            <Text fontWeight="bold">Phone:</Text>
            <Text>+91 9876543210</Text>
          </Box>
  
          {/* User Reviews */}
          <Box>
            <Heading as="h2" size="lg" mb={3}>
              User Reviews
            </Heading>
            <Stack spacing={4}>
              <Box>
                <Text fontWeight="bold">John Doe</Text>
                <Text color="gray.500">"Great car with amazing features."</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Jane Smith</Text>
                <Text color="gray.500">"Smooth ride and comfortable interior."</Text>
              </Box>
            </Stack>
          </Box>
        </SimpleGrid>
  
        {/* Interaction Section */}
        <Flex justify="center" mt={10}>
          <Button leftIcon={<FaRegCalendarAlt />} colorScheme="teal" mr={4}>
            Schedule Test Drive
          </Button>
          <Button leftIcon={<FaPhone />} colorScheme="blue">
            Contact Dealer
          </Button>
        </Flex>
      </Box>
    );
  };
  
  export default CarDetailPage;
  