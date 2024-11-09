import {
  Stack,
  Flex,
  Heading,
  Card,
  useToast,
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
      setValue("mission_en", parishHistory.mission_en);
      setValue("mission_fr", parishHistory.mission_fr);
      setValue("mission_rw", parishHistory.mission_rw);
      setValue("vision_en", parishHistory.vision_en);
      setValue("vision_fr", parishHistory.vision_fr);
      setValue("vision_rw", parishHistory.vision_rw);
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
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">History, Mission and Vision Management</Heading>
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
            <Card width={"100%"} h={"100%"} mr={"1"} p={"2"}>
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
                <Stack direction={"row"} justifyContent={"space-around"}>
                  <FormTextarea
                    name="parishHistory_en"
                    label="History (EN)"
                    register={register}
                    errors={errors}
                    placeholder="Enter history (EN)"
                  />
                  <FormTextarea
                    name="parishHistory_fr"
                    label="History (FR)"
                    register={register}
                    errors={errors}
                    placeholder="Enter history (FR)"
                  />
                  <FormTextarea
                    name="parishHistory_rw"
                    label="History (RW)"
                    register={register}
                    errors={errors}
                    placeholder="Enter history (RW)"
                  />
                </Stack>
                <Stack direction={{ base: "column", lg: "row" }}>
                  <Heading size="sm">
                    {" "}
                    {!parishHistory ? "Create" : "Update"} Mission
                  </Heading>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-around"}>
                  <FormTextarea
                    name="mission_en"
                    label="Mission (EN)"
                    register={register}
                    errors={errors}
                    placeholder="Enter mission (EN)"
                  />
                  <FormTextarea
                    name="mission_fr"
                    label="Mission (FR)"
                    register={register}
                    errors={errors}
                    placeholder="Enter mission (FR)"
                  />
                  <FormTextarea
                    name="mission_rw"
                    label="Mission (RW)"
                    register={register}
                    errors={errors}
                    placeholder="Enter mission (RW)"
                  />
                </Stack>
                <Stack direction={{ base: "column", lg: "row" }}>
                  <Heading size="sm">
                    {" "}
                    {!parishHistory ? "Create" : "Update"} Vision
                  </Heading>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-around"}>
                  <FormTextarea
                    name="vision_en"
                    label="Vision (EN)"
                    register={register}
                    errors={errors}
                    placeholder="Enter vision (EN)"
                  />
                  <FormTextarea
                    name="vision_fr"
                    label="Vision (FR)"
                    register={register}
                    errors={errors}
                    placeholder="Enter vision (FR)"
                  />
                  <FormTextarea
                    name="vision_rw"
                    label="Vision (RW)"
                    register={register}
                    errors={errors}
                    placeholder="Enter vision (RW)"
                  />
                </Stack>
                <CustomButton
                  type="submit"
                  isLoading={false}
                  minW={"20rem"}
                  maxW={"20rem"}
                  alignSelf={"center"}
                  mb={'3'}
                >
                  Submit
                </CustomButton>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ParishHistoryManagement;
