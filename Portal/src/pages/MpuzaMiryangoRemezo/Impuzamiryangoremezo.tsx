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
import { MessageResponse, MpuzaResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddMpuzaCard from "./Components/MpuzasCard";
import { deleteMpuza, getAllMpuza } from "../../api/MpuzaMiryangoRemezo";

const MpuzaMiryangoRemezoManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [MpuzaData, setMpuzaData] = useState<MpuzaResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewMpuzaModel, setOpenNewMpuzaModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedMpuza, setSelectedMpuza] =
    useState<MpuzaResponse | null>(null);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchMpuza = async (page = 1) => {
    setLoading(true);
    await getAllMpuza({page})
      .then((data) => {
        setMpuzaData(data.mpuzaMiryangoRemezo);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Mpuza Message",
          description:
            error.response.data?.message || "Error geting Mpuza time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchMpuza();
  }, []);

  const handleMpuzaDelete = async (MpuzaId: number) => {
    await deleteMpuza(MpuzaId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Mpuza Message",
          description: res?.message || "Mpuza deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchMpuza();
        setSelectedMpuza(null);
      })
      .catch((error) => {
        toast({
          title: "Delete Mpuza Message",
          description:
            error.response.data?.message || "Error deleting recent event!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<MpuzaResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("title", {
        cell: (info) => info.getValue(),
        header: "Title",
      }),
      columnHelper.accessor("leader", {
        cell: (info) => info.getValue(),
        header: "Leader",
      }),
      columnHelper.accessor("phone", {
        cell: (info) => info.getValue(),
        header: "Phone",
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
      columnHelper.accessor("description_en", {
        cell: (info) => info.getValue(),
        header: "Description (en)",
      }),
      columnHelper.accessor("description_fr", {
        cell: (info) => info.getValue(),
        header: "Description (fr)",
      }),
      columnHelper.accessor("description_rw", {
        cell: (info) => info.getValue(),
        header: "Description (rw)",
      }),
      columnHelper.accessor("id", {
        cell: (info) => {
          const handleEdit = () => {
            setSelectedMpuza(info.row.original);
            setOpenNewMpuzaModel(true);
          };

          const handledelete = () => {
            setSelectedMpuza(info.row.original);
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
                // onClick={handleEdit}
                >
                  {ActionButton("edit", handleEdit)}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                // onClick={handledelete}
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
    data: MpuzaData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Mpuza Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewMpuzaModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Mpuza
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
              onFetch={fetchMpuza}
              useCustomPagination
            />
          )}
        </>
        {!loading && MpuzaData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedMpuza ? "Update" : "Add"} Mpuza`}
        isOpen={openNewMpuzaModel}
        onClose={() => setOpenNewMpuzaModel(false)}
        child={
          <AddMpuzaCard
            onClose={() => {
              setSelectedMpuza(null);
              setOpenNewMpuzaModel(false);
            }}
            fetchMpuza={fetchMpuza}
            Mpuza={selectedMpuza}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="65vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this Mpuza?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedMpuza(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedMpuza) {
            handleMpuzaDelete(selectedMpuza?.id);
          }
        }}
      />
    </Stack>
  );
};

export default MpuzaMiryangoRemezoManagement;
