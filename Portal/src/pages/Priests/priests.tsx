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
  CustomButton,
  CustomLink,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import { PriestsResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import { deletePriest, getAllPriests } from "../../api/priests";
import AddPriestCard from "./Components/priests";

const PriestsManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [priestsData, setPriestsData] = useState<PriestsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewPriestModel, setOpenNewPriestModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedPriest, setSelectedPriest] =
    useState<PriestsResponse | null>(null);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchPriests = async (page = 1) => {
    setLoading(true);
    await getAllPriests({page})
      .then((data) => {
        setPriestsData(data.priests);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Priests Message",
          description:
            error.response.data?.message || "Error geting priests time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchPriests();
  }, []);

  const handlePriestDelete = async (priestId: number) => {
    await deletePriest(priestId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Priest Message",
          description: res?.message || "Priest deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchPriests();
        setSelectedPriest(null);
      })
      .catch((error) => {
        toast({
          title: "Delete Priest Message",
          description:
            error.response.data?.message || "Error deleting priest!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<PriestsResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Name",
      }),
      columnHelper.accessor("title", {
        cell: (info) => info.getValue(),
        header: "Title",
      }),
      columnHelper.accessor("description_en", {
        cell: (info) => info.getValue(),
        header: "Description(EN)",
      }),
      columnHelper.accessor("description_fr", {
        cell: (info) => info.getValue(),
        header: "Description(FR)",
      }),
      columnHelper.accessor("description_rw", {
        cell: (info) => info.getValue(),
        header: "Description(RW)",
      }),
      columnHelper.accessor("backgroundImage", {
        cell: (info) => {
          const imageUrl = info.row.original.backgroundImage?.imageUrl;
          const filename = info.row.original.backgroundImage?.filename;
          return (
            <>
              {imageUrl ? (
                <CustomLink
                  to="#"
                  mr={{ base: 0, lg: 2 }}
                  colorVariant={"link-outline"}
                  onClick={() =>
                    window.open(imageUrl, "_blank", "noopener,noreferrer")
                  }
                >
                  <Text decoration="underline">{filename}</Text>
                </CustomLink>
              ) : (
                <Text>N/A</Text>
              )}
            </>
          );
        },
        header: "Background Image",
      }),
      columnHelper.accessor("id", {
        cell: (info) => {
          const handleEdit = () => {
            setSelectedPriest(info.row.original);
            setOpenNewPriestModel(true);
          };

          const handledelete = () => {
            setSelectedPriest(info.row.original);
            setIsOpenDeleteModal(true);
          };
          return (
            <Box>
              {ActionButton("edit", handleEdit)}
              {ActionButton("delete" ,handledelete)}
            </Box>
          );
        },
        header: "Action",
      }),
    ];
  }, []);

  const table = useTable({
    data: priestsData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Priests Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewPriestModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> Add Priest
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
              onFetch={fetchPriests}
              useCustomPagination
            />
          )}
        </>
        {!loading && priestsData.length === 0 && (
          <EmptyState text="There are no priests to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedPriest ? "Update" : "Add"} priest`}
        isOpen={openNewPriestModel}
        onClose={() => setOpenNewPriestModel(false)}
        child={
          <AddPriestCard
            onClose={() => {
              setSelectedPriest(null);
              setOpenNewPriestModel(false);
            }}
            fetchPriests={fetchPriests}
            priest={selectedPriest}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="45vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this priest?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedPriest(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedPriest) {
            handlePriestDelete(selectedPriest?.id);
          }
        }}
      />
    </Stack>
  );
};

export default PriestsManagement;
