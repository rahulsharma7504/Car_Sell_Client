import React from 'react';
import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  Heading,
  Divider,
  useToast
} from '@chakra-ui/react';
import { useCart } from '../../Context/CartContext';
import axios from 'axios';
import EndPoint from '../../Auth/Endpoint';
import { useOrder } from '../../Context/OrderContext';

const CartPage = () => {
  const { cartData } = useCart();
  const {handlePayment}= useOrder()
  const toast = useToast();
  const User = JSON.parse(localStorage.getItem("userData"))?.user;


  // Request payment approval from the dealer
  const handleRequestApproval = async (item) => {
    try {
      const res = await axios.post(`${EndPoint.URL}/users/payment-approve`, {
        carId: item.id,
        dealerId: item.dealer_id,
        userId: User.id,
      });

      if (res.status === 201 || 200) {
        toast({
          title: res.data.message,
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.res.data.message,
        description: 'Failed to request approval.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle payment after approval
  // const handlePayment = async (item) => {
  //   try {
  //     const res = await axios.post(`/api/payment/make-payment`, {
  //       carId: item.id,
  //       dealerId: item.dealer_id,
  //       userId: item.user_id,
  //       amount: item.price,
  //     });

  //     if (res.status === 200) {
  //       toast({
  //         title: 'Payment Successful',
  //         description: `Payment of $${item.price} for ${item.name} is complete.`,
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: 'Payment failed.',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading mb={4} textAlign="center">Your Cart</Heading>

      <Box display="flex" flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
        {/* Cart Items Section */}
        <Box flex="2" p={4} boxShadow="lg" rounded="md" bg="white">
          {cartData.map((item) => (
            <Stack
              key={item?.id}
              direction="row"
              spacing={4}
              align="center"
              mb={4}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              p={4}
            >
              <Image boxSize="100px" src={JSON.parse(item?.image_url)[0]} alt={item.name} />
              <Box>
                <Text fontWeight="bold">{item?.name}</Text>
                <Text color="gray.500">${item?.price}</Text>
                <Text>Status: {item?.status || 'Pending Approval'}</Text>
              </Box>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleRequestApproval(item)}
                isDisabled={item.status === 'Approve' || item.status === 'approve'}
              >
                Request Approval
              </Button>

              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => handlePayment(item)}
                isDisabled={item.status.toLowerCase() !== 'approve'}
              >
                Make Payment
              </Button>



            </Stack>
          ))}
        </Box>

        {/* Order Summary Section */}
        <Box flex="1" p={6} boxShadow="lg" rounded="md" bg="white">
          <Heading size="md" mb={4}>Order Summary</Heading>
          <Divider mb={4} />
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Total: ${cartData.reduce((acc, item) => acc + parseFloat(item.price), 0)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
