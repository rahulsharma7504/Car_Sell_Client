import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import EndPoint from "../Auth/Endpoint";
import { useToast } from "@chakra-ui/react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartPending, setCartPending] = useState([]); // Track cart pending status

    const User = JSON.parse(localStorage.getItem("userData"))?.user

    const [cartData, setCartData] = useState([]);
    const toast = useToast();

    // Fetch cart details with useCallback to memoize the function
    const handleCartDetails = useCallback(async () => {
        try {
            const res = await axios.get(`${EndPoint.URL}/users/cart-details/${User?.id}`);
            setCartData(res?.data || []);
        } catch (error) {
            toast({
                title: "Failed to load cart details",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    }, []);

    // Add item to cart and refresh cart details
    const handleCart = async (carId, dealerId, userId) => {
        const data = {
            carId,
            dealerId,
            userId,
        };
        try {
            const res = await axios.post(`${EndPoint.URL}/users/cart`, data);
            if (res.status === 200) {
                toast({
                    title: res.data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                // Refresh cart data after adding an item
                handleCartDetails();
            } else {
                toast({
                    title: res.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Failed to add item to cart",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    // Get all pending requests by Car-Dealer
    const cartPendingRequests = async () => {
        try {
            const dealerId = JSON.parse(localStorage.getItem("userData"))?.dealer?.id
            const res = await axios.get(`${EndPoint.URL}/dealers/cart-request/${dealerId}`);
            setCartPending(res.data);
            console.log(res.data);

        } catch (error) {
            console.error("Error fetching cart pending requests:", error);
        }

    }

    // For Approva; cart details by Car-Dealer

    const updateCartRequest=async(request, status)=> {
        try {
            const res = await axios.put(`${EndPoint.URL}/dealers/cart-request/${request.id}`, { data:request, status: status });
            toast({
                title: res.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });         
            //Refresh cart data after Update Status
            cartPendingRequests();

        } catch (error) {
            toast({
                title: "Failed to update request",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }

    }

    // Delete cart item
    const handleDeleteCartItem = async (itemId) => {
        try {
            const res = await axios.delete(`${EndPoint.URL}/users/cart/${itemId}`);
            toast({
                title: res.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            // Refresh cart data after deleting an item
            handleCartDetails();
        } catch (error) {
            toast({
                title: "Failed to delete item from cart",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };
    useEffect(() => {
        cartPendingRequests();
    }, []);



    useEffect(() => {
        if (User) {
            handleCartDetails();
        }
    }, []);

    // For Approva; cart details by Car-Dealer

    return (
        <CartContext.Provider value={{ handleCart, updateCartRequest, cartPending, handleDeleteCartItem, cartPendingRequests, handleCartDetails, cartData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
