import { createContext, useContext, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Function to fetch payment approval request data
  const ApprovalRequestData = async () => {
    try {
      const res = await axios.get(`${EndPoint.URL}/users/payment-approval-request`);
      return res.data;
    } catch (error) {
      console.error("Error fetching payment approval requests:", error);
      throw error; // Re-throw to allow consumers to handle it if needed
    }
  };

  return (
    <OrderContext.Provider value={{ ApprovalRequestData }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook for accessing the OrderContext
export const useOrder = () => useContext(OrderContext)
