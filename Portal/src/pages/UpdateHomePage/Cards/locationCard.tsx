import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectOption } from "../../../types/forms";
import {
  type MassLocationForm,
  massLocationSchema,
} from "../../../lib/validations/updateHomePage";
import { AlertDialog, CustomButton, Skeleton } from "../../../components/ui";
import { CustomFormSelect, FormInput } from "../../../components/form";

const MassLocationCard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<MassLocationForm>({
    resolver: zodResolver(massLocationSchema),
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<MassLocationForm>();

  const onSubmit = async (values: MassLocationForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  const onConfirm = async (payload: MassLocationForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
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
            name="locationName"
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
