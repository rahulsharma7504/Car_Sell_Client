import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import EndPoint from "../Auth/Endpoint";
import { useToast } from "@chakra-ui/react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartPending, setCartPending] = useState([]); // Track cart pending status
    const [cartData, setCartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for the cart
    const [error, setError] = useState(null); // Error state for the cart actions
    const toast = useToast();

    const User = JSON.parse(localStorage.getItem("userData"))?.user;

    // Fetch cart details with useCallback to memoize the function
    const handleCartDetails = async () => {
        setIsLoading(true);
        setError(null); // Reset error before each request
        try {
            const res = await axios.get(`${EndPoint.URL}/users/cart-details/${User?.id}`);
            setCartData(res?.data || []);
        } catch (err) {
            setError("Failed to load cart details");
            toast({
                title: "Failed to load cart details",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Stop loading after the request completes
        }
    };

    // Add item to cart and refresh cart details
    const handleCart = async (carId, dealerId, userId) => {
        setIsLoading(true);
        setError(null); // Reset error before each request
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
        } catch (err) {
            setError("Failed to add item to cart");
            toast({
                title: "Failed to add item to cart",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Stop loading after the request completes
        }
    };

    // Get all pending requests by Car-Dealer
    const cartPendingRequests = async () => {
        setIsLoading(true);
        setError(null); // Reset error before each request
        try {
            const dealerId = JSON.parse(localStorage.getItem("userData"))?.dealer?.id;
            const res = await axios.get(`${EndPoint.URL}/dealers/cart-request/${dealerId}`);
            setCartPending(res.data);
        } catch (err) {
            setError("Failed to fetch pending requests");
            console.error("Error fetching cart pending requests:", err);
        } finally {
            setIsLoading(false); // Stop loading after the request completes
        }
    };

    // For Approval; cart details by Car-Dealer
    const updateCartRequest = async (request, status) => {
        setIsLoading(true);
        setError(null); // Reset error before each request
        try {
            const res = await axios.put(`${EndPoint.URL}/dealers/cart-request/${request.id}`, { data: request, status: status });
            if (res.status === 200) {
                toast({
                    title: res.data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                // Refresh cart data after updating request
                cartPendingRequests();
            }
        } catch (err) {
            setError("Failed to update cart request");
            toast({
                title: "Failed to update cart request",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Stop loading after the request completes
        }
    };

    // Delete cart item
    const handleDeleteCartItem = async (itemId) => {
        setIsLoading(true);
        setError(null); // Reset error before each request
        try {
            const res = await axios.delete(`${EndPoint.URL}/users/cart-delete/${itemId}`);
            toast({
                title: res.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            // Refresh cart data after deleting an item
            handleCartDetails();
        } catch (err) {
            setError("Failed to delete item from cart");
            toast({
                title: "Failed to delete item from cart",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Stop loading after the request completes
        }
    };


    const role = JSON.parse(localStorage.getItem('userData'))?.dealer?.role;
    useEffect(() => {
        if (role === "dealer") {
            cartPendingRequests();
        } else {
            handleCartDetails();
        }
    }, []);

    useEffect(() => {
        if (User) {
            handleCartDetails();
        }
    }, []);

    return (
        <CartContext.Provider value={{
            handleCart,
            updateCartRequest,
            cartPending,
            handleDeleteCartItem,
            cartPendingRequests,
            handleCartDetails,
            cartData,
            isLoading,  // Provide loading state to children
            error        // Provide error state to children
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
