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
            <Heading fontSize="2xl" mt="4" alignSelf='center'>
              Enter your email address to reset
            </Heading>
            <Heading fontSize="2xl" mb='4' alignSelf='center'>
              your password
            </Heading>

            <Stack as="form" onSubmit={handleSubmit(onSubmit)} w="full">
              <Box position="relative">
                <FormInput
                  name="email"
                  register={register}
                  errors={errors}
                  label="Email"
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
                loadingText="Sending..."
                my="4"
                w='full'
                alignSelf="center"
              >
                Send Reset Password Link
              </CustomButton>

              <CustomButton
                size="md"
                variant="outline"
                onClick={() => navigate("/login")}
                colorVariant="accent-outline"
                mb="4"
                w='full'
                alignSelf="center"
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
