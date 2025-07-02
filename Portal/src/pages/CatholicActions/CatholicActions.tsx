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
import { CatholicActionsResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddCatholicActionCard from "./Components/CatholicActionsCard";
import { deleteCatholicAction, getAllCatholicActions, updateCatholicAction } from "../../api/catholicAction";
import { StatusType } from "../../../../shared-lib/src";
import { UpdateCatholicActionsForm } from "../../lib/validations/catholicActions";

const CatholicActionsManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [catholicActionsData, setCatholicActionsData] = useState<CatholicActionsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewCatholicActionModel, setOpenNewCatholicActionModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  const [selectedCatholicAction, setSelectedCatholicAction] = useState<CatholicActionsResponse | null>(
    null
  );
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchCatholicActions = async (page = 1) => {
    setLoading(true);
    await getAllCatholicActions({page})
      .then((data) => {
        setCatholicActionsData(data.catholicActions);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get catholic actions Message",
          description:
            error.response.data?.message || "Error geting catholic actions time!",
          status: "error",
        });
      });
  };

  const handleEventStatus = async (catholicActionToEdit: CatholicActionsResponse) => {
    const editPayload: UpdateCatholicActionsForm = {
      name: catholicActionToEdit.name,
      leader: catholicActionToEdit.leader,
      telephone: catholicActionToEdit.telephone,
      isActive: !catholicActionToEdit.isActive,
      description_en: catholicActionToEdit.description_en,
      description_fr: catholicActionToEdit.description_fr,
      description_rw: catholicActionToEdit.description_rw,
      catholicActionId: catholicActionToEdit.id,
      backgroundImageId: catholicActionToEdit.backgroundImage?.id || null,
    };
    await updateCatholicAction(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Edit catholic action message!",
          description: res?.message || "Catholic action edited successfully",
          status: "success",
        });
        fetchCatholicActions();
        setIsOpenActivateOrDeactivateModal(false);
      })
      .catch((error) => {
        toast({
          title: "Edit catholic action message",
          description: error.response?.data?.message || "Error editing catholic action!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchCatholicActions();
  }, []);

  const handleCatholicActionDelete = async (catholicActionId: number) => {
    await deleteCatholicAction(catholicActionId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete catholic action Message",
          description: res?.message || "Catholic action deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchCatholicActions();
        setSelectedCatholicAction(null);
      })
      .catch((error) => {
        toast({
          title: "Delete catholic action Message",
          description: error.response.data?.message || "Error deleting catholic action!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<CatholicActionsResponse>();
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
      columnHelper.accessor("id", {
        cell: (info) => {
          const status = info.row.original.isActive;

          const handleActivateOrDeactivate = () => {
            setSelectedCatholicAction(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedCatholicAction(info.row.original);
            setOpenNewCatholicActionModel(true);
          };

          const handledelete = () => {
            setSelectedCatholicAction(info.row.original);
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
                  {ActionButton(
                    status ? "deactivate" : "activate",
                    handleActivateOrDeactivate
                  )}
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
    data: catholicActionsData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Catholic Actions Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewCatholicActionModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> Add catholic action
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
              onFetch={fetchCatholicActions}
              useCustomPagination
            />
          )}
        </>
        {!loading && catholicActionsData.length === 0 && (
          <EmptyState text="There are no catholic actions to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedCatholicAction ? "Update" : "Add"} catholic action`}
        isOpen={openNewCatholicActionModel}
        onClose={() => setOpenNewCatholicActionModel(false)}
        child={
          <AddCatholicActionCard
            onClose={() => {
              setSelectedCatholicAction(null);
              setOpenNewCatholicActionModel(false);
            }}
            fetchCatholicActions={fetchCatholicActions}
            catholicAction={selectedCatholicAction}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="60vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this catholic action?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedCatholicAction(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedCatholicAction) {
            handleCatholicActionDelete(selectedCatholicAction?.id);
          }
        }}
      />
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedCatholicAction?.isActive ? "deactivate" : "activate"
        } this catholic action?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedCatholicAction(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedCatholicAction) {
            handleEventStatus(selectedCatholicAction);
          }
        }}
      />
    </Stack>
  );
};

export default CatholicActionsManagement;
