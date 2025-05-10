import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { CommunityResponse, MessageResponse } from "../../../types/apiResponses";
import { addNewCommunity, updateCommunity } from "../../../api/community";
import { AddCommunityForm, communitySchema, UpdateCommunityForm } from "../../../lib/validations/community";

interface AddCommunityProps {
  onClose: () => void;
  fetchCommunity: () => void;
  Community: CommunityResponse | null;
}

const AddCommunityCard = (props: AddCommunityProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddCommunityForm>({
    resolver: zodResolver(communitySchema),
  });

  const toast = useToast();
  const CommunityToEdit = props.Community;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddCommunityForm>();

  const onSubmit = async (values: AddCommunityForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (CommunityToEdit) {
      console.log(CommunityToEdit);
      setValue("name", CommunityToEdit.name)
    }
  }, [CommunityToEdit, setValue]);

  const onConfirm = async (payload: AddCommunityForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!CommunityToEdit) {
        await addNewCommunity(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Community message!",
              description: res?.message || "Community saved successfully",
              status: "success",
            });
            props.fetchCommunity();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Community message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (CommunityToEdit) {
        const editPayload: UpdateCommunityForm = {
          name: payload.name,
          communityId: CommunityToEdit?.id || null,
        };
        await updateCommunity(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Community message!",
              description: res?.message || "Community edited successfully",
              status: "success",
            });
            props.fetchCommunity();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Community message",
              description:
                error.response?.data?.message || "Error editing Community!",
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
            name="name"
            register={register}
            errors={errors}
            label="Community Name (en)"
            placeholder="Enter community name (en)"
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
        alertText={`Are you sure you want to ${CommunityToEdit ? "edit" : "add"
          } this Community?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddCommunityCard;
