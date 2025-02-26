import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormTextarea } from "../../../components/form";
import {
  MessageResponse,
  WelcomeMessageResponse,
} from "../../../types/apiResponses";
import { addNewImage, updateImage } from "../../../api/images";
import { AddWelcomeMessageForm, UpdateWelcomeMessageForm, WelcomeMessageSchema } from "../../../lib/validations/welcomeMessage";
import { addWelcomeMessage, putWelcomeMessage } from "../../../api/welcomeMessage";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

interface AddPriestProps {
  onClose: () => void;
  fetchWelcomeMessage: () => void;
  welcomeMessage: WelcomeMessageResponse | null;
}

const AddWelcomeMessageCard = (props: AddPriestProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddWelcomeMessageForm>({
    resolver: zodResolver(WelcomeMessageSchema),
  });

  const toast = useToast();
  const welcomeMessageToEdit = props.welcomeMessage;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddWelcomeMessageForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddWelcomeMessageForm) => {
    console.log('click')
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (welcomeMessageToEdit) {
      setValue("welcomeMessage_en", welcomeMessageToEdit.welcomeMessage_en);
      setValue("welcomeMessage_fr", welcomeMessageToEdit.welcomeMessage_fr);
      setValue("welcomeMessage_rw", welcomeMessageToEdit.welcomeMessage_rw);
    }
  }, [welcomeMessageToEdit]);

  const onConfirm = async (payload: AddWelcomeMessageForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        if (welcomeMessageToEdit) {
          await updateImage({ imageId: welcomeMessageToEdit.backgroundImage?.id, image: selectedImage, isBannerImage: false })
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

      if (!welcomeMessageToEdit) {
        await addWelcomeMessage(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Welcome Message message!",
              description: res?.message || "Welcome Message saved successfully",
              status: "success",
            });
            props.fetchWelcomeMessage();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Welcome Message message",
              description:
                error.response.data?.message || "Error saving welcome message!",
              status: "error",
            });
          });
        reset();
      } else if (welcomeMessageToEdit) {
        const editPayload: UpdateWelcomeMessageForm = {
          welcomeMessage_en: payload.welcomeMessage_en,
          welcomeMessage_fr: payload.welcomeMessage_fr,
          welcomeMessage_rw: payload.welcomeMessage_rw,
          welcomeMessageId: welcomeMessageToEdit.id,
          backgroundImageId: welcomeMessageToEdit.backgroundImage?.id,
        };
        await putWelcomeMessage(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Welcome Message message!",
              description: res?.message || "Welcome Message edited successfully",
              status: "success",
            });
            props.fetchWelcomeMessage();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Welcome Message message",
              description:
                error.response?.data?.message || "Error editing welcome message!",
              status: "error",
            });
          });
      }
      reset();
    }
  };

  return (
    <Box >
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            // lg: 'repeat(2, 1fr)',
            // xl: 'repeat(2, 1fr)',
          }}
          columnGap='4'
          rowGap='4'
          // justifyItems='center'
          w='full'
          data-testid='form-skeleton'
        // bg={'green.300'}
        >
          <Stack>
            <FormTextarea
              name="welcomeMessage_en"
              register={register}
              errors={errors}
              label="Welcome Message (EN)"
              placeholder="enter welcome message english"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="welcomeMessage_fr"
              register={register}
              errors={errors}
              label="Welcome Message (FR)"
              placeholder="enter welcome message in french"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="welcomeMessage_rw"
              register={register}
              errors={errors}
              label="Welcome Message (RW)"
              placeholder="enter welcome message in Kinyarwanda"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <FileUploadModal setFile={(file) => setSelectedImage(file)} imageUrl={welcomeMessageToEdit?.backgroundImage?.imageUrl || undefined} width="22rem" height="21.5rem" />
        </SimpleGrid>
        {/* {!welcomeMessageToEdit && (
          <ImageUploader
            parentSetSelectedImage={(file: File) => setSelectedImage(file)}
          />
        )} */}
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
        alertText={`Are you sure you want to ${welcomeMessageToEdit ? "edit" : "add"
          } this recent event?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddWelcomeMessageCard;
