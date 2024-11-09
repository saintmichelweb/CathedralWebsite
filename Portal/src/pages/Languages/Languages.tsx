import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import {
  AlertDialog,
  CommonIcons,
  CustomButton,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import { LanguageResponse, MessageResponse } from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import { getLanguages, updateLanguage } from "../../api/language";
import { UpdateLanguageForm } from "../../lib/validations/language";
import AddLanguageCard from "./Components/languageCard";
import ActionButton from "../../components/ui/ActionButton/ActionButton";

const LanguagesManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [languagesData, setLanguagesData] = useState<LanguageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewLanguageModel, setOpenNewLanguageModel] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageResponse | null>(null);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchLanguages = async (page = 1) => {
    setLoading(true);
    await getLanguages({page})
      .then((data) => {
        setLanguagesData(data.languages);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Languages Message",
          description:
            error.response.data?.message || "Error getting languages time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleLanguageStatus = async (language: LanguageResponse) => {
    const editPayload: UpdateLanguageForm = {
      language: language.language,
      languageId: language.id,
      isActive: !language.isActive,
    };
    await updateLanguage(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Change Language Status Message",
          description: res?.message || "Language status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchLanguages();
        setSelectedLanguage(null);
      })
      .catch((error) => {
        toast({
          title: "Change Language Status Message",
          description:
            error.response.data?.message || "Error editing language status!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<LanguageResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("language", {
        cell: (info) => info.getValue(),
        header: "Language",
      }),
      columnHelper.accessor("isActive", {
        cell: (info) => {
          const status_ = info.getValue();

          let status_HTML: React.ReactNode;
          switch (status_) {
            case true:
              status_HTML = (
                <Flex alignItems="center" justifyContent="center">
                  <CommonIcons iconName="active" colorVal="green.500" />
                  <Text ml={2}>{StatusType.ACTIVATED}</Text>
                </Flex>
              );
              break;
            case false:
              status_HTML = (
                <Flex alignItems="center" justifyContent="center">
                  <CommonIcons iconName="disable" colorVal="red.500" />
                  <Text ml={2}>{StatusType.DEACTIVATED}</Text>
                </Flex>
              );
              break;
            default:
              status_HTML = <Text ml={2}>N/A</Text>;
          }
          return status_HTML;
        },
        header: "Status",
      }),
      columnHelper.accessor("id", {
        cell: (info) => {
          const status = info.row.original.isActive;

          const handleActivateOrDeactivate = () => {
            setSelectedLanguage(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedLanguage(info.row.original);
            setOpenNewLanguageModel(true);
          };

          return (
            <Box>
              {ActionButton("edit", handleEdit)}
              {ActionButton(
                status ? "deactivate" : "activate",
                handleActivateOrDeactivate
              )}
            </Box>
          );
        },
        header: "Action",
      }),
    ];
  }, []);

  const table = useTable({
    data: languagesData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Mass Languages Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewLanguageModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Language
        </CustomButton>
      </Flex>
      <Box
        bg="primaryBackground"
        mx={{ base: "-4", sm: "-6", lg: "-8" }}
        mt="5"
        pt="0"
        px="4"
        pb="14"
        flexGrow="1"
        mb="-14"
      >
        <>
          {loading && (
            <TableSkeleton breakpoint="xl" mt={{ base: "3", xl: "4" }} />
          )}
          {!loading && (
            <DataTable
              table={table}
              breakpoint="xl"
              alwaysVisibleColumns={[0]}
              hidePagination={false}
              totalPages={numberOfPages}
              onFetch={fetchLanguages}
              useCustomPagination
            />
          )}
        </>
        {!loading && languagesData.length === 0 && (
          <EmptyState text="There are no languages to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedLanguage ? "Update" : "Add"} Location`}
        isOpen={openNewLanguageModel}
        onClose={() => setOpenNewLanguageModel(false)}
        child={
          <AddLanguageCard
            onClose={() => {
              setSelectedLanguage(null);
              setOpenNewLanguageModel(false);
            }}
            fetchLanguages={fetchLanguages}
            language={selectedLanguage}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="25vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedLanguage?.isActive ? "deactivate" : "activate"
        } this language?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedLanguage(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedLanguage) {
            handleLanguageStatus(selectedLanguage);
          }
        }}
      />
    </Stack>
  );
};

export default LanguagesManagement;
