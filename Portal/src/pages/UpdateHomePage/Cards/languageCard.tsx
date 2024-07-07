import { useState } from "react";
import {
  Box,
  Card,
  // Checkbox,
  Divider,
  Heading,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type MassLanguageForm,
  massLanguageSchema,
} from "../../../lib/validations/language";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { addNewLanguage } from "../../../api/language";

const MassLanguageCard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    // setValue,
  } = useForm<MassLanguageForm>({
    resolver: zodResolver(massLanguageSchema),
  });
  const toast = useToast()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<MassLanguageForm>();

  const onSubmit = async (values: MassLanguageForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  const onConfirm = async (payload: MassLanguageForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      await addNewLanguage(payload).then((res) => {
        toast({
          title: 'Add Language message!',
          description: res?.message || 'Language saved successfully',
          status: 'success',
        })
      }).catch(error => {
        toast({
          title: 'Add Language message',
          description: error.response.data?.message || 'Error saving language!',
          status: 'error',
        })
      })
      // if (user && props.onCloseModal) {
      //   const updatePayload: EditUserForm = {
      //     ...payload,
      //     userId: user.id,
      //   }
      //   props.onCloseModal()
      // } else {
      // }
      reset();
    }
  };

  return (
    <Box py={"2rem"}>
      <Card p={5} maxW={{ lg: "25rem", sm: "full" }}>
        <Heading size="md" mb="10">
          Add Mass Language
        </Heading>
        <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="language"
            register={register}
            errors={errors}
            label="language"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
          <Divider mt={2} color={"gray.400"} />
          <HStack spacing="3" alignSelf="center" mt="2">
            <CustomButton type="submit" isLoading={false} minW={"8rem"}>
              Submit
            </CustomButton>

            <CustomButton
              bg={"gray"}
              minW={"8rem"}
              onClick={() => {
                reset();
                // if (user && props.onCloseModal) {
                //   props.onCloseModal();
                // } else {
                //   navigate(-1);
                // }
              }}
            >
              Cancel
            </CustomButton>
          </HStack>
        </Stack>
      </Card>
      <AlertDialog
        alertText={"Are you sure you want to add this user?"}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  );
};

export default MassLanguageCard;
