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
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import { useAuth } from '@components/auth';
import { useAuthModal } from '@components/auth/authModal';
import { FcGoogle } from 'react-icons/fc';
import api from '@api';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Searchbar from '@components/search/Searchbar';
import MobileSearchbar from '@components/search/MobileSearchbar';

const TopNavbar = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.900' };
  const auth = useAuth();
  const authModal = useAuthModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const registerWithGoogle = () => {
    api.auth.authenticateUserWithGoogle().then((response) => {
      console.log('registered', response);
      authModal.register.onClose();
    });
  };

  const loginWithGoogle = () => {
    api.auth.authenticateUserWithGoogle().then((response) => {
      console.log('login', response);
      authModal.login.onClose();
    });
  };

  const logout = () => {
    api.auth.logout().then(() => {
      console.log('logout done');
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', '', {});
    });
  };

  const routeToAddPage = () => {
    router.push('/add');
  };

  const routeToListsPage = () => {
    router.push('/lists');
  };

  const routeToHomePage = () => {
    router.push('/');
  };

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
      height="56px"
    >
      <IconButton
        variant="ghost"
        aria-label="Search"
        icon={<Image src="/ssk.png" width="35px" height="35px" />}
        onClick={routeToHomePage}
      />

      <Searchbar display={{ base: 'none', md: 'flex' }} />
      <MobileSearchbar display={{ base: 'flex', md: 'none' }} />

      <IconButton
        variant="ghost"
        aria-label="Menu"
        icon={<Icon as={MdMenu} marginBottom="1" w={6} h={6} />}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
      />

      {auth.user ? (
        <>
          <HStack display={{ base: 'none', md: 'flex' }} pl="5px">
            <Button variant="ghost" onClick={routeToHomePage}>
              Nearby
            </Button>
            <Button variant="ghost" onClick={routeToListsPage}>
              MyLists
            </Button>
          </HStack>
          <Divider orientation="vertical" display={{ base: 'none', md: 'flex' }} />
        </>
      ) : null}

      {auth.user ? (
        <HStack display={{ base: 'none', md: 'flex' }} pl="5px">
          <Button onClick={routeToAddPage}>Add food</Button>
          <Menu isLazy>
            <MenuButton as={Avatar} size="sm" name={auth.user.displayName} src={auth.user.photoURL} />
            <MenuList>
              <MenuItem>View Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
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
            <Button w="100%" leftIcon={<FcGoogle />} onClick={loginWithGoogle}>
              Login with Google
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>ShiShiKan</DrawerHeader>

            <DrawerBody>
              <VStack>
                <Button variant="ghost" w="100%" justifyContent="start">
                  Goes somewhere
                </Button>
                <Divider />
                {auth.user ? (
                  <Button variant="ghost" w="100%" justifyContent="start" onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" w="100%" justifyContent="start" onClick={authModal.login.onOpen}>
                      Login
                    </Button>
                    <Button colorScheme="green" w="100%" justifyContent="start" onClick={authModal.register.onOpen}>
                      Join free
                    </Button>
                  </>
                )}
                ƒ
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};

export default TopNavbar;
