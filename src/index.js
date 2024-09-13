import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MatrixProvider from './Component/Pages/Admin/MetrixContext'
import DealerProvider from './Component/Pages/Dealer/DealerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ChakraProvider>
        <MatrixProvider>
            <DealerProvider>
                <App />
            </DealerProvider>
        </MatrixProvider>

    </ChakraProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
