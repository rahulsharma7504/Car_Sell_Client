import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Input,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import axios from 'axios';
import EndPoint from '../../Auth/Endpoint';
import {useAuth} from '../../Context/AuthContext'
function ManageUsers() {
  const { user } = useAuth();  // Get user data from context
  const [users, setUsers] = useState([]);  // Initial state as empty array
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchUsers();

  }, [toast]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${EndPoint.URL}/users/all-users/${user.data.user.id}`);
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    } catch (error) {
      toast({ title: 'Error fetching users.', status: 'error' });
    }
  };


  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    onOpen();
  };

  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`${EndPoint.URL}/users/delete-user/${id}`);
      setUsers(users.filter(user => user.id !== id));
      toast({ title: res.data.message, status: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting user.', status: 'error' });
    }
  };

  const handleResetPasswordClick = async (id) => {
    // Call API to reset user password
    toast({ title: 'Password reset link sent.', status: 'info' });
  };

  const handleSave = async () => {
    try {
      // Call API to update user details
      const res = await axios.put(`${EndPoint.URL}/users/update-user/${selectedUser.id}`, selectedUser);
      setEditMode(false);
      fetchUsers();

      onClose();
      toast({ title: res.data.message, status: 'success' });
    } catch (error) {
      toast({ title: 'Error updating user.', status: 'error' });
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={5}>
      <Stack spacing={4} mb={4}>
        <Input
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      <Table variant="simple">
        <TableCaption>User Management</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map(user => (
            <Tr key={user.id}>
              <Td>{user.username}</Td>  {/* Assuming your API returns 'username' */}
              <Td>{user.email}</Td>
              <Td>{user.status}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditClick(user)}
                  mr={2}
                >
                  <EditIcon />
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteClick(user.id)}
                  mr={2}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleResetPasswordClick(user.id)}
                >
                  <ViewIcon />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Edit User' : 'User Details'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={selectedUser?.username || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
              />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="status" mb={4}>
              <FormLabel>Status</FormLabel>
              <Select
                value={selectedUser?.status || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ManageUsers;
