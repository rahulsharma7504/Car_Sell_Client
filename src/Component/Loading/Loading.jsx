import React from 'react';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa'; // React Icon for car

import styles from '../Pages/Styles/Loading.module.css'; // Import custom CSS module

const LoadingComponent = () => {
  return (
    <Center height="100vh">
      <Box className={styles.loadingContainer}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
          className={styles.spinner}
        />
        <Box className={styles.iconContainer}>
          <FaCarSide size={60} color="#3182ce" />
        </Box>
        <p className={styles.loadingText}>Loading Cars...</p>
      </Box>
    </Center>
  );
};

export default LoadingComponent;
