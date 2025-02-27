import { useEffect, useState } from "react";
import {
  Box,
  // Card,
  // Checkbox,
  Divider,
  // Heading,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectOption } from "../../../types/forms";

import { AlertDialog, CustomButton } from "../../../components/ui";
import { CustomFormSelect, FormInput } from "../../../components/form";
import { getLocations } from "../../../api/location";
import { LocationResponse, OfficeHoursResponse, MessageResponse } from "../../../types/apiResponses";
import { MassDaysEnum_FR, MassDaysEnum_EN, MassDaysEnum_RW } from "../../../../../shared-lib/src";
import { OfficeHoursForm, OfficeHoursSchema, UpdateOfficeHoursForm } from "../../../lib/validations/officeHours";
import { addNewOfficeHour, updateOfficeHour } from "../../../api/officeHours";

interface AddOfficeHourTimesProps {
  onClose: () => void;
  fetchOfficeHours: () => void;
  officeHour: OfficeHoursResponse | null;
}

const OfficetimeCard = (props: AddOfficeHourTimesProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<OfficeHoursForm>({
    resolver: zodResolver(OfficeHoursSchema),
  });
  const toast = useToast();
  const OfficeHourToEdit = props.officeHour;
  const locationSelectOptions: SelectOption[] = [];
  const [officeHourLocation, setOfficeHourLocation] = useState<SelectOption | null>(null);
  // const [officeHourLanguage, setOfficeHourLanguage] = useState<SelectOption | null>(null);
  const [officeHourDay_en, setOfficeHourDay_en] = useState<SelectOption | null>(null);
  const [officeHourDay_fr, setOfficeHourDay_fr] = useState<SelectOption | null>(null);
  const [officeHourDay_rw, setOfficeHourDay_rw] = useState<SelectOption | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<OfficeHoursForm>();

  const officeHourDaysOptions_en = Object.values(MassDaysEnum_EN).map(value => ({
    value,
    label: value,
  }))
  const officeHourDaysOptions_fr = Object.values(MassDaysEnum_FR).map(value => ({
    value,
    label: value,
  }))
  const officeHourDaysOptions_rw = Object.values(MassDaysEnum_RW).map(value => ({
    value,
    label: value,
  }))

  useEffect(() => {
    if (OfficeHourToEdit) {
      setValue("day_en", OfficeHourToEdit.day_en);
      setValue("day_fr", OfficeHourToEdit.day_fr);
      setValue("day_rw", OfficeHourToEdit.day_rw);
      setValue("time", OfficeHourToEdit.time);
      setValue("office_place", OfficeHourToEdit.office_place.id);
      setOfficeHourLocation({
        value: OfficeHourToEdit.office_place.id,
        label: OfficeHourToEdit.office_place.location,
      });
      setOfficeHourDay_en({
        value: OfficeHourToEdit.day_en,
        label: OfficeHourToEdit.day_en,
      });
      setOfficeHourDay_fr({
        value: OfficeHourToEdit.day_fr,
        label: OfficeHourToEdit.day_fr,
      });
      setOfficeHourDay_rw({
        value: OfficeHourToEdit.day_rw,
        label: OfficeHourToEdit.day_rw,
      });
    }
  }, [OfficeHourToEdit]);

  // useEffect(() => {
  const getAllLocations = async () => {
    await getLocations(false, true).then((data) => {
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

  const onSubmit = async (values: OfficeHoursForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  const onConfirm = async (payload: OfficeHoursForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!OfficeHourToEdit) {
        await addNewOfficeHour(payload)
          .then((res) => {
            toast({
              title: "Add OfficeHour Time message!",
              description: res?.message || "OfficeHour Time saved successfully",
              status: "success",
            });
            props.fetchOfficeHours()
            props.onClose()
          })
          .catch((error) => {
            toast({
              title: "Add OfficeHour Time message",
              description:
                error.response.data?.message || "Error saving OfficeHour Time!",
              status: "error",
            });
          });
        reset();
      } else if (OfficeHourToEdit) {
        const editPayload: UpdateOfficeHoursForm = {
          OfficeHourId: OfficeHourToEdit.id,
          office_place: payload.office_place,
          isActive: OfficeHourToEdit.isActive,
          day_rw: payload.day_rw,
          day_en: payload.day_en,
          day_fr: payload.day_fr,
          time: payload.time
        };
        await updateOfficeHour(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Update OfficeHour Times Message",
              description: res?.message || "OfficeHour Times status changed successfully",
              status: "success",
            });
            props.fetchOfficeHours()
            props.onClose()
          })
          .catch((error) => {
            toast({
              title: "Update OfficeHour Times Message",
              description:
                error.response.data?.message || "Error editing officeHour times status!",
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
          selectValue={officeHourLocation}
          isError={errors.office_place ? true : false}
          errorMsg={errors.office_place ? errors.office_place.message : undefined}
          label="Location"
          placeholder="Choose officeHour location"
          options={locationSelectOptions}
          onChangeFn={(selectedVal) => {
            setOfficeHourLocation(selectedVal);
            if (selectedVal) {
              setValue("office_place", Number(selectedVal.value));
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        {/* <CustomFormSelect
          selectValue={officeHourLanguage}
          isError={errors.language ? true : false}
          errorMsg={errors.language ? errors.language.message : undefined}
          label="Language"
          placeholder="Choose officeHour language"
          options={languageSelectOptions}
          onChangeFn={(selectedVal) => {
            setOfficeHourLanguage(selectedVal);
            if (selectedVal) {
              setValue("language", Number(selectedVal.value));
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        /> */}
        <CustomFormSelect
          selectValue={officeHourDay_en}
          isError={errors.day_en ? true : false}
          errorMsg={errors.day_en ? errors.day_en.message : undefined}
          label="Day"
          placeholder="Choose the day (en)"
          options={officeHourDaysOptions_en}
          onChangeFn={(selectedVal) => {
            setOfficeHourDay_en(selectedVal);
            if (selectedVal) {
              setValue("day_en", selectedVal.value.toString());
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={officeHourDay_fr}
          isError={errors.day_fr ? true : false}
          errorMsg={errors.day_fr ? errors.day_fr.message : undefined}
          label="Jour"
          placeholder="Choisissez le jour de la messe"
          options={officeHourDaysOptions_fr}
          onChangeFn={(selectedVal) => {
            setOfficeHourDay_fr(selectedVal);
            if (selectedVal) {
              setValue("day_fr", selectedVal.value.toString());
            }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={officeHourDay_rw}
          isError={errors.day_rw ? true : false}
          errorMsg={errors.day_rw ? errors.day_rw.message : undefined}
          label="Umunsi"
          placeholder="Hitamo umunsi wa Misa"
          options={officeHourDaysOptions_rw}
          onChangeFn={(selectedVal) => {
            setOfficeHourDay_rw(selectedVal);
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
          label="Time"
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
        alertText={`re you sure you want to ${OfficeHourToEdit ? "update" : "add"
          } this OfficeHour time?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  );
};

export default OfficetimeCard;
