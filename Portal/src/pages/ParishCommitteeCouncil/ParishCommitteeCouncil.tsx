import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdAdd, MdMoreVert } from "react-icons/md";
import {
  AlertDialog,
  CustomButton,
  CustomLink,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import {
  parishCommitteeCouncilResponse,
  MessageResponse,
} from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddparishCommitteeCouncilCard from "./Components/ParishCommitteeCouncilCard";
import {
  deleteparishCommitteeCouncil,
  getAllparishCommitteeCouncils,
} from "../../api/parishCommitteeCouncil";

const ParishCommitteeCouncilManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [parishCommitteeCouncilsData, setparishCommitteeCouncilData] = useState<
    parishCommitteeCouncilResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewRecentEventModel, setOpenNewRecentEventModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedparishCommitteeCouncil, setSelectedRecentEvent] =
    useState<parishCommitteeCouncilResponse | null>(null);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchparishCommitteeCouncil = async (page = 1) => {
    setLoading(true);
    await getAllparishCommitteeCouncils({page})
      .then((data) => {
        setparishCommitteeCouncilData(data.parishCommitteeCouncils);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get parishCommitteeCouncil Message",
          description:
            error.response.data?.message ||
            "Error geting parishCommitteeCouncils time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchparishCommitteeCouncil();
  }, []);

  const handleLocationDelete = async (parishCommitteeCouncilId: number) => {
    await deleteparishCommitteeCouncil(parishCommitteeCouncilId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Servise Message",
          description: res?.message || "Servise deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchparishCommitteeCouncil();
        setSelectedRecentEvent(null);
      })
      .catch((error) => {
        toast({
          title: "Delete Servise Message",
          description:
            error.response.data?.message || "Error deleting recent event!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<parishCommitteeCouncilResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("names", {
        cell: (info) => info.getValue(),
        header: "Names",
      }),
      columnHelper.accessor("position_en", {
        cell: (info) => info.getValue(),
        header: "position(en)",
      }),
      columnHelper.accessor("position_fr", {
        cell: (info) => info.getValue(),
        header: "position(fr)",
      }),
      columnHelper.accessor("position_rw", {
        cell: (info) => info.getValue(),
        header: "position(rw)",
      }),
      columnHelper.accessor("description_en", {
        cell: (info) => info.getValue(),
        header: "Description(en)",
      }),
      columnHelper.accessor("description_fr", {
        cell: (info) => info.getValue(),
        header: "Description(fr)",
      }),
      columnHelper.accessor("description_rw", {
        cell: (info) => info.getValue(),
        header: "Description(rw)",
      }),
      columnHelper.accessor("telephone", {
        cell: (info) => info.getValue(),
        header: "Telephone",
      }),
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Email",
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
            setSelectedRecentEvent(info.row.original);
            setOpenNewRecentEventModel(true);
          };

          const handledelete = () => {
            setSelectedRecentEvent(info.row.original);
            setIsOpenDeleteModal(true);
          };
          return (
            <Menu autoSelect={false}>
              <MenuButton>
                <Icon as={MdMoreVert} color={"black"} boxSize={7} />
              </MenuButton>
              <MenuList minW="0" w={"8.5rem"}>
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                >
                  {ActionButton("edit", handleEdit)}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                >
                  {ActionButton("delete", handledelete)}
                </MenuItem>
              </MenuList>
            </Menu>
          );
        },
        header: "Action",
      }),
    ];
  }, []);

  const table = useTable({
    data: parishCommitteeCouncilsData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Parish Committee Council Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewRecentEventModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Parish
          Committee Council
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
              onFetch={fetchparishCommitteeCouncil}
              useCustomPagination
            />
          )}
        </>
        {!loading && parishCommitteeCouncilsData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${
          selectedparishCommitteeCouncil ? "Update" : "Add"
        } Parish Committee Council`}
        isOpen={openNewRecentEventModel}
        onClose={() => setOpenNewRecentEventModel(false)}
        child={
          <AddparishCommitteeCouncilCard
            onClose={() => {
              setSelectedRecentEvent(null);
              setOpenNewRecentEventModel(false);
            }}
            fetchparishCommitteeCouncil={fetchparishCommitteeCouncil}
            parishCommitteeCouncil={selectedparishCommitteeCouncil}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="60vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this location?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedRecentEvent(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedparishCommitteeCouncil) {
            handleLocationDelete(selectedparishCommitteeCouncil?.id);
          }
        }}
      />
    </Stack>
  );
};

export default ParishCommitteeCouncilManagement;
