import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormTextarea } from "../../../components/form";
import {
  BannerImageResponse,
  MessageResponse,
} from "../../../types/apiResponses";
import { addNewImage, updateImage } from "../../../api/images";
import {
  BannerImageForm,
  bannerImageSchema,
  UpdateBannerImageForm,
} from "../../../lib/validations/image";
import FileUploadModal from "../../../components/ui/CustomModal/FileUploadModal";

interface AddLanguageProps {
  onClose: () => void;
  fetchBannerImages: () => void;
  bannerImage: BannerImageResponse | null;
}

const AddBannerImageCard = (props: AddLanguageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<BannerImageForm>({
    resolver: zodResolver(bannerImageSchema),
  });

  const toast = useToast();
  const bannerImageToEdit = props.bannerImage;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newLanguagePayload, setNewLanguagePayload] =
    useState<BannerImageForm>();
  const [selectedBannerImage, setSelectedBannerImage] = useState<File | null>(
    null
  );

  const onSubmit = async (values: BannerImageForm) => {
    setNewLanguagePayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (bannerImageToEdit) {
      setValue("bannerDescription_en", bannerImageToEdit.bannerDescription_en);
      setValue("bannerDescription_fr", bannerImageToEdit.bannerDescription_fr);
      setValue("bannerDescription_rw", bannerImageToEdit.bannerDescription_rw);
    }
  }, [bannerImageToEdit]);

  const onConfirm = async (payload: BannerImageForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!bannerImageToEdit) {
        if (selectedBannerImage) {
          await addNewImage({
            image: selectedBannerImage,
            isBannerImage: true,
            bannerDescription_en: payload.bannerDescription_en,
            bannerDescription_fr: payload.bannerDescription_fr,
            bannerDescription_rw: payload.bannerDescription_rw,
          })
            .then((res: MessageResponse) => {
              toast({
                title: "Add Banner Image message!",
                description: res?.message || "Banner Image saved successfully",
                status: "success",
              });
              props.fetchBannerImages();
              setSelectedBannerImage(null);
              props.onClose();
            })
            .catch((error) => {
              toast({
                title: "Add Banner Image message",
                description:
                  error.response.data?.message || "Error saving banner image!",
                status: "error",
              });
            });
          reset();
        }
      } else if (bannerImageToEdit) {
        const editPayload: UpdateBannerImageForm = {
          imageId: bannerImageToEdit.id,
          bannerDescription_en: payload.bannerDescription_en,
          bannerDescription_fr: payload.bannerDescription_fr,
          bannerDescription_rw: payload.bannerDescription_rw,
          isActive: `${bannerImageToEdit.isActive}`,
          image: selectedBannerImage ?? null
        };
        await updateImage({
          ...editPayload,
          isBannerImage: `${bannerImageToEdit.isBannerImage}`,
        })
          .then((res: MessageResponse) => {
            toast({
              title: "Update Banner Image Message",
              description: res?.message || "Banner Image updated successfully",
              status: "success",
            });
            props.fetchBannerImages();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Update Banner Image Message",
              description:
                error.response.data?.message || "Error updating banner Image!",
              status: "error",
            });
          });
      }
      reset();
    }
  };

  return (
    <Box >
    <Box >
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          columnGap='4'
          rowGap='4'
          w='full'
          data-testid='form-skeleton'
        >
          <Stack>
            <FormTextarea
              name="bannerDescription_en"
              register={register}
              errors={errors}
              label="Banner description (en)"
              placeholder="Enter banner description (en)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="bannerDescription_fr"
              register={register}
              errors={errors}
              label="Banner description (fr)"
              placeholder="Enter banner description (fr)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormTextarea
              name="bannerDescription_rw"
              register={register}
              errors={errors}
              label="Banner description (rw)"
              placeholder="Enter banner description (rw)"
              textareaProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
          </Stack>
          <FileUploadModal setFile={(file) => setSelectedBannerImage(file)} imageUrl={bannerImageToEdit?.imageUrl || undefined} width="20rem" height="full" />
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
        alertText={`Are you sure you want to ${bannerImageToEdit ? "edit" : "add"
          } this language?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newLanguagePayload)}
      />
    </Box>
  );
};

export default AddBannerImageCard;
