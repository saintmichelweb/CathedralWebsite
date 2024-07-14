import { useEffect, useState } from "react";
import {
  Box,
  Card,
  // Checkbox,
  Divider,
  Heading,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type LanguageForm,
  massLanguageSchema,
  UpdateLanguageForm,
} from "../../../lib/validations/language";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { addNewLanguage, updateLanguage } from "../../../api/language";
import { LanguageResponse } from "../../../types/apiResponses";

interface AddLanguageProps {
  onClose: () => void;
  fetchLanguages: () => void;
  language: LanguageResponse | null;
}

const AddLanguageCard = (props: AddLanguageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<LanguageForm>({
    resolver: zodResolver(massLanguageSchema),
  });

  const toast = useToast();
  const languageToEdit = props.language;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newLanguagePayload, setNewLanguagePayload] = useState<LanguageForm>();

  const onSubmit = async (values: LanguageForm) => {
    setNewLanguagePayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (languageToEdit) {
      setValue("language", languageToEdit.language);
    }
  }, [languageToEdit]);

  const onConfirm = async (payload: LanguageForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!languageToEdit) {
        await addNewLanguage(payload)
          .then((res) => {
            toast({
              title: "Add Language message!",
              description: res?.message || "Language saved successfully",
              status: "success",
            });
            props.fetchLanguages()
            props.onClose()
          })
          .catch((error) => {
            toast({
              title: "Add Language message",
              description:
                error.response.data?.message || "Error saving language!",
              status: "error",
            });
          });
        reset();
      } else if (languageToEdit) {
        const editPayload: UpdateLanguageForm = {
          language: payload.language,
          languageId: languageToEdit.id,
          isActive: languageToEdit.isActive,
        };
        await updateLanguage(editPayload)
          .then((res: any) => {
            toast({
              title: "Edit Location message!",
              description: res?.message || "Location edited successfully",
              status: "success",
            });
            props.fetchLanguages();
            props.onClose();
          })
          .catch((error: any) => {
            toast({
              title: "Edit Location message",
              description:
                error.response.data?.message || "Error editing location!",
              status: "error",
            });
          });
      }
      reset();
    }
  };

  return (
    <Box py={"2rem"}>
      <Heading size="md" mb="10">
        Add Mass Language
      </Heading>
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="language"
          register={register}
          errors={errors}
          label="language"
          inputProps={{ bg: "white" }}
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
              props.onClose()
            }}
          >
            Cancel
          </CustomButton>
        </HStack>
      </Stack>
      <AlertDialog
        alertText={`Are you sure you want to ${
          languageToEdit ? "edit" : "add"
        } this language?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newLanguagePayload)}
      />
    </Box>
  );
};

export default AddLanguageCard;
