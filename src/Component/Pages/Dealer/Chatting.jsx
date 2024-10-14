import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  HStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";

const Chatting = () => {
  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box w="300px" bg="gray.800" color="white">
        <Flex
          direction="column"
          h="100%"
          py={5}
          px={3}
          justifyContent="space-between"
        >
          <Box>
            <Heading mb={4} size="md">
              Chat Groups
            </Heading>
            <InputGroup mb={4}>
              <Input placeholder="Search" bg="gray.700" />
              <InputRightElement>
                <IconButton
                  size="sm"
                  icon={<SearchIcon />}
                  aria-label="Search"
                />
              </InputRightElement>
            </InputGroup>
            <VStack spacing={4} align="stretch">
              {/* Contacts or Group List */}
              <Flex align="center" p={3} bg="gray.700" borderRadius="md">
                <Avatar size="sm" name="Group 1" />
                <Text ml={3}>Group 1</Text>
              </Flex>
              <Flex align="center" p={3} bg="gray.700" borderRadius="md">
                <Avatar size="sm" name="Group 2" />
                <Text ml={3}>Group 2</Text>
              </Flex>
              <Flex align="center" p={3} bg="gray.700" borderRadius="md">
                <Avatar size="sm" name="Group 3" />
                <Text ml={3}>Group 3</Text>
              </Flex>
            </VStack>
          </Box>
          <Box>
            <Divider mb={3} />
            <Flex align="center" p={3}>
              <Avatar size="sm" name="User" />
              <Text ml={3}>Logged In User</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Chat Area */}
      <Flex flex={1} direction="column">
        {/* Header */}
        <Flex bg="gray.100" align="center" p={4} borderBottom="1px" borderColor="gray.200">
          <Avatar size="sm" name="Group 1" />
          <Text ml={3} fontWeight="bold">
            Group 1
          </Text>
        </Flex>

        {/* Chat Messages */}
        <Flex flex={1} direction="column" p={4} overflowY="scroll">
          <VStack spacing={4} align="start">
            <HStack>
              <Avatar size="sm" />
              <Box bg="blue.100" p={3} borderRadius="md">
                <Text>User 1: Hello!</Text>
              </Box>
            </HStack>
            <HStack alignSelf="flex-end">
              <Box bg="gray.200" p={3} borderRadius="md">
                <Text>Logged In User: Hi there!</Text>
              </Box>
              <Avatar size="sm" />
            </HStack>
          </VStack>
        </Flex>

        {/* Message Input */}
        <Box p={4} bg="gray.50">
          <InputGroup>
            <Input placeholder="Type a message..." />
            <InputRightElement>
              <IconButton
                icon={<ArrowForwardIcon />}
                colorScheme="blue"
                aria-label="Send"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Chatting;
