import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { CustomFormSelect, FormInput, FormTextarea } from "../../../components/form";
import { MpuzaResponse, MessageResponse, CommunityResponse } from "../../../types/apiResponses";
import { addNewImage, updateImage } from "../../../api/images";
import { addNewMpuza, updateMpuza } from "../../../api/MpuzaMiryangoRemezo";
import { AddMpuzaMiryangoRemezoForm, mpuzaMiryangoRemezoSchema, UpdateMpuzaMiryangoRemezoForm } from "../../../lib/validations/MpuzaMiryangoRemezo";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";
import { SelectOption } from "../../../types/forms";
import { getAllCommunities } from "../../../api/community";

interface AddMpuzaProps {
  onClose: () => void;
  fetchMpuza: () => void;
  Mpuza: MpuzaResponse | null;
}

const AddMpuzaCard = (props: AddMpuzaProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddMpuzaMiryangoRemezoForm>({
    resolver: zodResolver(mpuzaMiryangoRemezoSchema),
  });

  const toast = useToast();
  const MpuzaToEdit = props.Mpuza;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddMpuzaMiryangoRemezoForm>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [massCommunity, setMassCommunity] = useState<SelectOption | null>(null);
  const [communitiesSelectOptions, setCommunitiesSelectOptions] =  useState<SelectOption[]>([]);

  const onSubmit = async (values: AddMpuzaMiryangoRemezoForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (MpuzaToEdit) {
      setValue("title", MpuzaToEdit.title);
      setValue("leader", MpuzaToEdit.leader);
      setValue("phone", MpuzaToEdit.phone);
      setValue("description_en", MpuzaToEdit.description_en);
      setValue("description_fr", MpuzaToEdit.description_fr);
      setValue("description_rw", MpuzaToEdit.description_rw);
      setValue("community", MpuzaToEdit.community.id);
      setMassCommunity({
        value: MpuzaToEdit.community.id,
        label: MpuzaToEdit.community.name,
      });
    }
    setValue(
      "backgroundImageId",
      MpuzaToEdit?.backgroundImage?.id || null
    );
  }, [MpuzaToEdit, setValue]);

  useEffect(() => {
    const getCommunities = async () => {
      await getAllCommunities({ page: undefined }).then((data) => {
        const newCommunitiesSelectOptions = data.communities.map(
          (dataLocation: CommunityResponse) => ({
            value: dataLocation.id,
            label: dataLocation.name,
          })
        );
        setCommunitiesSelectOptions(newCommunitiesSelectOptions)
      });
    };

    if (communitiesSelectOptions.length === 0) {
      getCommunities();
    }
  });

  const onConfirm = async (payload: AddMpuzaMiryangoRemezoForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (selectedImage) {
        if (MpuzaToEdit) {
          await updateImage({ imageId: MpuzaToEdit.backgroundImage?.id, image: selectedImage, isBannerImage: false })
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

      if (!MpuzaToEdit) {
        await addNewMpuza(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Mpuza message!",
              description: res?.message || "Mpuza saved successfully",
              status: "success",
            });
            props.fetchMpuza();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Mpuza message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (MpuzaToEdit) {
        const editPayload: UpdateMpuzaMiryangoRemezoForm = {
          title: payload.title,
          leader: payload.leader,
          phone: payload.phone,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          community: payload.community,
          backgroundImageId: MpuzaToEdit.backgroundImage?.id || null,
          mpuzMiryangoRemezoId: MpuzaToEdit?.id || null,
        };
        await updateMpuza(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Mpuza message!",
              description: res?.message || "Mpuza edited successfully",
              status: "success",
            });
            props.fetchMpuza();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Mpuza message",
              description:
                error.response?.data?.message || "Error editing Mpuza!",
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
            <CustomFormSelect
              selectValue={massCommunity}
              isError={errors.community ? true : false}
              errorMsg={errors.community ? errors.community.message : undefined}
              label="Community"
              placeholder="Choose community"
              options={communitiesSelectOptions}
              onChangeFn={(selectedVal: SelectOption| null) => {
                setMassCommunity(selectedVal);
                if (selectedVal) {
                  setValue("community", Number(selectedVal.value));
                }
              }}
              maxWVal={{ lg: "full", sm: "90vw" }}
            />
            <FormInput
              name="title"
              register={register}
              errors={errors}
              label="Mpuza Title"
              placeholder="Enter name (en)"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="leader"
              register={register}
              errors={errors}
              label="Mpuza Leader"
              placeholder="Enter name (fr)"
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
          </Stack>
          <Stack>
            <FormInput
              name="phone"
              register={register}
              errors={errors}
              label="Mpuza Phone"
              placeholder="Enter name (rw)"
              inputProps={{ bg: "white" }}
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
          <FileUploadModal setFile={(file) => setSelectedImage(file)} imageUrl={MpuzaToEdit?.backgroundImage?.imageUrl || undefined} width="full" height="full" />
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
        alertText={`Are you sure you want to ${MpuzaToEdit ? "edit" : "add"
          } this Mpuza?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddMpuzaCard;
