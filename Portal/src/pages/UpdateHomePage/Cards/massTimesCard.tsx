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

import { SelectOption } from "../../../types/forms";
import {
  MassTimesSchema,
  type MassTimesForm,
} from "../../../lib/validations/massTimes";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { CustomFormSelect, FormInput } from "../../../components/form";
import { getLocations } from "../../../api/location";
import { getLanguages } from "../../../api/language";
import { addNewMassTime } from "../../../api/massTimes";

const MasstimesCard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<MassTimesForm>({
    resolver: zodResolver(MassTimesSchema),
  });

  const locationSelectOptions: SelectOption[] = [];
  const languageSelectOptions: SelectOption[] = [];

  useEffect(() => {
    const getAllLocations = async () => {
      await getLocations().then((data) => {
        data.locations.map((dataLocation) => {
          locationSelectOptions.push({
            value: dataLocation.location,
            label: dataLocation.location,
          });
        });
      });
    };
    if (locationSelectOptions.length <= 0) {
      getAllLocations();
    }

    const getAllLanguages = async () => {
      await getLanguages().then((data) => {
        console.log(data.languageCount);
        data.languages.map((dataLanguage) => {
          languageSelectOptions.push({
            value: dataLanguage.language,
            label: dataLanguage.language,
          });
        });
      });
    };

    if (languageSelectOptions.length <= 0) {
      getAllLanguages();
    }
  });

  const toast = useToast()

  const [massLocation, setMassLocation] = useState<SelectOption | null>(null);
  const [massLanguage, setMassLanguage] = useState<SelectOption | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<MassTimesForm>();

  const onSubmit = async (values: MassTimesForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  const onConfirm = async (payload: MassTimesForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      await addNewMassTime(payload).then((res) => {
        toast({
          title: 'Add Mass Time message!',
          description: res?.message || 'Mass Time saved successfully',
          status: 'success',
        })
      }).catch(error => {
        toast({
          title: 'Add Mass Time message',
          description: error.response.data?.message || 'Error saving Mass Time!',
          status: 'error',
        })
      })
      reset();
    }
  };

  return (
    <Box>
      <Card p={5} maxW={{ lg: "25rem", sm: "full" }}>
        <Heading size="md" mb="10">
          Add Mass time
        </Heading>
        <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormSelect
            selectValue={massLocation}
              isError={errors.location ? true : false}
              errorMsg={errors.location ? errors.location.message : undefined}
            label="Location"
            placeholder="Choose mass location"
            options={locationSelectOptions}
            onChangeFn={(selectedVal) => {
              setMassLocation(selectedVal);
              if (selectedVal) {
                setValue("location", selectedVal.value.toString());
              }
            }}
            maxWVal={{ lg: "25rem", sm: "90vw" }}
          />
          <CustomFormSelect
            selectValue={massLanguage}
              isError={errors.language ? true : false}
              errorMsg={errors.language ? errors.language.message : undefined}
            label="Language"
            placeholder="Choose mass language"
            options={languageSelectOptions}
            onChangeFn={(selectedVal) => {
              setMassLanguage(selectedVal);
              if (selectedVal) {
                setValue("language", selectedVal.value.toString());
              }
            }}
            maxWVal={{ lg: "25rem", sm: "90vw" }}
          />
          <FormInput
            name="day"
            register={register}
            errors={errors}
            label="Day of the Mass"
            inputProps={{ bg: "white" }}
            maxW={{ base: "25rem", sm: "90vw" }}
          />
          <FormInput
            name="time"
            register={register}
            errors={errors}
            label="Time of the Mass"
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
                // if (user && props.onCloseModal) {
                //   props.onCloseModal();
                // } else {
                //   navigate(-1);
                // }
              }}
            >
              Cancel
            </CustomButton>
          </HStack>
        </Stack>
      </Card>
      <AlertDialog
        alertText={"Are you sure you want to add this user?"}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  );
};

export default MasstimesCard;
