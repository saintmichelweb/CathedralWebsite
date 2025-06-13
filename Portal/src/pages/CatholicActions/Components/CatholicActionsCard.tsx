import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { MessageResponse, CatholicActionsResponse } from "../../../types/apiResponses";
import { addNewImage, updateImage } from "../../../api/images";
import {
  AddCatholicActionsForm,
  catholicActionsSchema,
  UpdateCatholicActionsForm,
} from "../../../lib/validations/catholicActions";
import { addNewCatholicAction, updateCatholicAction } from "../../../api/catholicAction";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

interface AddCatholicActionProps {
  onClose: () => void;
  fetchCatholicActions: () => void;
  catholicAction: CatholicActionsResponse | null;
}

const AddCatholicActionCard = (props: AddCatholicActionProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddCatholicActionsForm>({
    resolver: zodResolver(catholicActionsSchema),
  });

  const toast = useToast();
  const catholicActionToEdit = props.catholicAction;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newCatholicActionPayload, setNewCatholicActionPayload] = useState<AddCatholicActionsForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddCatholicActionsForm) => {
    setNewCatholicActionPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (catholicActionToEdit) {
      setValue("name", catholicActionToEdit.name);
      setValue("description_en", catholicActionToEdit.description_en);
      setValue("description_fr", catholicActionToEdit.description_fr);
      setValue("description_rw", catholicActionToEdit.description_rw);
      setValue("leader", catholicActionToEdit.leader);
      setValue("telephone", catholicActionToEdit.telephone);
      setValue("backgroundImageId", catholicActionToEdit?.backgroundImage?.id || null);
    }
  }, [catholicActionToEdit, setValue]);

  const onConfirm = async (payload: AddCatholicActionsForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        if (catholicActionToEdit) {
          await updateImage({ imageId: catholicActionToEdit.backgroundImage?.id, image: selectedImage, isBannerImage: false })
            .then((res) => {
              toast({
                title: "Update Image message!",
                description: res?.message || "Image updated successfully",
                status: "success",
              });
              // @ts-expect-error (undefined type)
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

      if (!catholicActionToEdit) {
        await addNewCatholicAction(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add catholic action message!",
              description: res?.message || "Catholic action saved successfully",
              status: "success",
            });
            props.fetchCatholicActions();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add catholic action message",
              description:
                error.response.data?.message || "Error saving catholic action!",
              status: "error",
            });
          });
        reset();
      } else if (catholicActionToEdit) {
        const editPayload: UpdateCatholicActionsForm = {
          name: payload.name,
          leader: payload.leader,
          telephone: payload.telephone,
          isActive: catholicActionToEdit.isActive,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          catholicActionId: catholicActionToEdit.id,
          backgroundImageId: catholicActionToEdit.backgroundImage?.id || null,
        };
        await updateCatholicAction(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit catholic action message!",
              description: res?.message || "Catholic action edited successfully",
              status: "success",
            });
            props.fetchCatholicActions();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Catholic action message",
              description:
                error.response?.data?.message || "Error editing catholic action!",
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
              name="name"
              register={register}
              errors={errors}
              label="Catholic action name"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="leader"
              register={register}
              errors={errors}
              label="Catholic action Leader"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_fr"
              register={register}
              errors={errors}
              label="description (fr)"
              placeholder="enter event description (en)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <Stack>
            <FormInput
              name="telephone"
              register={register}
              errors={errors}
              label="Catholic action Contact Telephone"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_en"
              register={register}
              errors={errors}
              label="description (en)"
              placeholder="enter event description (en)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_rw"
              register={register}
              errors={errors}
              label="description (rw)"
              placeholder="enter event description (en)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <FileUploadModal setFile={(file) => setSelectedImage(file)} imageUrl={catholicActionToEdit?.backgroundImage?.imageUrl || undefined} width="full" height="full" />
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
        alertText={`Are you sure you want to ${catholicActionToEdit ? "edit" : "add"
          } this catholic action?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newCatholicActionPayload)}
      />
    </Box>
  );
};

export default AddCatholicActionCard;
