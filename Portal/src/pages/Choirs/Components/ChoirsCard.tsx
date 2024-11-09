import { useEffect, useState } from "react";
import { Box, Divider, HStack, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { MessageResponse, ChoirsResponse } from "../../../types/apiResponses";
import { ImageUploader } from "../../../components/ui/ImageUpload/ImageUpload";
import { addNewImage } from "../../../api/images";
import {
  AddChoirsForm,
  choirsSchema,
  UpdateChoirsForm,
} from "../../../lib/validations/choirs";
import { addNewChoir, updateChoir } from "../../../api/choirs";

interface AddChoirProps {
  onClose: () => void;
  fetchChoirs: () => void;
  choir: ChoirsResponse | null;
}

const AddChoirCard = (props: AddChoirProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddChoirsForm>({
    resolver: zodResolver(choirsSchema),
  });

  const toast = useToast();
  const choirToEdit = props.choir;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newChoirPayload, setNewChoirPayload] = useState<AddChoirsForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddChoirsForm) => {
    setNewChoirPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (choirToEdit) {
      setValue("name", choirToEdit.name);
      setValue("description_en", choirToEdit.description_en);
      setValue("description_fr", choirToEdit.description_fr);
      setValue("description_rw", choirToEdit.description_rw);
      setValue("leader", choirToEdit.leader);
      setValue("telephone", choirToEdit.telephone);
      setValue("backgroundImageId", choirToEdit?.backgroundImage?.id || null);
    }
  }, [choirToEdit]);

  const onConfirm = async (payload: AddChoirsForm | undefined) => {
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

      if (!choirToEdit) {
        await addNewChoir(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Choir message!",
              description: res?.message || "Choir saved successfully",
              status: "success",
            });
            props.fetchChoirs();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Choir message",
              description:
                error.response.data?.message || "Error saving choir!",
              status: "error",
            });
          });
        reset();
      } else if (choirToEdit) {
        const editPayload: UpdateChoirsForm = {
          name: payload.name,
          leader: payload.leader,
          telephone: payload.telephone,
          isActive: choirToEdit.isActive,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          choirId: choirToEdit.id,
          backgroundImageId: choirToEdit.backgroundImage?.id || null,
        };
        await updateChoir(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Choir message!",
              description: res?.message || "Choir edited successfully",
              status: "success",
            });
            props.fetchChoirs();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Choir message",
              description:
                error.response?.data?.message || "Error editing choir!",
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
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          columnGap={"2rem"}
          rowGap={{ base: "4" }}
          justifyItems={"start"}
        >
        <FormInput
          name="name"
          register={register}
          errors={errors}
          label="Name"
          placeholder="Enter name"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="leader"
          register={register}
          errors={errors}
          label="Leader"
          placeholder="Enter leader"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="telephone"
          register={register}
          errors={errors}
          label="Contact Telephone"
          placeholder="Enter contact telephone"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_en"
          register={register}
          errors={errors}
          label="Description (EN)"
          placeholder="Enter description (EN)"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_fr"
          register={register}
          errors={errors}
          label="Description (FR)"
          placeholder="Enter description (FR)"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormTextarea
          name="description_rw"
          register={register}
          errors={errors}
          label="Description (RW)"
          placeholder="Enter description (RW)"
          textareaProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        </SimpleGrid>
        {!choirToEdit && (
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
          choirToEdit ? "edit" : "add"
        } this choir?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newChoirPayload)}
      />
    </Box>
  );
};

export default AddChoirCard;
