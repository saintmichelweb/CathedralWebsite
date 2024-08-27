import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { commissionResponse, MessageResponse } from "../../../types/apiResponses";
import { ImageUploader } from "../../../components/ui/ImageUpload/ImageUpload";
import { addNewImage } from "../../../api/images";
import { addNewCommission, updateCommission } from "../../../api/commission";
import { AddCommissionForm, commissionSchema, UpdateCommissionForm } from "../../../lib/validations/commission";

interface AddCommissionProps {
  onClose: () => void;
  fetchCommission: () => void;
  Commission: commissionResponse | null;
}

const AddCommissionCard = (props: AddCommissionProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddCommissionForm>({
    resolver: zodResolver(commissionSchema),
  });

  const toast = useToast();
  const CommissionToEdit = props.Commission;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddCommissionForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddCommissionForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (CommissionToEdit) {
      console.log(CommissionToEdit);
      setValue("name_en", CommissionToEdit.name_en);
      setValue("name_fr", CommissionToEdit.name_fr);
      setValue("name_rw", CommissionToEdit.name_rw);
      setValue("contact_person_name", CommissionToEdit.contact_person_name);
      setValue("contact_person_role", CommissionToEdit.contact_person_role);
      setValue("contact_person_phone_number", CommissionToEdit.contact_person_phone_number);
      setValue("contact_person_email", CommissionToEdit.contact_person_email);
      setValue("description_en", CommissionToEdit.description_en);
      setValue("description_fr", CommissionToEdit.description_fr);
      setValue("description_rw", CommissionToEdit.description_rw);
    }
    setValue("backgroundImageId", CommissionToEdit?.backgroundImage?.id || null);
  }, [CommissionToEdit]);

  const onConfirm = async (payload: AddCommissionForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        console.log("adding new image");
        await addNewImage({ image: selectedImage, isBannerImage: false })
          .then((res) => {
            toast({
              title: "Add Image message!",
              description: res?.message || "Commission saved successfully",
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

      if (!CommissionToEdit) {
        await addNewCommission(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Commission message!",
              description: res?.message || "Commission saved successfully",
              status: "success",
            });
            props.fetchCommission();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Commission message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (CommissionToEdit) {
        const editPayload: UpdateCommissionForm = {
          name_en: payload.name_en,
          name_fr: payload.name_fr,
          name_rw: payload.name_rw,
          contact_person_name: payload.contact_person_name,
          contact_person_role: payload.contact_person_role,
          contact_person_phone_number: payload.contact_person_phone_number,
          contact_person_email: payload.contact_person_email,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          backgroundImageId: CommissionToEdit.backgroundImage?.id || null,
          commissionId: CommissionToEdit?.id || null,
        };
        await updateCommission(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Commission message!",
              description: res?.message || "Commission edited successfully",
              status: "success",
            });
            props.fetchCommission();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Commission message",
              description:
                error.response?.data?.message || "Error editing Commission!",
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
          name="name_en"
          register={register}
          errors={errors}
          label="Commission Name (EN)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="name_fr"
          register={register}
          errors={errors}
          label="Commission Name (FR)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="name_rw"
          register={register}
          errors={errors}
          label="Commission Name (RW)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="contact_person_name"
          register={register}
          errors={errors}
          label="Commission Contact Person Name"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="contact_person_role"
          register={register}
          errors={errors}
          label="Commission Contact Person Role"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="contact_person_phone_number"
          register={register}
          errors={errors}
          label="Commission Contact Person Telephone"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="contact_person_email"
          register={register}
          errors={errors}
          label="Commission Contact Person Email"
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
        {!CommissionToEdit && (
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
          CommissionToEdit ? "edit" : "add"
        } this Commission?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddCommissionCard;
