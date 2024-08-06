import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import {
  MessageResponse,
  PriestsResponse,
} from "../../../types/apiResponses";
import { ImageUploader } from "../../../components/ui/ImageUpload/ImageUpload";
import { addNewImage } from "../../../api/images";
import { AddPriestsForm, priestsSchema, UpdatePriestsForm } from "../../../lib/validations/priests";
import { addNewPriest, updatePriest } from "../../../api/priests";

interface AddPriestProps {
  onClose: () => void;
  fetchPriests: () => void;
  priest: PriestsResponse | null;
}

const AddPriestCard = (props: AddPriestProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddPriestsForm>({
    resolver: zodResolver(priestsSchema),
  });

  const toast = useToast();
  const priestToEdit = props.priest;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newPriestPayload, setNewPriestPayload] =
    useState<AddPriestsForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddPriestsForm) => {
    setNewPriestPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (priestToEdit) {
      setValue("name", priestToEdit.name);
      setValue("title", priestToEdit.title);
      setValue("description_en", priestToEdit.description_en);
      setValue("description_fr", priestToEdit.description_fr);
      setValue("description_rw", priestToEdit.description_rw);
      setValue(
        "backgroundImageId",
        priestToEdit?.backgroundImage?.id || null
      );
    }
  }, [priestToEdit]);

  const onConfirm = async (payload: AddPriestsForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        console.log("adding new image");
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
                error.response.data?.message || "Error saving image!",
              status: "error",
            });
          });
      }

      if (!priestToEdit) {
        await addNewPriest(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Priest message!",
              description: res?.message || "Priest saved successfully",
              status: "success",
            });
            props.fetchPriests();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Priest message",
              description:
                error.response.data?.message || "Error saving priest!",
              status: "error",
            });
          });
        reset();
      } else if (priestToEdit) {
        const editPayload: UpdatePriestsForm = {
          name: payload.name,
          title: payload.title,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          priestId: priestToEdit.id,
          backgroundImageId: priestToEdit.backgroundImage?.id || null,
        };
        await updatePriest(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Priest message!",
              description: res?.message || "Priest edited successfully",
              status: "success",
            });
            props.fetchPriests();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Priest message",
              description:
                error.response?.data?.message || "Error editing priest!",
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
          name="name"
          register={register}
          errors={errors}
          label="Priest name"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="title"
          register={register}
          errors={errors}
          label="Priest title"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_en"
          register={register}
          errors={errors}
          label="description (EN)"
          placeholder="enter event description"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_fr"
          register={register}
          errors={errors}
          label="description (FR)"
          placeholder="enter event description"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_rw"
          register={register}
          errors={errors}
          label="description (RW)"
          placeholder="enter event description"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        {!priestToEdit && (
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
          priestToEdit ? "edit" : "add"
        } this priest?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newPriestPayload)}
      />
    </Box>
  );
};

export default AddPriestCard;
