import {
  Stack,
  Flex,
  Heading,
  Card,
  useToast,
  Text,
  Box,
} from "@chakra-ui/react";
import { FormTextarea } from "../../components/form";
import {
  ParishHistoryForm,
  parishHistorySchema,
} from "../../lib/validations/parishHistory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  addOrUpdateParishHistory,
  getParishHistory,
} from "../../api/parishHistory";
import {
  MessageResponse,
  ParishHistoryResponse,
} from "../../types/apiResponses";
import { CustomButton, TableSkeleton } from "../../components/ui";

const ParishHistoryManagement = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<ParishHistoryForm>({
    resolver: zodResolver(parishHistorySchema),
  });
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [parishHistory, setParishHistory] =
    useState<ParishHistoryResponse | null>(null);

  const fetchParishHistory = async () => {
    setLoading(true);
    await getParishHistory()
      .then((data) => {
        console.log("data", data);
        setParishHistory(data.parishHistory);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get History Message",
          description: error.response.data?.message || "Error geting history!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchParishHistory();
  }, []);

  useEffect(() => {
    if (parishHistory) {
        setValue("parishHistory", parishHistory.history);
    }
  }, [parishHistory]);

  const onSubmit = async (payload: ParishHistoryForm) => {
    await addOrUpdateParishHistory(payload)
      .then((res: MessageResponse) => {
        toast({
          title: `${!parishHistory ? "Create" : "Update"} History message!`,
          description: res?.message || "Parish History saved successfully",
          status: "success",
        });
        fetchParishHistory();
      })
      .catch((error) => {
        toast({
          title: `${!parishHistory ? "Create" : "Update"} History message!`,
          description:
            error.response.data?.message || "Error saving parish history!",
          status: "error",
        });
      });
    reset();
  };

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Recent Events Management</Heading>
        </Stack>
      </Flex>
      <Stack
        bg="primaryBackground"
        mx={{ base: "-4", sm: "-6", lg: "-8" }}
        mt="5"
        px="4"
        py="4"
        pb="14"
        flexGrow="1"
        mb="-14"
      >
        {loading ? (
          <TableSkeleton breakpoint="xl" mt={{ base: "3", xl: "4" }} />
        ) : (
          <Stack flexDirection={"row"}>
            <Card width={"50%"} h={"30rem"} mr={"1"} p={"2"}>
              <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)} width={'100%'} >
                <Stack direction={{ base: "column", lg: "row" }}>
                  <Heading size="sm">
                    {" "}
                    {!parishHistory ? "Create" : "Update"} History
                  </Heading>
                </Stack>
                <FormTextarea
                  name="parishHistory"
                  label="History input"
                  register={register}
                  errors={errors}
                  placeholder="Enter parish history"
                />
                <CustomButton type="submit" isLoading={false} minW={"8rem"}>
                  Submit
                </CustomButton>
              </Stack>
            </Card>
            <Card width={"50%"} h={"30rem"} ml={"1"} p={"2"}>
              <Stack direction={"column"}>
                <Heading size="sm">Currently Saved History</Heading>
                <Text>{parishHistory?.history || ''}</Text>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ParishHistoryManagement;
