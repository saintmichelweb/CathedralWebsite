import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { MiryangoremezoResponse, MessageResponse } from "../../../types/apiResponses";
import { addNewMuryangoRemezo, updateMuryangoRemezo } from "../../../api/MiryangoRemezo";
import { AddMiryangoRemezoForm, miryangoRemezoSchema, UpdateMiryangoRemezoForm } from "../../../lib/validations/MiryangoRemezo";

interface AddMuryangoRemezoProps {
  onClose: () => void;
  fetchMuryangoRemezo: () => void;
  MuryangoRemezo: MiryangoremezoResponse | null;
}

const AddMuryangoRemezoCard = (props: AddMuryangoRemezoProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddMiryangoRemezoForm>({
    resolver: zodResolver(miryangoRemezoSchema),
  });

  const toast = useToast();
  const MuryangoRemezoToEdit = props.MuryangoRemezo;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddMiryangoRemezoForm>();

  const onSubmit = async (values: AddMiryangoRemezoForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (MuryangoRemezoToEdit) {
      setValue("title", MuryangoRemezoToEdit.title);
      setValue("header", MuryangoRemezoToEdit.header);
      setValue("phone", MuryangoRemezoToEdit.phone);
    }
  }, [MuryangoRemezoToEdit]);

  const onConfirm = async (payload: AddMiryangoRemezoForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!MuryangoRemezoToEdit) {
        await addNewMuryangoRemezo(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add MuryangoRemezo message!",
              description: res?.message || "MuryangoRemezo saved successfully",
              status: "success",
            });
            props.fetchMuryangoRemezo();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add MuryangoRemezo message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (MuryangoRemezoToEdit) {
        const editPayload: UpdateMiryangoRemezoForm = {
          title: payload.title,
          header: payload.header,
          phone: payload.phone,
          mpuzaId: payload.mpuzaId,
          muryangoRemezoId: MuryangoRemezoToEdit?.id || null,
        };
        await updateMuryangoRemezo(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit MuryangoRemezo message!",
              description: res?.message || "MuryangoRemezo edited successfully",
              status: "success",
            });
            props.fetchMuryangoRemezo();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit MuryangoRemezo message",
              description:
                error.response?.data?.message || "Error editing MuryangoRemezo!",
              status: "error",
            });
          });
      }
      reset();
    }
  };

  return (
    <Box>
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormInput
            name="title"
            register={register}
            errors={errors}
            label="MuryangoRemezo Title"
            placeholder="Enter muryangoRemezo title"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
          <FormInput
            name="header"
            register={register}
            errors={errors}
            label="MuryangoRemezo Header"
            placeholder="Enter muryangoRemezo header"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
          <FormInput
            name="phone"
            register={register}
            errors={errors}
            label="MuryangoRemezo Phone"
            placeholder="Enter muryangoRemezo phone"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
        </Stack>
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
              props.onClose();
            }}
          >
            Cancel
          </CustomButton>
        </HStack>
      </Stack>
      <AlertDialog
        alertText={`Are you sure you want to ${MuryangoRemezoToEdit ? "edit" : "add"
          } this MuryangoRemezo?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddMuryangoRemezoCard;
