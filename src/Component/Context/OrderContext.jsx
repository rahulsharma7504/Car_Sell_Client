import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import EndPoint from "../Auth/Endpoint";
import { Toast } from "bootstrap";
import { useToast } from "@chakra-ui/react";
import { useAuth } from '../Context/AuthContext';


const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const toast = useToast();
  const [orderData, setOrderData] = useState(null); // Initially null


const fetchOrders = async () => {
  try {
    const dealerId = JSON.parse(localStorage.getItem('userData'))?.dealer?.id;
    const res = await axios.get(`${EndPoint.URL}/dealers/orders/${dealerId}`);
    setOrderData(res.data);
  } catch (error) {
   
    console.error("Error fetching orders:", error);
  }
  }
  useEffect(()=>{
    fetchOrders()
  },[])
 

  



  const updateStatus = async (order_id, status, userId, carId) => {
    try {

      const data = {
        order_id: order_id,
        status: status,
        user_id: userId,
        car_id: carId,
      };
      const res = await axios.post(`${EndPoint.URL}/users/payment-status`, data);
      toast({
        title: res.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: 'Error updating order status.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

    }
  }


  const handlePayment = async (item) => {
    try {
      
      const User = JSON.parse(localStorage.getItem("userData"))?.user;
      // 1. Create an order from the backend
      const response = await axios.post(`${EndPoint.URL}/users/make-payment`, {
        amount: item.price, // Pass amount here
        currency: 'INR',
        userId: item.user_id,
        carId: item.id,
        dealerId: item.dealer_id
      });

      const { notes, amount, currency } = response.data.order;

      // 2. Open Razorpay checkout
      const options = {
        key:  process.env.REACT_APP_RAZORPAY_KEY, // Add your Razorpay key here
        amount: amount,
        currency: currency,
        name: 'R.Sharma Production',
        description: 'Test Transaction',
        userId:notes.userId,
        handler: async function (response) {
          // Payment success, send details to backend for verification
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: item.user_id,
            carId: item.id,
            amount: item.price,
          };

          // Send payment details to backend
          await axios.post(`${EndPoint.URL}/users/verify-payment`, paymentDetails);
          alert('Payment Successful');
        },
        prefill: {
          name: User.username,
          email: User.email,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };


  

  return (
    <OrderContext.Provider value={{  updateStatus, handlePayment, orderData }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook for accessing the OrderContext
export const useOrder = () => useContext(OrderContext);
