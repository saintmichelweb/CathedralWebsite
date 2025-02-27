import { useEffect, useState } from "react";
import { Box, Divider, HStack, Stack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertDialog, CustomButton } from "../../../components/ui";
import { FormInput, FormTextarea } from "../../../components/form";
import { MessageResponse, UsersResponse } from "../../../types/apiResponses";
import {
  AddNewUserForm,
  addNewUserSchema,
  EditUserForm,
} from "../../../lib/validations/addNewUser";
import { createUser, updateUser } from "../../../api/users";

interface AddUserProps {
  onClose: () => void;
  fetchUsers: () => void;
  user: UsersResponse | null;
}

const AddUserCard = (props: AddUserProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddNewUserForm>({
    resolver: zodResolver(addNewUserSchema),
  });

  const toast = useToast();
  const userToEdit = props.user;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newUserPayload, setNewUserPayload] = useState<AddNewUserForm>();
  //   const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (values: AddNewUserForm) => {
    setNewUserPayload(values);
    setIsOpenModal(true);
  };

  useEffect(() => {
    if (userToEdit) {
      setValue("name", userToEdit.name);
      setValue("email", userToEdit.email);
      setValue("phone", userToEdit.phone_number);
      setValue("position", userToEdit.position);
      //   setValue("status", userToEdit.status);
      //   setValue(
      //     "backgroundImageId",
      //     userToEdit?.backgroundImage?.id || null
      //   );
    }
  }, [userToEdit]);

  const onConfirm = async (payload: AddNewUserForm | undefined) => {
    setIsOpenModal(false);
    if (payload) {
      //   if (selectedImage) {
      //     console.log("adding new image");
      //     await addNewImage({ image: selectedImage, isBannerImage: false })
      //       .then((res) => {
      //         toast({
      //           title: "Add Image message!",
      //           description: res?.message || "Image saved successfully",
      //           status: "success",
      //         });
      //         payload.backgroundImageId = res.image.id;
      //       })
      //       .catch((error) => {
      //         toast({
      //           title: "Add Image message",
      //           description:
      //             error.response.data?.message || "Error saving image!",
      //           status: "error",
      //         });
      //       });
      //   }

      if (!userToEdit) {
        await createUser(payload)
          .then((res: MessageResponse) => {
            toast({
              title: "Add User message!",
              description: res?.message || "User saved successfully",
              status: "success",
            });
            props.fetchUsers();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Add User message",
              description: error.response.data?.message || "Error saving user!",
              status: "error",
            });
          });
        reset();
      } else if (userToEdit) {
        const editPayload: EditUserForm = {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          position: payload.position,
          status: userToEdit.status,
          userId: userToEdit.id,
          //   backgroundImageId: userToEdit.backgroundImage?.id || null,
        };
        await updateUser(editPayload)
          .then((res: MessageResponse) => {
            toast({
              title: "Edit User message!",
              description: res?.message || "User edited successfully",
              status: "success",
            });
            props.fetchUsers();
            props.onClose();
          })
          .catch((error) => {
            toast({
              title: "Edit User message",
              description:
                error.response?.data?.message || "Error editing user!",
              status: "error",
            });
          });
      }
      reset();
    }
  };

  return (
    <Box >
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          register={register}
          errors={errors}
          label="name"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="phone"
          register={register}
          errors={errors}
          label="Telephone"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
        />
        <FormInput
          name="email"
          register={register}
          errors={errors}
          label="Email"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
          //   placeholder="enter user email"
        />
        <FormInput
          name="position"
          register={register}
          errors={errors}
          label="Position"
          inputProps={{ bg: "white" }}
          maxW={{ base: "25rem", sm: "90vw" }}
          //   placeholder="enter user position"
        />
        {/* {!userToEdit && (
          <ImageUploader
            parentSetSelectedImage={(file: File) => setSelectedImage(file)}
          />
        )} */}
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
          userToEdit ? "edit" : "add"
        } this user?`}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => onConfirm(newUserPayload)}
      />
    </Box>
  );
};

export default AddUserCard;
