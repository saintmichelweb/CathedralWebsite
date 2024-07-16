import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  recentEventsSchema,
  UpdateRecentEventsForm,
  type AddRecentEventsForm,
} from "../../../lib/validations/recentEvents";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import {
  addNewRecentEvent,
  updateRecentEvent,
} from "../../../api/recentEvents";
import {
  MessageResponse,
  RecentEventResponse,
} from "../../../types/apiResponses";
import { ImageUploader } from "../../../components/ui/ImageUpload/ImageUpload";
import { addNewImage } from "../../../api/images";

interface AddRecentEventProps {
  onClose: () => void;
  fetchRecentEvents: () => void;
  recentEvent: RecentEventResponse | null;
}

const AddRecentEventsCard = (props: AddRecentEventProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddRecentEventsForm>({
    resolver: zodResolver(recentEventsSchema),
  });

  const toast = useToast();
  const recentEventToEdit = props.recentEvent;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddRecentEventsForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddRecentEventsForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (recentEventToEdit) {
      setValue("title", recentEventToEdit.title);
      setValue("description", recentEventToEdit.description);
    }
    setValue("backgroungImageId", recentEventToEdit?.backgroundImage?.id || null);
  }, [recentEventToEdit]);

  const onConfirm = async (payload: AddRecentEventsForm | undefined) => {
    setIsOpenModal(false);
    console.log('pay')
    if (payload) {
      if (selectedImage) {
        console.log("adding new image");
        addNewImage({ image: selectedImage })
          .then((res) => {
            toast({
              title: "Add Image message!",
              description: res?.message || "Recent Event saved successfully",
              status: "success",
            });
            payload.backgroungImageId = res.image.id;
            console.log("imageResponse", res);
          })
          .catch((error) => {
            toast({
              title: "Add Image message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
      }

      if (!recentEventToEdit) {
        await addNewRecentEvent(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Recent Event message!",
              description: res?.message || "Recent Event saved successfully",
              status: "success",
            });
            props.fetchRecentEvents();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Recent Event message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (recentEventToEdit) {
        const editPayload: UpdateRecentEventsForm = {
          title: payload.title,
          description: payload.description,
          isActive: recentEventToEdit.isActive,
          recentEventId: recentEventToEdit.id,
          backgroungImageId: recentEventToEdit.backgroundImage?.id || null,
        };
        await updateRecentEvent(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Recent Event message!",
              description: res?.message || "Recent Event edited successfully",
              status: "success",
            });
            props.fetchRecentEvents();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Recent Event message",
              description:
                error.response?.data?.message || "Error editing recent event!",
              status: "error",
            });
          });
      }
      reset();
    }
  };

  return (
    <Box py={"2rem"}>
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="title"
          register={register}
          errors={errors}
          label="Event title"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="description"
          register={register}
          errors={errors}
          label="Event description"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        {!recentEventToEdit && (
          <ImageUploader
            parentSetSelectedImage={(file: File) => setSelectedImage(file)}
          />
        )}
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
        alertText={`Are you sure you want to ${
          recentEventToEdit ? "edit" : "add"
        } this recent event?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddRecentEventsCard;
