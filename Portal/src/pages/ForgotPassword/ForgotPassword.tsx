import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import stMichelLogo from "../../assets/Logo.png";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "../../lib/validations/forgotPassword";
import { CustomButton } from "../../components/ui";
import { FormInput } from "../../components/form";
import { userForgotPassword } from "../../api/users";
import { MessageResponse } from "../../types/apiResponses";

const ForgotPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (values: ForgotPasswordForm) => {
    userForgotPassword(values).then((res: MessageResponse) => {
      toast({
        title: "Forgot password Message",
        description: res?.message || "Your password reset link was sent successfully",
        status: "success",
      });
      window.location.replace("/login");
    })
    .catch((error) => {
      toast({
        title: "Forgot password Message",
        description:
          error.response.data?.message || "Error sening your reset password link!",
        status: "error",
      });
    });
  };

  return (
    <Box
      id="main"
      position="relative"
      as="main"
      w={{ base: "full", lg: "calc(100vw - 6rem)" }}
    >
      <Flex w="full" h="100vh" justify="center" align="center">
        <Flex w="90vw" maxW="900px" rounded="xl" shadow="md" overflow="hidden">
          <VStack
            w="50%"
            py="12"
            px="10"
            display={{ base: "none", md: "flex" }}
            justify="space-between"
            bg="primary"
          >
            <Image src={stMichelLogo} w="60" />

            <Heading as="h1" color="white" textAlign="center">
              Portal
            </Heading>

            <Box
              alignSelf="center"
              color="warning"
              fontSize="sm"
              fontWeight="medium"
            >
              <Text>Hotline: +250-788-387-632</Text>
              <Text>Email: info@St Michael Parish.co.rw</Text>
            </Box>
          </VStack>

          <Stack
            w={{ base: "100%", md: "50%" }}
            py={{ base: "8", sm: "12" }}
            px={{ base: "6", sm: "10" }}
            bg={'primaryBackground'}
          >
            <Heading fontSize="2xl" mb="6">
              Enter your email address to reset your password
            </Heading>

            <Stack as="form" onSubmit={handleSubmit(onSubmit)} w="full">
              <Box position="relative">
                <FormInput
                  name="email"
                  register={register}
                  errors={errors}
                  label="Your Email"
                  placeholder="Enter your email address"
                  maxW="full"
                  mb="4"
                  inputProps={{
                    type: "email",
                  }}
                />
              </Box>

              <CustomButton
                type="submit"
                size="md"
                mt="8"
                // isLoading={forgotPassword.isPending}
                loadingText="Sending..."
                // isDisabled={forgotPassword.isPending}
              >
                Send Reset Password Link
              </CustomButton>

              <CustomButton
                size="md"
                mt="2"
                variant="outline"
                onClick={() => navigate("/login")}
                colorVariant="accent-outline"
              >
                Cancel
              </CustomButton>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ForgotPassword;
