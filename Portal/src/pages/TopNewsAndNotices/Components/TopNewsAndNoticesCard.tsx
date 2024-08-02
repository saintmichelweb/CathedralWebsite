import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import {
  MessageResponse,
  TopNewsAndNoticesResponse,
} from "../../../types/apiResponses";
import {
  TopNewsAndNoticesForm,
  topParishNewsAndNoticesSchema,
  UpdateTopNewsAndNoticesForm,
} from "../../../lib/validations/topParishNewsAndNotices";
import {
  addNewTopNewsAndNotices,
  updateTopNewsAndNotices,
} from "../../../api/topNewsAndNotices";

interface AddTopNewsOrNoticeProps {
  onClose: () => void;
  fetchTopNewsAndNotices: () => void;
  topParishNewsOrNotice: TopNewsAndNoticesResponse | null;
}

const AddTopParishNewsOrNoticeCard = (props: AddTopNewsOrNoticeProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<TopNewsAndNoticesForm>({
    resolver: zodResolver(topParishNewsAndNoticesSchema),
  });

  const toast = useToast();
  const topParishNewsOrNOticeToEdit = props.topParishNewsOrNotice;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newTopParishNewsOrNoticePayload, setNewTopParishNewsOrNoticePayload] =
    useState<TopNewsAndNoticesForm>();

  const onSubmit = async (values: TopNewsAndNoticesForm) => {
    setNewTopParishNewsOrNoticePayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (topParishNewsOrNOticeToEdit) {
      setValue("title_en", topParishNewsOrNOticeToEdit.title_en);
      setValue("title_fr", topParishNewsOrNOticeToEdit.title_fr);
      setValue("title_rw", topParishNewsOrNOticeToEdit.title_rw);
      setValue("description_en", topParishNewsOrNOticeToEdit.description_en);
      setValue("description_fr", topParishNewsOrNOticeToEdit.description_fr);
      setValue("description_rw", topParishNewsOrNOticeToEdit.description_rw);
    }
  }, [topParishNewsOrNOticeToEdit]);

  const onConfirm = async (payload: TopNewsAndNoticesForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!topParishNewsOrNOticeToEdit) {
        await addNewTopNewsAndNotices(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Top News / Notice message!",
              description:
                res?.message || "Top News / Notice saved successfully",
              status: "success",
            });
            props.fetchTopNewsAndNotices();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Top News / Notice message",
              description:
                error.response.data?.message || "Error top news / notice!",
              status: "error",
            });
          });
        reset();
      } else if (topParishNewsOrNOticeToEdit) {
        const editPayload: UpdateTopNewsAndNoticesForm = {
          title_en: payload.title_en,
          title_fr: payload.title_fr,
          title_rw: payload.title_rw,
          description_en: payload.description_en,
          description_fr: payload.description_fr,
          description_rw: payload.description_rw,
          isActive: topParishNewsOrNOticeToEdit.isActive,
          topNewsOrNoticeId: topParishNewsOrNOticeToEdit.id,
        };
        await updateTopNewsAndNotices(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit Top News / Notice message!",
              description:
                res?.message || "Top News / Notice edited successfully",
              status: "success",
            });
            props.fetchTopNewsAndNotices();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit Top News / Notice message",
              description:
                error.response?.data?.message ||
                "Error editing Top News / Notice!",
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
          name="title_en"
          register={register}
          errors={errors}
          label="Event title (EN)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="title_fr"
          register={register}
          errors={errors}
          label="Event title (FR)"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="title_rw"
          register={register}
          errors={errors}
          label="Event title (RW)"
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
          topParishNewsOrNOticeToEdit ? "edit" : "add"
        } this Top News / Notice?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newTopParishNewsOrNoticePayload)}
      />
    </Box>
  );
};

export default AddTopParishNewsOrNoticeCard;
