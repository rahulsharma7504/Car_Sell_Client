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
              src="data:image/jpeg;base64,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"
              alt="Car Image"
              borderRadius="lg"
              mb={4}
            />
            <SimpleGrid columns={3} spacing={2}>
              <Image src="data:image/jpeg;base64,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" alt="Car Image 1" />
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
  