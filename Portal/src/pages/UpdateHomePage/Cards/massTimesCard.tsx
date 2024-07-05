import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SelectOption } from "../../../types/forms";
import {
  MassTimesSchema,
  type MassTimesForm,
} from "../../../lib/validations/massTimes";
import { AlertDialog, CustomButton, Skeleton } from "../../../components/ui";
import { CustomFormSelect, FormInput } from "../../../components/form";


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
    let selectOptions: SelectOption[] = [];

    selectOptions = [{
        value: 'none',
        label: 'none yet'
    }]
  
    // const [isDfspUser, setIsDfspUser] = useState(false)
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
        // if (user && props.onCloseModal) {
        //   const updatePayload: EditUserForm = {
        //     ...payload,
        //     userId: user.id,
        //   }
        //   props.onCloseModal()
        // } else {
        // }
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
                //   isError={errors.dfsp_id ? true : false}
                //   errorMsg={errors.dfsp_id ? errors.dfsp_id.message : undefined}
                  label='Location'
                  placeholder='Choose mass location'
                  options={selectOptions}
                  onChangeFn={selectedVal => {
                    setMassLocation(selectedVal)
                    if (selectedVal) {
                      setValue('location', selectedVal.value.toString())
                    }
                  }}
                  maxWVal={{ lg: '25rem', sm: '90vw' }}
                />
            <CustomFormSelect
                  selectValue={massLanguage}
                //   isError={errors.dfsp_id ? true : false}
                //   errorMsg={errors.dfsp_id ? errors.dfsp_id.message : undefined}
                  label='Language'
                  placeholder='Choose mass language'
                  options={selectOptions}
                  onChangeFn={selectedVal => {
                    setMassLanguage(selectedVal)
                    if (selectedVal) {
                      setValue('language', selectedVal.value.toString())
                    }
                  }}
                  maxWVal={{ lg: '25rem', sm: '90vw' }}
                />
            <FormInput
              name="time"
              register={register}
              errors={errors}
              label="Mass time"
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


  export default MasstimesCard