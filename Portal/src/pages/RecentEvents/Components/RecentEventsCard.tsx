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
import { FormInput, FormTextarea } from "../../../components/form";
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
import { formatTheDate } from "../../../utils";

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
      console.log(recentEventToEdit);
      setValue("title_en", recentEventToEdit.title_en);
      setValue("title_fr", recentEventToEdit.title_fr);
      setValue("title_rw", recentEventToEdit.title_rw);
      setValue("description_en", recentEventToEdit.description_en);
      setValue("description_fr", recentEventToEdit.description_fr);
      setValue("description_rw", recentEventToEdit.description_rw);
      setValue(
        "event_date",
        formatTheDate(recentEventToEdit.event_date, "DD/MM/YYYY" )
      );
    }
    setValue(
      "backgroundImageId",
      recentEventToEdit?.backgroundImage?.id || null
    );
  }, [recentEventToEdit]);

  const onConfirm = async (payload: AddRecentEventsForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        console.log("adding new image");
        await addNewImage({ image: selectedImage, isBannerImage: false })
          .then((res) => {
            toast({
              title: "Add Image message!",
              description: res?.message || "Recent Event saved successfully",
              status: "success",
            });
            payload.backgroundImageId = res.image.id;
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
          title_en: payload.title_en,
          title_fr: payload.title_fr,
          title_rw: payload.title_rw,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          isActive: recentEventToEdit.isActive,
          recentEventId: recentEventToEdit.id,
          event_date: payload.event_date,
          backgroundImageId: recentEventToEdit.backgroundImage?.id || null,
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
          name="title_en"
          register={register}
          errors={errors}
          label="Event title (EN)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="title_fr"
          register={register}
          errors={errors}
          label="Event title (FR)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="title_rw"
          register={register}
          errors={errors}
          label="Event title (RW)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_en"
          register={register}
          errors={errors}
          label="Event description (EN)"
          placeholder="enter event description"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_fr"
          register={register}
          errors={errors}
          label="Event description (FR)"
          placeholder="enter event description"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_rw"
          register={register}
          errors={errors}
          label="Event description (RW)"
          placeholder="enter event description"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="event_date"
          register={register}
          errors={errors}
          label="Event Date"
          inputProps={{ bg: "white", type: "date" }}
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
