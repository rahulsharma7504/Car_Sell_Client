import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import EndPoint from "../Auth/Endpoint";
import { useToast } from "@chakra-ui/react";


const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const toast=useToast()

    async function handleCart(carId, dealerId, userId) {
        const data={
            carId: carId,
            dealerId: dealerId,
            userId: userId
        }
        console.log(data)
        const res = await axios.post(`${EndPoint.URL}/users/cart`, data);
        if(res.status==200){
            toast({
                title: res.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })            
        }else{
            toast({
                title: res.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <CartContext.Provider value={{ handleCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext)