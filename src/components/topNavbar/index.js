import React, { useState, useEffect } from 'react';
import {
  Flex,
  IconButton,
  useColorMode,
  Icon,
  Input,
  Button,
  HStack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { MdMenu } from 'react-icons/md';
import { useAuth } from '@components/auth';
import { useAuthModal } from '@components/auth/authModal';
import { FcGoogle } from 'react-icons/fc';
import api from '@api';

const TopNavbar = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.900' };
  const auth = useAuth();
  const authModal = useAuthModal();

  const registerWithGoogle = () => {
    api.auth.registerUserWithGoogle().then((response) => {
      console.log('registered', response);
    })
  }


  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      position="sticky"
      top="0"
      width="100%"
      px="2"
      py="2"
      bg={bgColor[colorMode]}
      boxShadow="base"
      zIndex="100"
    >
      <IconButton variant="ghost" aria-label="Search" icon={<StarIcon />} />

      <Input flex="3" placeholder="Search for lists, foods, users" borderColor="gray.200" />

      <IconButton
        variant="ghost"
        aria-label="Menu"
        icon={<Icon as={MdMenu} marginBottom="1" w={6} h={6} />}
        display={{ base: 'flex', md: 'none' }}
      />

      {auth.user ? (
        <HStack display={{ base: 'none', md: 'flex' }} pl="5px">
          <Button >Add food</Button>
          <Avatar size="sm" name={auth.user.displayName} src={auth.user.photoURL} />
        </HStack>
      ) : (
        <HStack display={{ base: 'none', md: 'flex' }}>
          <Button variant="ghost" onClick={authModal.login.onOpen}>
            Login
          </Button>
          <Button colorScheme="green" onClick={authModal.register.onOpen}>
            Join free
          </Button>
        </HStack>
      )}

      <Modal isOpen={authModal.register.isOpen} onClose={authModal.register.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button w="100%" leftIcon={<FcGoogle />} onClick={registerWithGoogle}>
              Register with Google
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={authModal.login.isOpen} onClose={authModal.login.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button w="100%" leftIcon={<FcGoogle />}>
              Login with Google
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default TopNavbar;