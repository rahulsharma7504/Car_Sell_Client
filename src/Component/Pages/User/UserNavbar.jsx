import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'; // You can also replace this with React-Bootstrap's Navbar.Toggle
import { useAuth } from '../../Context/AuthContext';
import styles from '../Styles/UserNavbar.module.css';
import { Avatar } from '@chakra-ui/react';

const UserNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('userData'))?.user;
    setUserData(User);
  }, []);

  // Toggle the mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="md" className={styles.navbar}>
      {/* Navbar Title */}
      <Navbar.Brand as={Link} to="/" className={styles.navbarTitle}>
        Car Shop
      </Navbar.Brand>

      {/* Hamburger Menu Button for mobile */}
      <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleMenu} className={styles.hamburgerButton}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Navbar.Toggle>

      {/* Desktop Navigation Links */}
      <Navbar.Collapse id="navbar-nav" className={isOpen ? styles.show : ''}>
        <Nav className="ml-auto">
          <Nav.Link as={Button} variant="link" onClick={() => navigate('/user-profile')} className={styles.navLink}>
            User Profile
          </Nav.Link>
          <Nav.Link as={Button} variant="link" onClick={() => navigate('/cart')} className={styles.navLink}>
            Cart
          </Nav.Link>
          <Nav.Link as={Button} variant="link" onClick={() => logout()} className={styles.navLink}>
            Log-Out
          </Nav.Link>
          <Avatar
            size="md"
            name={userData?.name || 'User Name'}
            src={userData?.image || 'https://bit.ly/broken-link'}
            className={styles.avatar}
            style={{ border: '2px solid transparent' }}
            onMouseEnter={(e) => e.target.style.border = '2px solid teal'}
            onMouseLeave={(e) => e.target.style.border = '2px solid transparent'}
          />
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
};

export default UserNavbar;
