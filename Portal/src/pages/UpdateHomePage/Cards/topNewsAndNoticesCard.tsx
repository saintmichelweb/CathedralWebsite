import { useState } from "react";
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
    topParishNewsAndNoticesSchema,
  type TopNewsAndNoticesForm,
} from "../../../lib/validations/recentEvents";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput } from "../../../components/form";
import { addNewTopNewsAndNotices } from "../../../api/topNewsAndNotices";


const TopParishNewsAndNoticesCard = () => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
      // setValue,
    } = useForm<TopNewsAndNoticesForm>({
      resolver: zodResolver(topParishNewsAndNoticesSchema),
    });
    const toast = useToast()
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [newUserPayload, setNewUserPayload] = useState<TopNewsAndNoticesForm>();
  
    const onSubmit = async (values: TopNewsAndNoticesForm) => {
      setNewUserPayload(values);
      setIsOpenModal(true);
    };
  
    const onConfirm = async (payload: TopNewsAndNoticesForm | undefined) => {
      setIsOpenModal(false);
      if (payload) {
        await addNewTopNewsAndNotices(payload).then((res) => {
          toast({
            title: 'Add Top News And Notices message!',
            description: res?.message || 'Top News And Notices saved successfully',
            status: 'success',
          })
        }).catch(error => {
          toast({
            title: 'Add Top News And Noticesmessage',
            description: error.response.data?.message || 'Error saving Top News And Notices!',
            status: 'error',
          })
        })
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
      <Box  py={"2rem"}>
        <Card p={5} maxW={{ lg: "25rem", sm: "full" }}>
          <Heading size="md" mb="10">
            Add Top News And Notice
          </Heading>
          <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="title"
              register={register}
              errors={errors}
              label="News/Notice title"
              inputProps={{ bg: "white" }}
              maxW={{ base: "25rem", sm: "90vw" }}
            />
            <FormInput
              name="description"
              register={register}
              errors={errors}
              label="Descrition"
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


  export default TopParishNewsAndNoticesCard