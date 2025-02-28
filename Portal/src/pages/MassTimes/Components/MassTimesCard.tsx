import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectOption } from "../../../types/forms";
import {
  MassTimesSchema,
  UpdateMassTimesForm,
  type MassTimesForm,
} from "../../../lib/validations/massTimes";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { CustomFormSelect, FormInput } from "../../../components/form";
import { getLocations } from "../../../api/location";
import { getLanguages } from "../../../api/language";
import { addNewMassTime, updateMassTime } from "../../../api/massTimes";
import {
  LanguageResponse,
  LocationResponse,
  MassTimesResponse,
  MessageResponse,
} from "../../../types/apiResponses";
import {
  MassDaysEnum_FR,
  MassDaysEnum_EN,
  MassDaysEnum_RW,
} from "../../../../../shared-lib/src";

interface AddMassTimesProps {
  onClose: () => void;
  fetchMassTimes: () => void;
  massTime: MassTimesResponse | null;
}

const AddMasstimeCard = (props: AddMassTimesProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<MassTimesForm>({
    resolver: zodResolver(MassTimesSchema),
  });
  const toast = useToast();
  const massTimeToEdit = props.massTime;
  const locationSelectOptions: SelectOption[] = [];
  const languageSelectOptions: SelectOption[] = [];
  const [massLocation, setMassLocation] = useState<SelectOption | null>(null);
  const [massLanguage, setMassLanguage] = useState<SelectOption | null>(null);
  const [massDay_en, setMassDay_en] = useState<SelectOption | null>(null);
  const [massDay_fr, setMassDay_fr] = useState<SelectOption | null>(null);
  const [massDay_rw, setMassDay_rw] = useState<SelectOption | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<MassTimesForm>();

  const massDaysOptions_en = Object.values(MassDaysEnum_EN).map((value) => ({
    value,
    label: value,
  }));
  const massDaysOptions_fr = Object.values(MassDaysEnum_FR).map((value) => ({
    value,
    label: value,
  }));
  const massDaysOptions_rw = Object.values(MassDaysEnum_RW).map((value) => ({
    value,
    label: value,
  }));

  useEffect(() => {
    if (massTimeToEdit) {
      setValue("day_en", massTimeToEdit.day_en);
      setValue("day_fr", massTimeToEdit.day_fr);
      setValue("day_rw", massTimeToEdit.day_rw);
      setValue("time", massTimeToEdit.time);
      setValue("language", massTimeToEdit.language.id);
      setValue("location", massTimeToEdit.location.id);
      setMassLocation({
        value: massTimeToEdit.location.id,
        label: massTimeToEdit.location.location,
      });
      setMassLanguage({
        value: massTimeToEdit.language.id,
        label: massTimeToEdit.language.language,
      });
      setMassDay_en({
        value: massTimeToEdit.day_en,
        label: massTimeToEdit.day_en,
      });
      setMassDay_fr({
        value: massTimeToEdit.day_fr,
        label: massTimeToEdit.day_fr,
      });
      setMassDay_rw({
        value: massTimeToEdit.day_rw,
        label: massTimeToEdit.day_rw,
      });
    }
  }, [massTimeToEdit]);

  useEffect(() => {
    const getAllLocations = async () => {
      await getLocations({ page: undefined }, true, true).then((data) => {
        data.locations.map((dataLocation: LocationResponse) => {
          locationSelectOptions.push({
            value: dataLocation.id,
            label: dataLocation.location,
          });
        });
      });
    };
    if (locationSelectOptions.length == 0) {
      getAllLocations();
    }

    const getAllLanguages = async () => {
      await getLanguages({ page: undefined }, true).then((data) => {
        data.languages.map((dataLanguage: LanguageResponse) => {
          languageSelectOptions.push({
            value: dataLanguage.id,
            label: dataLanguage.language,
          });
        });
      });
    };

    if (languageSelectOptions.length == 0) {
      getAllLanguages();
    }
  }, []);

  const onSubmit = async (values: MassTimesForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  const onConfirm = async (payload: MassTimesForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!massTimeToEdit) {
        await addNewMassTime(payload)
          .then((res) => {
            toast({
              title: "Add Mass Time message!",
              description: res?.message || "Mass Time saved successfully",
              status: "success",
            });
            props.fetchMassTimes();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add Mass Time message",
              description:
                error.response.data?.message || "Error saving Mass Time!",
              status: "error",
            });
          });
        reset();
      } else if (massTimeToEdit) {
        const editPayload: UpdateMassTimesForm = {
          massTimeId: massTimeToEdit.id,
          location: payload.location,
          language: payload.language,
          isActive: massTimeToEdit.isActive,
          day_rw: payload.day_rw,
          day_en: payload.day_en,
          day_fr: payload.day_fr,
          time: payload.time,
        };
        await updateMassTime(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Update Mass Times Message",
              description:
                res?.message || "Mass Times status changed successfully",
              status: "success",
            });
            props.fetchMassTimes();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Update Mass Times Message",
              description:
                error.response.data?.message ||
                "Error editing mass times status!",
              status: "error",
            });
          });
      }
    }
  };

  return (
    <Box>
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <CustomFormSelect
          selectValue={massLocation}
          isError={errors.location ? true : false}
          errorMsg={errors.location ? errors.location.message : undefined}
          label="Location"
          placeholder="Choose location"
          options={locationSelectOptions}
          onChangeFn={(selectedVal) => {
            setMassLocation(selectedVal);
            if (selectedVal) {
              setValue("location", Number(selectedVal.value));
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={massLanguage}
          isError={errors.language ? true : false}
          errorMsg={errors.language ? errors.language.message : undefined}
          label="Language"
          placeholder="Choose language"
          options={languageSelectOptions}
          onChangeFn={(selectedVal) => {
            setMassLanguage(selectedVal);
            if (selectedVal) {
              setValue("language", Number(selectedVal.value));
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={massDay_en}
          isError={errors.day_en ? true : false}
          errorMsg={errors.day_en ? errors.day_en.message : undefined}
          label="Day (en)"
          placeholder="Choose day (en)"
          options={massDaysOptions_en}
          onChangeFn={(selectedVal) => {
            setMassDay_en(selectedVal);
            if (selectedVal) {
              setValue("day_en", selectedVal.value.toString());
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={massDay_fr}
          isError={errors.day_fr ? true : false}
          errorMsg={errors.day_fr ? errors.day_fr.message : undefined}
          label="Day (fr)"
          placeholder="Choose day (fr)"
          options={massDaysOptions_fr}
          onChangeFn={(selectedVal) => {
            setMassDay_fr(selectedVal);
            if (selectedVal) {
              setValue("day_fr", selectedVal.value.toString());
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={massDay_rw}
          isError={errors.day_rw ? true : false}
          errorMsg={errors.day_rw ? errors.day_rw.message : undefined}
          label="Day (rw)"
          placeholder="Choose day (rw)"
          options={massDaysOptions_rw}
          onChangeFn={(selectedVal) => {
            setMassDay_rw(selectedVal);
            if (selectedVal) {
              setValue("day_rw", selectedVal.value.toString());
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <FormInput
          name="time"
          register={register}
          errors={errors}
          label="Time of the Mass"
          placeholder="Enter time"
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
              props.onClose();
            }}
          >
            Cancel
          </CustomButton>
        </HStack>
      </Stack>
      <AlertDialog
        alertText={`re you sure you want to ${
          massTimeToEdit ? "update" : "add"
        } this Mass time?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  );
};

export default AddMasstimeCard;
