import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { CustomFormSelect, FormInput } from "../../../components/form";
import {
  MiryangoremezoResponse,
  MessageResponse,
  MpuzaResponse,
} from "../../../types/apiResponses";
import {
  addNewMuryangoRemezo,
  updateMuryangoRemezo,
} from "../../../api/MiryangoRemezo";
import {
  AddMiryangoRemezoForm,
  miryangoRemezoSchema,
  UpdateMiryangoRemezoForm,
} from "../../../lib/validations/MiryangoRemezo";
import { SelectOption } from "../../../types/forms";
import { getAllMpuza } from "../../../api/MpuzaMiryangoRemezo";

interface AddMuryangoRemezoProps {
  onClose: () => void;
  fetchMuryangoRemezo: () => void;
  MuryangoRemezo: MiryangoremezoResponse | null;
}

const AddMuryangoRemezoCard = (props: AddMuryangoRemezoProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddMiryangoRemezoForm>({
    resolver: zodResolver(miryangoRemezoSchema),
  });

  const toast = useToast();
  const MuryangoRemezoToEdit = props.MuryangoRemezo;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newRecentEventPayload, setNewRecentEventPayload] =
    useState<AddMiryangoRemezoForm>();
  const [mpuza, setMpuza] = useState<SelectOption | null>(null);
  const [MpuzaSelectOptions, setMpuzaSelectOptions] = useState<
    SelectOption[]
  >([]);

  const onSubmit = async (values: AddMiryangoRemezoForm) => {
    setNewRecentEventPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (MuryangoRemezoToEdit) {
      setValue("title", MuryangoRemezoToEdit.title);
      setValue("header", MuryangoRemezoToEdit.header);
      setValue("phone", MuryangoRemezoToEdit.phone);
      setValue("mpuzaId", MuryangoRemezoToEdit.mpuza.id);
      setMpuza({
        value: MuryangoRemezoToEdit.mpuza.id,
        label: MuryangoRemezoToEdit.mpuza.title,
      });
    }
  }, [MuryangoRemezoToEdit, setValue]);

  useEffect(() => {
    const getMPuzaMiryangoremezo = async () => {
      await getAllMpuza({ page: undefined }).then((data) => {
        const newMpuzaSelectOptions = data.mpuzaMiryangoRemezo.map(
          (dataLocation: MpuzaResponse) => ({
            value: dataLocation.id,
            label: dataLocation.title,
          })
        );
        setMpuzaSelectOptions(newMpuzaSelectOptions);
      });
    };

    if (MpuzaSelectOptions.length === 0) {
      getMPuzaMiryangoremezo();
    }
  });

  const onConfirm = async (payload: AddMiryangoRemezoForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!MuryangoRemezoToEdit) {
        await addNewMuryangoRemezo(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add MuryangoRemezo message!",
              description: res?.message || "MuryangoRemezo saved successfully",
              status: "success",
            });
            props.fetchMuryangoRemezo();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add MuryangoRemezo message",
              description:
                error.response.data?.message || "Error saving recent Event!",
              status: "error",
            });
          });
        reset();
      } else if (MuryangoRemezoToEdit) {
        const editPayload: UpdateMiryangoRemezoForm = {
          title: payload.title,
          header: payload.header,
          phone: payload.phone,
          mpuzaId: payload.mpuzaId,
          muryangoRemezoId: MuryangoRemezoToEdit?.id || null,
        };
        await updateMuryangoRemezo(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit MuryangoRemezo message!",
              description: res?.message || "MuryangoRemezo edited successfully",
              status: "success",
            });
            props.fetchMuryangoRemezo();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit MuryangoRemezo message",
              description:
                error.response?.data?.message ||
                "Error editing MuryangoRemezo!",
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
        <Stack>
          <CustomFormSelect
            selectValue={mpuza}
            isError={errors.mpuzaId ? true : false}
            errorMsg={errors.mpuzaId ? errors.mpuzaId.message : undefined}
            label="Mpuzamuryango remezo"
            placeholder="Choose mpuzamuryango remezo"
            options={MpuzaSelectOptions}
            onChangeFn={(selectedVal: SelectOption | null) => {
              setMpuza(selectedVal);
              if (selectedVal) {
                setValue("mpuzaId", Number(selectedVal.value));
              }
            }}
            maxWVal={{ lg: "full", sm: "90vw" }}
          />
          <FormInput
            name="title"
            register={register}
            errors={errors}
            label="Title"
            placeholder="Enter title"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
          <FormInput
            name="header"
            register={register}
            errors={errors}
            label="Header"
            placeholder="Enter header"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
          <FormInput
            name="phone"
            register={register}
            errors={errors}
            label="Phone"
            placeholder="Enter phone"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
        </Stack>
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
          MuryangoRemezoToEdit ? "edit" : "add"
        } this MuryangoRemezo?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newRecentEventPayload)}
      />
    </Box>
  );
};

export default AddMuryangoRemezoCard;
