import axios from "axios";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import EndPoint from "../Auth/Endpoint";
import { useToast } from "@chakra-ui/react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const User = JSON.parse(localStorage.getItem("userData"))?.user;

    const [cartData, setCartData] = useState([]);
    const toast = useToast();

    // Fetch cart details with useCallback to memoize the function
    const handleCartDetails = useCallback(async () => {
        try {
            const res = await axios.get(`${EndPoint.URL}/users/cart-details/${User?.id}`);
            setCartData(res?.data || []);
            console.log("Cart data loaded:", res.data);
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

    // Load cart details when the component mounts
    useEffect(() => {
        if (User) {
            handleCartDetails();
        }
    }, []);

    return (
        <CartContext.Provider value={{ handleCart, handleCartDetails, cartData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
