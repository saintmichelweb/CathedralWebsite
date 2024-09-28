import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { TbLogout, TbPasswordUser } from "react-icons/tb";
import stMichelLogo from "../../../assets/Logo.png";

import { useDrawerDisclosure } from "../../../contexts/DrawerDisclosureContext";
import { useUserContext } from "../../../contexts/UserContext";
import CustomModal from "../../../components/ui/CustomModal/CustomModal";
import { Drawer } from "../../../components/layout";
import { SetPasswordBody } from "../../../pages/SetPassword/SetPassword";
import { logout } from "../../../api/auth";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { onOpen } = useDrawerDisclosure();
  const { loggedUser } = useUserContext();
  const [changePasswordPopup, setChangePasswordPopup] =
    useState<boolean>(false);
  const toast = useToast();
  const Navigate = useNavigate()

  const logingOut = async () => {
    await logout()
      .then(() => {
        toast({
          title: "Logout message",
          description: "User successfully logged out",
          status: "success",
        });
        Navigate('/login')
      })
      .catch(() => {
        toast({
          title: "Logout message",
          description: "Error logging out",
          status: "error",
        });
      });
  };

  return (
    <HStack
      as="header"
      w={{ base: "full", lg: "calc(100% - 6rem)" }}
      h="14"
      justify="space-between"
      ml={{ base: "0", lg: "24" }}
      px={{ base: "2", sm: "4", md: "6", lg: "8" }}
      shadow="sm"
      position="fixed"
      bg="primary"
      zIndex="sticky"
    >
      <IconButton
        aria-label="Open sidebar"
        icon={<FiMenu />}
        display={{ base: "flex", lg: "none" }}
        fontSize="22px"
        color="primary"
        bg="transparent"
        _hover={{ bg: "secondary" }}
        onClick={onOpen}
      />

      <Image h="9" alt="Logo" src={stMichelLogo} />
      <Drawer />
      <HStack spacing="4">
        <Popover offset={[-125, 0]}>
          <PopoverTrigger>
            <Button variant="unstyled">
              <Avatar size="sm" bg={"primary"} />
            </Button>
          </PopoverTrigger>

          <PopoverContent shadow="lg" w="72">
            <PopoverHeader
              fontWeight="medium"
              borderColor="gray.100"
              color={"primary"}
            >
              Profile
            </PopoverHeader>

            <PopoverBody display="flex" flexDir="column">
              <HStack spacing="2" p="1.5">
                <Box
                  w="6"
                  h="6"
                  display="flex"
                  justifyItems="center"
                  alignItems="center"
                >
                  <Icon color={"primary"} as={AiOutlineUser} w="6" />
                </Box>
                <Text fontSize="sm" wordBreak="break-all">
                  {loggedUser?.name}
                </Text>
              </HStack>

              <HStack spacing="2" p="1.5">
                <Box
                  w="6"
                  h="6"
                  display="flex"
                  justifyItems="center"
                  alignItems="center"
                >
                  <Icon color={"primary"} as={AiOutlineMail} w="6" />
                </Box>
                <Text fontSize="sm" wordBreak="break-all">
                  {loggedUser?.email}
                </Text>
              </HStack>
              <Button
                variant="unstyled"
                h="auto"
                p="1.5"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  setChangePasswordPopup(true);
                }}
              >
                <HStack spacing="2">
                  <Box
                    w="6"
                    h="6"
                    display="flex"
                    justifyItems="center"
                    alignItems="center"
                  >
                    <Icon color={"primary"} as={TbPasswordUser} w="6" />
                  </Box>
                  <Box as="span" fontSize="sm" fontWeight="normal">
                    Change password
                  </Box>
                </HStack>
              </Button>
              <Button
                variant="unstyled"
                h="auto"
                p="1.5"
                _hover={{ bg: "gray.100" }}
                onClick={() => {
                  // logout.mutate()
                  // console.log('tried to logout')
                  logingOut();
                }}
              >
                <HStack spacing="2">
                  <Box
                    w="6"
                    h="6"
                    display="flex"
                    justifyItems="center"
                    alignItems="center"
                  >
                    <Icon color={"primary"} as={TbLogout} w="6" />
                  </Box>
                  <Box as="span" fontSize="sm" fontWeight="normal">
                    Logout
                  </Box>
                </HStack>
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <CustomModal
          headerTitle={"Change password"}
          isOpen={changePasswordPopup}
          onClose={() => {
            setChangePasswordPopup(false);
          }}
          child={<SetPasswordBody isChangePassword={changePasswordPopup} />}
          isCentered
          scrollInside={false}
          widthSize="22vw"
          showFooter={false}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
