import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import EndPoint from "../Auth/Endpoint";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "./AuthContext";


const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const User = JSON.parse(localStorage.getItem('userData'))?.user

    const [cartData,setCartData]=useState([]);
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
            handleCartDetails()          
        }else{
            toast({
                title: res.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    useEffect(()=>{
        handleCartDetails();
    },[]) 
    const handleCartDetails=async()=>{
        try {

        const res=await axios.get(`${EndPoint.URL}/users/cart-details/${User.id}`);
                setCartData(res?.data);
            
        } catch (error) {
            toast({
                title:'!! Faild to load',
                isClosable:true,
                duration:1000,
                status:'error'
            })
            
        }


    }
    return (
        <>
            <CartContext.Provider value={{ handleCart,handleCartDetails, cartData }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext)