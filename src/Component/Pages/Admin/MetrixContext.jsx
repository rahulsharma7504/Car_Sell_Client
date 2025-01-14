import { createContext, useContext, useEffect, useState } from "react";
import EndPoint from "../../Auth/Endpoint";
import axios from "axios";

const MatrixContext = createContext();

const MatrixProvider = ({ children }) => {
    const [totelUser, setTotelUser] = useState(0);
    const [totelDealer, setTotelDealer] = useState(0);
    const [totelCar, setTotelCar] = useState(0);
    const [totelPending, setTotelPending] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state to manage the loading indicator

    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;

    const getMetrix = async () => {
        try {
            const res = await axios.get(`${EndPoint.URL}/users/all-matrix`);
            const { data } = res;
            console.log(data);
            setTotelUser(data.usersCount.usersCount);
            setTotelDealer(data.dealersCount.dealersCount);
            setTotelCar(data.carsCount.carsCount);
            setTotelPending(data.pendingDealer.pendingDealer);
        } catch (error) {
            console.error("Error fetching matrix data:", error);
            // Handle the error case, you could display a message or use a toast notification
        } finally {
            setLoading(false); // Set loading to false after data is fetched or error occurs
        }
    };

    useEffect(() => {
        if (role === 'admin') {
            getMetrix(); 
        } else {
            setLoading(false); // If the role is not admin, stop loading
        }
    }, [role]); 
    return (
        <MatrixContext.Provider value={{ totelUser, totelDealer, totelCar, totelPending, getMetrix, setTotelUser, setTotelDealer, setTotelCar, setTotelPending, loading }}>
            {children}
        </MatrixContext.Provider>
    );
};

export const useMatrix = () => useContext(MatrixContext);

export default MatrixProvider;
