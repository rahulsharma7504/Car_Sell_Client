import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import EndPoint from "../../Auth/Endpoint";

// Create the context
const DealerContext = createContext();

// Create the provider component
const DealerProvider = ({ children }) => {
    const [totalCars, setTotalCars] = useState([]);
    const [totalRequest, setTotalRequest] = useState(4);  // Dummy initial value
    const [totalSales, setTotalSales] = useState(10);     // Dummy initial value

    // Fetch data for total cars when the component mounts
    const TotalCar =  async() => {
        try {
            const id = JSON.parse(localStorage.getItem('userData')).dealer.id;
                const res = await axios.get(`${EndPoint.URL}/dealers/cars/${id}`);
                setTotalCars(res.data.car);
    
           
        } catch (error) {
            console.error('Error fetching total cars:', error.message);
        }
    };
    
    useEffect(() => {
      TotalCar();
    },[]);
    
    console.log(totalCars)

    // Return the context provider with values
    return (
        <DealerContext.Provider 
            value={{ totalCars, totalRequest, totalSales, setTotalCars, setTotalRequest, setTotalSales }}
        >
            {children}
        </DealerContext.Provider>
    );
};

// Hook to access the dealer context
export const useDealer = () => useContext(DealerContext);

export default DealerProvider;
