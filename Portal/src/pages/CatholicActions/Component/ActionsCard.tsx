import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Stack,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  actionSchema,
  UpdateactionForm,
  type AddactionForm,
} from "../../../lib/validations/CatholicAction";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { MessageResponse } from "../../../types/apiResponses";
import { addNewImage, updateImage } from "../../../api/images";
import { addNewaction, updateaction } from "../../../api/actions";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

interface AddactionProps {
  onClose: () => void;
  fetchactions: () => void;
  action: actionsResponse | null;
}

const AddactionsCard = (props: AddactionProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddactionForm>({
    resolver: zodResolver(actionSchema),
  });

  const toast = useToast();
  const actionToEdit = props.action;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddactionForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddactionForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (actionToEdit) {
      console.log(actionToEdit);
      setValue("name_en", actionToEdit.name_en);
      setValue("name_fr", actionToEdit.name_fr);
      setValue("name_rw", actionToEdit.name_rw);
      setValue("description_en", actionToEdit.description_en);
      setValue("description_fr", actionToEdit.description_fr);
      setValue("description_rw", actionToEdit.description_rw);
      setValue("work_days", actionToEdit.work_days);
      setValue("work_hours", actionToEdit.work_hours);
      setValue("contact_person_name", actionToEdit.contact_person_name);
      setValue(
        "contact_person_phone_number",
        actionToEdit.contact_person_phone_number
      );
    }
    setValue("backgroundImageId", actionToEdit?.backgroundImage?.id || null);
  }, [actionToEdit]);

  const onConfirm = async (payload: AddactionForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        if (actionToEdit) {
          await updateImage({
            imageId: actionToEdit.backgroundImage?.id,
            image: selectedImage,
            isBannerImage: false,
          })
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

      if (!actionToEdit) {
        await addNewaction(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add action message!",
              description: res?.message || "action saved successfully",
              status: "success",
            });
            props.fetchactions();
            props.onClose();
          })
          .catch((error: { response: { data: { message: any; }; }; }) => {
            toast({
              title: "Add action message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (actionToEdit) {
        const editPayload: UpdateactionForm = {
          name_en: payload.name_en,
          name_fr: payload.name_fr,
          name_rw: payload.name_rw,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          work_hours: payload.work_hours,
          work_days: payload.work_days,
          contact_person_name: payload.contact_person_name,
          contact_person_phone_number: payload.contact_person_phone_number,
          backgroundImageId: actionToEdit.backgroundImage?.id || null,
          actionsId: actionToEdit?.id || null,
        };
        await updateaction(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit action message!",
              description: res?.message || "action edited successfully",
              status: "success",
            });
            props.fetchactions();
            props.onClose();
          })
          .catch((error: { response: { data: { message: any; }; }; }) => {
            toast({
              title: "Edit action message",
              description:
                error.response?.data?.message || "Error editing action!",
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
        <SimpleGrid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          columnGap="4"
          rowGap="4"
          w="full"
          data-testid="form-skeleton"
        >
          <Stack>
            <FormInput
              name="name_en"
              register={register}
              errors={errors}
              label="action name (en)"
              placeholder="Enter action name (en)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="name_fr"
              register={register}
              errors={errors}
              label="action name (fr)"
              placeholder="Enter action name (fr)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="name_rw"
              register={register}
              errors={errors}
              label="action name (rw)"
              placeholder="Enter action name (rw)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="work_days"
              register={register}
              errors={errors}
              label="Work Days"
              placeholder="Enter work days"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="work_hours"
              register={register}
              errors={errors}
              label="Work Hours"
              placeholder="Enter work hours"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="contact_person_name"
              register={register}
              errors={errors}
              label="Contact Person's Name"
              placeholder="Enter contact person's name"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <Stack>
            <FormInput
              name="contact_person_phone_number"
              register={register}
              errors={errors}
              label="Contact Person's Phone Number"
              placeholder="Enter contact person's phone number"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_en"
              register={register}
              errors={errors}
              label="Event description (en)"
              placeholder="Enter action description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_fr"
              register={register}
              errors={errors}
              label="Event description (fr)"
              placeholder="Enter action description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_rw"
              register={register}
              errors={errors}
              label="Event description (rw)"
              placeholder="Enter action description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <FileUploadModal
            setFile={(file) => setSelectedImage(file)}
            imageUrl={actionToEdit?.backgroundImage?.imageUrl || undefined}
            width="20rem"
            height="full"
          />
        </SimpleGrid>
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
          actionToEdit ? "edit" : "add"
        } this action?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddactionsCard;
