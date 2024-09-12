import { createContext, useContext, useState } from "react";

const MatrixContext = createContext();

const MatrixProvider = ({ children }) => {
    const [totelUser, setTotelUser] = useState(0);
    const [totelDealer, setTotelDealer] = useState(0);
    const [totelCar, setTotelCar] = useState(0);
    const [totelPending, setTotelPending] = useState(0);

    return (
        <MatrixContext.Provider value={{ totelUser, totelDealer, totelCar, totelPending, setTotelUser, setTotelDealer, setTotelCar, setTotelPending }}>
            {children}
        </MatrixContext.Provider>
    );
};

export const useMatrix = () => useContext(MatrixContext);

export default MatrixProvider;
