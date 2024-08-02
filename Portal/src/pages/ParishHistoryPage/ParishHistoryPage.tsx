import {
  Stack,
  Flex,
  Heading,
  Card,
  useToast,
  Text,
  // Box,
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
      setValue("parishHistory_en", parishHistory.history_en);
      setValue("parishHistory_fr", parishHistory.history_fr);
      setValue("parishHistory_rw", parishHistory.history_rw);
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
              <Stack
                as="form"
                spacing="4"
                onSubmit={handleSubmit(onSubmit)}
                width={"100%"}
              >
                <Stack direction={{ base: "column", lg: "row" }}>
                  <Heading size="sm">
                    {" "}
                    {!parishHistory ? "Create" : "Update"} History
                  </Heading>
                </Stack>
                <FormTextarea
                  name="parishHistory_en"
                  label="Cathedral History In Short"
                  register={register}
                  errors={errors}
                  placeholder="Enter parish history"
                />
                <FormTextarea
                  name="parishHistory_fr"
                  label="Histoire de la Cathedrale"
                  register={register}
                  errors={errors}
                  placeholder="Entrez l' histoire de la Cathedrale"
                />
                <FormTextarea
                  name="parishHistory_rw"
                  label="Amateka ya Cathedral"
                  register={register}
                  errors={errors}
                  placeholder="Andika amateka ya cathedrale"
                />
                <CustomButton
                  type="submit"
                  isLoading={false}
                  minW={"20rem"}
                  maxW={"20rem"}
                  alignSelf={"center"}
                >
                  Submit
                </CustomButton>
              </Stack>
            </Card>
            {parishHistory && (
              <Stack flexDirection={"column"} w={"50%"}>
                {parishHistory?.history_en && (
                  <Card ml={"1"} p={"2"}>
                    <Stack direction={"column"} mb={"4"}>
                      <Heading size="sm">Currently Saved History</Heading>
                      <Text>{parishHistory?.history_en || ""}</Text>
                    </Stack>
                  </Card>
                )}
                {parishHistory?.history_fr && (
                  <Card ml={"1"} p={"2"}>
                    <Stack direction={"column"} mb={"4"}>
                      <Heading size="sm">Histoire de la Cathedrale</Heading>
                      <Text>{parishHistory?.history_fr || ""}</Text>
                    </Stack>
                  </Card>
                )}
                {parishHistory?.history_rw && (
                  <Card ml={"1"} p={"2"}>
                    <Stack direction={"column"}>
                      <Heading size="sm">Amateka ya Cathedral</Heading>
                      <Text>{parishHistory?.history_rw || ""}</Text>
                    </Stack>
                  </Card>
                )}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ParishHistoryManagement;
