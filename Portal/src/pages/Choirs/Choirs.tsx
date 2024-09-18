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
  CommonIcons,
  CustomButton,
  CustomLink,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import { ChoirsResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddChoirCard from "./Components/ChoirsCard";
import { deleteChoir, getAllChoirs, updateChoir } from "../../api/choirs";
import { StatusType } from "../../../../shared-lib/src";
import { UpdateChoirsForm } from "../../lib/validations/choirs";

const ChoirsManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [choirsData, setChoirsData] = useState<ChoirsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewChoirModel, setOpenNewChoirModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
  useState(false);
  const [selectedChoir, setSelectedChoir] =
    useState<ChoirsResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchChoirs = async () => {
    setLoading(true);
    await getAllChoirs()
      .then((data) => {
        setChoirsData(data.choirs);
        setNumberPages(1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Choirs Message",
          description:
            error.response.data?.message || "Error geting choirs time!",
          status: "error",
        });
      });
  };

  const handleEventStatus = async (choirToEdit: ChoirsResponse) => {
    const editPayload: UpdateChoirsForm = {
      name: choirToEdit.name,
      leader: choirToEdit.leader,
      telephone: choirToEdit.telephone,
      isActive: !choirToEdit.isActive,
      description_en: choirToEdit.description_en,
      description_fr: choirToEdit.description_fr,
      description_rw: choirToEdit.description_rw,
      choirId: choirToEdit.id,
      backgroundImageId: choirToEdit.backgroundImage?.id || null,
    };
    await updateChoir(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Edit Choir message!",
          description: res?.message || "Choir edited successfully",
          status: "success",
        });
        fetchChoirs();
        setIsOpenActivateOrDeactivateModal(false)
      })
      .catch((error) => {
        toast({
          title: "Edit Choir message",
          description:
            error.response?.data?.message || "Error editing choir!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchChoirs();
  }, []);

  const handleChoirDelete = async (choirId: number) => {
    await deleteChoir(choirId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Choir Message",
          description: res?.message || "Choir deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchChoirs();
        setSelectedChoir(null);
      })
      .catch((error) => {
        toast({
          title: "Delete Choir Message",
          description:
            error.response.data?.message || "Error deleting choir!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ChoirsResponse>();
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
      columnHelper.accessor("leader", {
        cell: (info) => info.getValue(),
        header: "Leader",
      }),
      columnHelper.accessor("telephone", {
        cell: (info) => info.getValue(),
        header: "Telephone",
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
      // columnHelper.accessor("id", {
      //   cell: (info) => {
      //     const handleEdit = () => {
      //       setSelectedChoir(info.row.original);
      //       setOpenNewChoirModel(true);
      //     };

      //     const handledelete = () => {
      //       setSelectedChoir(info.row.original);
      //       setIsOpenDeleteModal(true);
      //     };
      //     return (
      //       <Box>
      //         {ActionButton("edit", handleEdit)}
      //         {ActionButton("delete" ,handledelete)}
      //       </Box>
      //     );
      //   },
      //   header: "Action",
      // }),
      columnHelper.accessor("id", {
        cell: (info) => {
          const status = info.row.original.isActive;

          const handleActivateOrDeactivate = () => {
            setSelectedChoir(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedChoir(info.row.original);
            setOpenNewChoirModel(true);
          };

          const handledelete = () => {
            setSelectedChoir(info.row.original);
            setIsOpenDeleteModal(true);
          };
          return (
            // <Box>
            //   {ActionButton("edit", handleEdit)}
            //   {ActionButton(
            //     status ? "deactivate" : "activate",
            //     handleActivateOrDeactivate
            //   )}
            // </Box>
            <Menu autoSelect={false}>
              <MenuButton>
                <Icon as={MdMoreVert} color={"black"} boxSize={7} />
              </MenuButton>
              <MenuList minW="0" w={"8.5rem"}>
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  // onClick={handleActivateOrDeactivate}
                >
                  {ActionButton(status ? "deactivate" : "activate", handleActivateOrDeactivate)}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  // onClick={handledelete}
                >
                  {ActionButton("delete", handledelete)}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  // onClick={handleEdit}
                >
                  {ActionButton("edit", handleEdit)}
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
    data: choirsData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Choirs Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewChoirModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> Add Choir
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
          {/* Show TableSkeleton while fetching data */}
          {loading && (
            <TableSkeleton breakpoint="xl" mt={{ base: "3", xl: "4" }} />
          )}
          {!loading && (
            <DataTable
              table={table}
              breakpoint="xl"
              alwaysVisibleColumns={[0]}
              hidePagination={false}
              totalPages={numberPages}
              // onFetch={onPageChange}
              useCustomPagination
            />
          )}
        </>
        {!loading && choirsData.length === 0 && (
          <EmptyState text="There are no choirs to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedChoir ? "Update" : "Add"} choir`}
        isOpen={openNewChoirModel}
        onClose={() => setOpenNewChoirModel(false)}
        child={
          <AddChoirCard
            onClose={() => {
              setSelectedChoir(null);
              setOpenNewChoirModel(false);
            }}
            fetchChoirs={fetchChoirs}
            choir={selectedChoir}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="25vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this choir?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedChoir(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedChoir) {
            handleChoirDelete(selectedChoir?.id);
          }
        }}
      />
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedChoir?.isActive ? "deactivate" : "activate"
        } this choir?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedChoir(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedChoir) {
            handleEventStatus(selectedChoir);
          }
        }}
      />
    </Stack>
  );
};

export default ChoirsManagement;
