import React, { useState } from 'react';
import { Box, Image, Text, Stack, Button, Heading, Divider, useStatStyles } from '@chakra-ui/react';
import { useCart } from '../../Context/CartContext';

const CartPage = () => {
    const {cartData,handleCartDetails}=useCart()
  // Sample data for cart items; replace with actual state/props
  

  const totalPrice = cartData.reduce((accumulator, item) => {
    // Parse the price from string to float
    const price = parseInt(item.price);
    return accumulator + price;
  }, 0);
  
  console.log(`Total Price: $${totalPrice.toFixed(2)}`);

  return (
    <Box p={4} maxW="1200px" mx="auto">
        <button onClick={handleCartDetails}>CLick</button>
      <Heading mb={4} textAlign="center">Your Cart</Heading>

      <Box display="flex" flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
        {/* Cart Items Section */}
        <Box flex="2" p={4} boxShadow="lg" rounded="md" bg="white">
          {cartData.map((item) => (
            <Stack
              key={item?.id}
              direction="row"
              spacing={4}
              align="center" mb={4} border="1px" borderColor="gray.200" rounded="md" p={4}> 
          
              <Image boxSize="100px" src={JSON.parse(item?.image_url)[0]} alt={item.name} />
              <Box>
                <Text fontWeight="bold">{item?.name}</Text>
                <Text color="gray.500">${item?.price}</Text>
              </Box>
            </Stack>
          ))}
        </Box>

        {/* Order Summary Section */}
        <Box flex="1" p={6} boxShadow="lg" rounded="md" bg="white">
          <Heading size="md" mb={4}>Order Summary</Heading>
          <Divider mb={4} />
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Total: ${totalPrice}
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            width="100%"
            mt={4}
            onClick={() => alert('Proceed to Payment')}
          >
            Make Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
