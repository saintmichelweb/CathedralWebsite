import { useEffect, useState } from "react";
import { Box, Divider, HStack, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
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
import { addNewImage, updateImage } from "../../../api/images";
import { formatTheDate } from "../../../utils";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

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
        formatTheDate(recentEventToEdit.event_date, "DD/MM/YYYY")
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
        if (recentEventToEdit) {
          await updateImage({ imageId: recentEventToEdit.backgroundImage?.id, image: selectedImage, isBannerImage: false })
          .then((res) => {
            toast({
              title: "Update Image message!",
              description: res?.message || "Image updated successfully",
              status: "success",
            });
            payload.backgroundImageId = res.image.id;
          })
          .catch((error) => {
            toast({
              title: "Add Image message",
              description:
                error.response.data?.message || "Error updating image!",
              status: "error",
            });
          });
        } else {
          await addNewImage({ image: selectedImage, isBannerImage: false })
            .then((res) => {
              toast({
                title: "Add Image message!",
                description: res?.message || "Image saved successfully",
                status: "success",
              });
              payload.backgroundImageId = res.image.id;
            })
            .catch((error) => {
              toast({
                title: "Add Image message",
                description:
                  error.response.data?.message || "Error savig image!",
                status: "error",
              });
            });
        }
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
    <Box >
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} >
        <SimpleGrid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          columnGap='4'
          rowGap='4'
          // justifyItems='center'
          w='full'
          data-testid='form-skeleton'
          // bg={'green.300'}
        >
          <Stack>
            <FormInput
              name="title_en"
              register={register}
              errors={errors}
              label="Event title (en)"
              placeholder="Enter title (en)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
              />
            <FormInput
              name="title_fr"
              register={register}
              errors={errors}
              label="Event title (fr)"
              placeholder="Enter title (fr)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
              />
            <FormInput
              name="title_rw"
              register={register}
              errors={errors}
              label="Event title (rw)"
              placeholder="Enter title (rw)"
              inputProps={{ bg: "white" }}
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
          </Stack>
          <Stack>
            <FormTextarea
              name="description_en"
              register={register}
              errors={errors}
              label="Event description (en)"
              placeholder="Enter description (en)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_fr"
              register={register}
              errors={errors}
              label="Event description (fr)"
              placeholder="Enter description (fr)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_rw"
              register={register}
              errors={errors}
              label="Event description (rw)"
              placeholder="Enter description (rw)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          {/* {!recentEventToEdit && (
          <ImageUploader
            parentSetSelectedImage={(file: File) => setSelectedImage(file)}
          />
        )} */}
          <FileUploadModal setFile={(file) => setSelectedImage(file)} imageUrl={recentEventToEdit?.backgroundImage?.imageUrl || undefined} width="22rem" height="21.5rem"/>
        </SimpleGrid>
        <Divider mt={4} color={"gray.400"} />
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
        alertText={`Are you sure you want to ${recentEventToEdit ? "edit" : "add"
          } this recent event?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddRecentEventsCard;
