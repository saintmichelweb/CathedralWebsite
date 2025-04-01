import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { MessageResponse, parishCommitteeCouncilResponse } from "../../../types/apiResponses";
import { addNewImage } from "../../../api/images";
import { AddParishCommitteeCouncilForm, parishCommitteeCouncilSchema, UpdateParishCommitteeCouncilForm } from "../../../lib/validations/parishCommitteeCouncil";
import { addNewparishCommitteeCouncil, updateparishCommitteeCouncil } from "../../../api/parishCommitteeCouncil";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

interface AddparishCommitteeCouncilProps {
  onClose: () => void;
  fetchparishCommitteeCouncil: () => void;
  parishCommitteeCouncil: parishCommitteeCouncilResponse | null;
}

const AddparishCommitteeCouncilCard = (
  props: AddparishCommitteeCouncilProps
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddParishCommitteeCouncilForm>({
    resolver: zodResolver(parishCommitteeCouncilSchema),
  });

  const toast = useToast();
  const parishCommitteeCouncilToEdit = props.parishCommitteeCouncil;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddParishCommitteeCouncilForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddParishCommitteeCouncilForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (parishCommitteeCouncilToEdit) {
      console.log(parishCommitteeCouncilToEdit);
      setValue("names", parishCommitteeCouncilToEdit.names);
      setValue("position_en", parishCommitteeCouncilToEdit.position_en);
      setValue("position_fr", parishCommitteeCouncilToEdit.position_fr);
      setValue("position_rw", parishCommitteeCouncilToEdit.position_rw);
      setValue("description_en", parishCommitteeCouncilToEdit.description_en);
      setValue("description_fr", parishCommitteeCouncilToEdit.description_fr);
      setValue("description_rw", parishCommitteeCouncilToEdit.description_rw);
      setValue("telephone", parishCommitteeCouncilToEdit.telephone);
      setValue("email", parishCommitteeCouncilToEdit.email);
    }
    setValue(
      "backgroundImageId",
      parishCommitteeCouncilToEdit?.backgroundImage?.id || null
    );
  }, [parishCommitteeCouncilToEdit]);

  const onConfirm = async (
    payload: AddParishCommitteeCouncilForm | undefined
  ) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        console.log("adding new image");
        await addNewImage({ image: selectedImage, isBannerImage: false })
          .then((res) => {
            toast({
              title: "Add Image message!",
              description:
                res?.message || "parishCommitteeCouncil saved successfully",
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

      if (!parishCommitteeCouncilToEdit) {
        await addNewparishCommitteeCouncil(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add parishCommitteeCouncil message!",
              description:
                res?.message || "parishCommitteeCouncil saved successfully",
              status: "success",
            });
            props.fetchparishCommitteeCouncil();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add parishCommitteeCouncil message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (parishCommitteeCouncilToEdit) {
        const editPayload: UpdateParishCommitteeCouncilForm = {
          names: payload.names,
          position_en: payload.position_en,
          position_fr: payload.position_fr,
          position_rw: payload.position_rw,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          telephone: payload.telephone,
          email: payload.email,
          backgroundImageId:
            parishCommitteeCouncilToEdit.backgroundImage?.id || null,
          parishCommitteeCouncilId: parishCommitteeCouncilToEdit?.id || null,
        };
        await updateparishCommitteeCouncil(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit parishCommitteeCouncil message!",
              description:
                res?.message || "parishCommitteeCouncil edited successfully",
              status: "success",
            });
            props.fetchparishCommitteeCouncil();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit parishCommitteeCouncil message",
              description:
                error.response?.data?.message ||
                "Error editing parishCommitteeCouncil!",
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
            lg: 'repeat(3, 1fr)',
          }}
          columnGap='4'
          rowGap='4'
          w='full'
          data-testid='form-skeleton'
        >
          <Stack>
            <FormInput
              name="names"
              register={register}
              errors={errors}
              label="Names"
              placeholder="Enter name"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="position_en"
              register={register}
              errors={errors}
              label="Position (en)"
              placeholder="Enter postion (en)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="position_fr"
              register={register}
              errors={errors}
              label="Position (fr)"
              placeholder="Enter postion (fr)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="position_rw"
              register={register}
              errors={errors}
              label="Position (rw)"
              placeholder="Enter postion (rw)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="telephone"
              register={register}
              errors={errors}
              label="Telephone"
              placeholder="Enter telephone"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <Stack>
            <FormInput
              name="email"
              register={register}
              errors={errors}
              label="Email"
              placeholder="Enter email"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_en"
              register={register}
              errors={errors}
              label="Event description (en)"
              placeholder="Enter description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_fr"
              register={register}
              errors={errors}
              label="Event description (fr)"
              placeholder="Enter description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_rw"
              register={register}
              errors={errors}
              label="Event description (rw)"
              placeholder="Enter description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <FileUploadModal setFile={(file) => setSelectedImage(file)} imageUrl={parishCommitteeCouncilToEdit?.backgroundImage?.imageUrl || undefined} width="20rem" height="full" />
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
        alertText={`Are you sure you want to ${parishCommitteeCouncilToEdit ? "edit" : "add"
          } this parishCommitteeCouncil?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddparishCommitteeCouncilCard;
