import { useState } from "react";
// import { useNavigate } from "react-router-dom";
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

// import { SelectOption } from "../../../types/forms";
import {
  type MassLocationForm,
  massLocationSchema,
} from "../../../lib/validations/location";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { addNewLocation } from "../../../api/location";

const MassLocationCard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    // setValue,
  } = useForm<MassLocationForm>({
    resolver: zodResolver(massLocationSchema),
  });
  const toast = useToast()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<MassLocationForm>();

  const onSubmit = async (values: MassLocationForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  const onConfirm = async (payload: MassLocationForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      await addNewLocation(payload).then((res) => {
        toast({
          title: 'Add Location message!',
          description: res?.message || 'Location saved successfully',
          status: 'success',
        })
      }).catch(error => {
        toast({
          title: 'Add Location message',
          description: error.response.data?.message || 'Error saving location!',
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
          Add Mass Location
        </Heading>
        <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="location"
            register={register}
            errors={errors}
            label="location"
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

export default MassLocationCard;
