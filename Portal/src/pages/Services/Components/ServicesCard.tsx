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
  serviceSchema,
  UpdateServiceForm,
  type AddServiceForm,
} from "../../../lib/validations/services";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { MessageResponse, ServicesResponse } from "../../../types/apiResponses";
import { addNewImage, updateImage } from "../../../api/images";
import { addNewService, updateService } from "../../../api/services";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

interface AddServiceProps {
  onClose: () => void;
  fetchServices: () => void;
  service: ServicesResponse | null;
}

const AddServicesCard = (props: AddServiceProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddServiceForm>({
    resolver: zodResolver(serviceSchema),
  });

  const toast = useToast();
  const serviceToEdit = props.service;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddServiceForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddServiceForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (serviceToEdit) {
      console.log(serviceToEdit);
      setValue("name_en", serviceToEdit.name_en);
      setValue("name_fr", serviceToEdit.name_fr);
      setValue("name_rw", serviceToEdit.name_rw);
      setValue("description_en", serviceToEdit.description_en);
      setValue("description_fr", serviceToEdit.description_fr);
      setValue("description_rw", serviceToEdit.description_rw);
      setValue("work_days", serviceToEdit.work_days);
      setValue("work_hours", serviceToEdit.work_hours);
      setValue("contact_person_name", serviceToEdit.contact_person_name);
      setValue(
        "contact_person_phone_number",
        serviceToEdit.contact_person_phone_number
      );
    }
    setValue("backgroundImageId", serviceToEdit?.backgroundImage?.id || null);
  }, [serviceToEdit]);

  const onConfirm = async (payload: AddServiceForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        if (serviceToEdit) {
          await updateImage({
            imageId: serviceToEdit.backgroundImage?.id,
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

      if (!serviceToEdit) {
        await addNewService(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Service message!",
              description: res?.message || "Service saved successfully",
              status: "success",
            });
            props.fetchServices();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Service message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (serviceToEdit) {
        const editPayload: UpdateServiceForm = {
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
          backgroundImageId: serviceToEdit.backgroundImage?.id || null,
          servicesId: serviceToEdit?.id || null,
        };
        await updateService(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Service message!",
              description: res?.message || "Service edited successfully",
              status: "success",
            });
            props.fetchServices();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Service message",
              description:
                error.response?.data?.message || "Error editing service!",
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
              label="Service name (en)"
              placeholder="Enter service name (en)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="name_fr"
              register={register}
              errors={errors}
              label="Service name (fr)"
              placeholder="Enter service name (fr)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="name_rw"
              register={register}
              errors={errors}
              label="Service name (rw)"
              placeholder="Enter service name (rw)"
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
              placeholder="Enter service description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_fr"
              register={register}
              errors={errors}
              label="Event description (fr)"
              placeholder="Enter service description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="description_rw"
              register={register}
              errors={errors}
              label="Event description (rw)"
              placeholder="Enter service description"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <FileUploadModal
            setFile={(file) => setSelectedImage(file)}
            imageUrl={serviceToEdit?.backgroundImage?.imageUrl || undefined}
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
          serviceToEdit ? "edit" : "add"
        } this service?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddServicesCard;
