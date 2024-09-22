import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  HStack,
  Stack,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type LocationForm,
  LocationSchema,
} from "../../../lib/validations/location";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { addNewLocation, updateLocation } from "../../../api/location";
import { LocationResponse, MessageResponse } from "../../../types/apiResponses";
import { UpdateLocationForm } from '../../../lib/validations/location';

interface AddLocationProps {
  onClose: () => void
  fetchLocations: () => void
  location: LocationResponse | null
}

const AddLocationCard = (props: AddLocationProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<LocationForm>({
    resolver: zodResolver(LocationSchema),
  });
  const toast = useToast();
  const locationToEdit = props.location
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isMassLocation, setIsMassLocation] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<LocationForm>();

  const onSubmit = async (values: LocationForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (locationToEdit) {
      setValue('location', locationToEdit.location)
      setValue('isMassLocation', locationToEdit.isMassLocation)
    }
  },[locationToEdit])

  const onConfirm = async (payload: LocationForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      if (!locationToEdit) {
        await addNewLocation(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add Location message!",
              description: res?.message || "Location saved successfully",
              status: "success",
            });
            props.fetchLocations()
            props.onClose()
          })
          .catch((error) => {
            toast({
              title: "Add Location message",
              description:
                error.response.data?.message || "Error saving location!",
              status: "error",
            });
          });
          reset();
      } else if(locationToEdit){
        const editPayload: UpdateLocationForm = {
          location: payload.location,
          locationId: locationToEdit.id,
          isActive: locationToEdit.isActive,
          isMassLocation: locationToEdit.isActive,
        }
        await updateLocation(editPayload).then((res: MessageResponse) => {
          toast({
            title: "Edit Location message!",
            description: res?.message || "Location edited successfully",
            status: "success",
          });
          props.fetchLocations()
          props.onClose()
        })
        .catch((error) => {
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
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="location"
          register={register}
          errors={errors}
          label="location"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        {/* <label>Is Mass location</label> */}
        <Checkbox
          name="Does location host Masses"
          isChecked={isMassLocation}
          // label="Is Mass location?"
          onChange={() => {
            setIsMassLocation(!isMassLocation)
            setValue('isMassLocation', !isMassLocation)
          }}
          aria-label='Select row'
          borderColor='blackAlpha.400'
          bgColor={'white'}
          p={2}
        >Is Mass location</Checkbox>
        <Divider mt={2} color={"gray.400"} />
        <HStack spacing="3" alignSelf="center" mt="2">
          <CustomButton type="submit" isLoading={false} minW={"8rem"}>
            Submit
          </CustomButton>

          <CustomButton
            bg={"gray"}
            minW={"8rem"}
            onClick={() => {
              props.onClose()
            }}
          >
            Cancel
          </CustomButton>
        </HStack>
      </Stack>
      <AlertDialog
        alertText={`Are you sure you want to ${locationToEdit? 'edit' : 'add'} this location?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  );
};

export default AddLocationCard;
