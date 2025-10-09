import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
  type IconButtonProps,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiFillWarning } from "react-icons/ai";
import stMichelLogo from "../../assets/Logo.png";
import {
  setPasswordSchema,
  type SetPasswordForm,
} from "../../lib/validations/setPassword";
import { CustomButton } from "../../components/ui";
import { FormInput } from "../../components/form";
import { ChangePassword } from "../../types/users";
import Cookies from "universal-cookie";
import { getUserProfile, userSetPassword } from "../../api/users";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { MessageResponse } from "../../types/apiResponses";

interface Props {
  isChangePassword: boolean | null;
  token?: "string";
}

const SetPassword = () => {
  const [isTokenNotExpired, setIsTokenNotExpired] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isSetPasswordpath =
    location.pathname === "/set-password" ? true : false;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const toast = useToast();

  useEffect(() => {
    if (token) {
      getUserProfile()
        .then(() => {
          if (isSetPasswordpath) {
            setIsTokenNotExpired(true);
          }
        })
        .catch((error) => {
          if (
            token &&
            isAxiosError(error) &&
            error.response &&
            error.response.status === 401
          ) {
            cookies.remove("token");
          }
        });
    }
  }, [token]);

  const logoutPrevSession = async () => {
    await logout()
      .then(() => {
        if (token) {
          cookies.remove("token");
        }
        setIsTokenNotExpired(false);
      })
      .catch((error) => {
        toast({
          title: "Logout Failed!",
          description:
            `Logout failed with error "${error.response?.data.message}"` ||
            "Logout Failed. Please try again.",
          status: "error",
        });
      });
  };

  return (
    <Box
      id="main"
      position="relative"
      as="main"
      w={"100vw"}
      bg={'blue'}
    >
      <Flex w="full" h="100vh" justify="center" align="center">
        <Flex w="30vw" maxW="900px" rounded= "md"   shadow="md" overflow="hidden">
          <Stack
            w={{ base: "100%", md: "100%" }}
            py={'6'}
            px={'6'}
            bg='primaryBackground'
          >
            <Image src={stMichelLogo} w="40" loading="lazy" bg='blue' rounded='xl' alignSelf='center' />
            {isTokenNotExpired ? (
              <Box
                alignSelf="center"
                color={"red.600"}
                fontSize="sm"
                m='2'
                fontWeight="medium"
              >
                <Stack flexDir='row' my='10' mx='4'>
                  <Flex justify="center" align="center">
                    <Icon
                      aria-label="Hide password"
                      as={AiFillWarning}
                      mb={"4"}
                      width={"5rem"}
                      height={"5rem"}
                    />
                  </Flex>
                  <VStack w="100%" justify="space-between">
                    <Text color={"black"} fontSize={"17"} mx={"2"} mt='4'>
                      Please, logout from your other session first and then to set
                      your password
                    </Text>
                  </VStack>
                </Stack>
                <VStack
                  flexDir={"row"}
                  justify="center"
                  align="center"
                  my={"6"}
                  mx={"6"}
                >
                  <CustomButton
                    type="button"
                    w='10rem'
                    mx={"6"}
                    onClick={() => {
                      logoutPrevSession();
                    }}
                  >
                    logout
                  </CustomButton>
                  <CustomButton
                    type="button"
                    w='10rem'
                    mx={"6"}
                    colorVariant="gray-outline"
                    onClick={() => navigate("/")}
                  >
                    cancel
                  </CustomButton>
                </VStack>
              </Box>
            ) : (
              <>
                <Heading fontSize={"3xl"} my={"4"} alignSelf={'center'}>
                  Set your password
                </Heading>
                <SetPasswordBody isChangePassword={false} token={token} />
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export const SetPasswordBody = (props: Props) => {
  const isChangePassword = props.isChangePassword;
  const [isOldPasswordShown, setIsOldPasswordShown] = useState(false);
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const token = props.token;
  const toast = useToast();
  const cookies = new Cookies();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SetPasswordForm>({
    resolver: zodResolver(setPasswordSchema),
  });

  const errorToast = (message: string) => {
    toast({
      title: "Set Password Error!",
      description: `Please ${message}`,
      status: "error",
    });
  };

  const onSubmit = async (values: SetPasswordForm) => {
    if (token && !isChangePassword) {
      errorToast("Please logout first from your other session.");
    } else if (isChangePassword && !values.oldPassword) {
      errorToast("Please enter your old password.");
    } else {
      const objectToSend: ChangePassword = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      await userSetPassword(objectToSend)
        .then((res: MessageResponse) => {
          toast({
            title: "Set password Message",
            description: res?.message || "Your password was set successfully",
            status: "success",
          });
          cookies.remove("token");
          window.location.replace("/login");
        })
        .catch((error) => {
          toast({
            title: "Set password Message",
            description:
              error.response.data?.message || "Error setting your password!",
            status: "error",
          });
        });
    }
  };

  const iconButtonProps: Omit<IconButtonProps, "icon" | "aria-label"> = {
    size: "lg",
    position: "absolute",
    top: "2.35rem",
    right: "3",
    minW: "auto",
    h: "auto",
    p: "0.5",
    color: "blackAlpha.800",
    bg: "transparent !important",
    zIndex: "docked",
    _hover: { color: "blackAlpha.600" },
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} w="full">
      {isChangePassword && (
        <Box position="relative">
          <FormInput
            name="oldPassword"
            register={register}
            errors={errors}
            label="Old Password"
            placeholder="Enter password"
            maxW="full"
            mb={isChangePassword ? "2" : "4"}
            inputProps={{ type: isOldPasswordShown ? "text" : "password" }}
          />

          {isOldPasswordShown ? (
            <IconButton
              aria-label="Hide password"
              icon={<AiFillEyeInvisible />}
              onClick={() => setIsOldPasswordShown(false)}
              {...iconButtonProps}
            />
          ) : (
            <IconButton
              aria-label="Show password"
              icon={<AiFillEye />}
              onClick={() => setIsOldPasswordShown(true)}
              {...iconButtonProps}
            />
          )}
        </Box>
      )}

      <Box position="relative">
        <FormInput
          name="newPassword"
          register={register}
          errors={errors}
          label="New Password"
          placeholder="Enter password"
          maxW="full"
          mb={isChangePassword ? "2" : "4"}
          inputProps={{ type: isNewPasswordShown ? "text" : "password" }}
        />

        {isNewPasswordShown ? (
          <IconButton
            aria-label="Hide password"
            icon={<AiFillEyeInvisible />}
            onClick={() => setIsNewPasswordShown(false)}
            {...iconButtonProps}
          />
        ) : (
          <IconButton
            aria-label="Show password"
            icon={<AiFillEye />}
            onClick={() => setIsNewPasswordShown(true)}
            {...iconButtonProps}
          />
        )}
      </Box>

      <Box position="relative">
        <FormInput
          name="confirmPassword"
          register={register}
          errors={errors}
          label="Confirm Password"
          placeholder="Enter password"
          inputProps={{ type: isConfirmPasswordShown ? "text" : "password" }}
          maxW="full"
          mb='4'
        />

        {isConfirmPasswordShown ? (
          <IconButton
            aria-label="Hide confirm password"
            icon={<AiFillEyeInvisible />}
            onClick={() => setIsConfirmPasswordShown(false)}
            {...iconButtonProps}
          />
        ) : (
          <IconButton
            aria-label="Show confirm password"
            icon={<AiFillEye />}
            onClick={() => setIsConfirmPasswordShown(true)}
            {...iconButtonProps}
          />
        )}
      </Box>

      <CustomButton
        type="submit"
        size="md"
        my="8"
        w='full'
        alignSelf="center"
        isLoading={false}
      >
        Confirm
      </CustomButton>
    </Stack>
  );
};

export default SetPassword;
