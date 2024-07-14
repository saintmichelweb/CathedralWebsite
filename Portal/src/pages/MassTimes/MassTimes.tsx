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
import { MassTimesResponse, MessageResponse } from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import { UpdateMassTimesForm } from '../../lib/validations/massTimes';
import { getAllMassTimes, updateMassTime } from "../../api/massTimes";
import AddMasstimeCard from "./Components/MassTimesCard";

const MassTimesManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [massTimesData, setMassTimesData] = useState<MassTimesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openMassTimesModel, setOpenMassTimesModel] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  // const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedMassTimes, setSelectedMassTimes] =
    useState<MassTimesResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchMassTimes = async () => {
    setLoading(true)
    await getAllMassTimes()
      .then((data) => {
        setMassTimesData(data.massTimes);
        setNumberPages(data.numberOfPages || 1);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        toast({
          title: "Get Mass Times Message",
          description:
            error.response.data?.message || "Error geting mass times time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchMassTimes();
  }, []);

  const ActionButton = (action: string) => {
    return (
      <CustomLink
        to={"#"}
        colorVariant={
          action === "edit"
            ? "info"
            : action === "delete"
            ? "danger"
            : action == "activate"
            ? "success"
            : "danger"
        }
        w={"8rem"}
        mx="2"
      >
        {action === "edit" ? (
          <CommonIcons iconName="edit" />
        ) : action === "delete" ? (
          <CommonIcons iconName="delete" />
        ) : action == "activate" ? (
          <CommonIcons iconName="active" />
        ) : (
          <CommonIcons iconName="disable" />
        )}
        <Text>
          {action === "edit"
            ? "Edit"
            : action === "delete"
            ? "Delete"
            : action == "activate"
            ? "Activate"
            : "Deactivate"}
        </Text>
      </CustomLink>
    );
  };

  const handleMassTimesStatus = async (massTime: MassTimesResponse) => {
    const editPayload: UpdateMassTimesForm = {
      massTimeId: massTime.id,
      location: massTime.location.id,
      language: massTime.language.id,
      isActive: !massTime.isActive,
      day: massTime.day,
      time: massTime.time
    };
    await updateMassTime(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Change Mass Times Status Message",
          description: res?.message || "Mass Times status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchMassTimes();
        setSelectedMassTimes(null);
      })
      .catch((error) => {
        toast({
          title: "Change Mass Times Status Message",
          description:
            error.response.data?.message || "Error editing mass times status!",
          status: "error",
        });
      });
  };

  // const handleLocationDelete = async (locationId: number) => {
  //   await deletLocation(locationId)
  //     .then((res: MessageResponse) => {
  //       toast({
  //         title: "Delete Mass Time Message",
  //         description: res?.message || "Mass Time deleted successfully",
  //         status: "success",
  //       });
  //       setIsOpenDeleteModal(false);
  //       fetchMassTimes();
  //       setSelectedMassTimes(null);
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Delete Mass Time Message",
  //         description:
  //           error.response.data?.message || "Error deleting Mass time!",
  //         status: "error",
  //       });
  //     });
  // };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<MassTimesResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("day", {
          cell: (info) => info.getValue(),
          header: "Day",
        }),
        columnHelper.accessor("time", {
            cell: (info) => info.getValue(),
            header: "Time",
        }),
        columnHelper.accessor("language", {
          cell: (info) => info.getValue().language,
          header: "Language",
        }),
        columnHelper.accessor("location", {
          cell: (info) => info.getValue().location,
          header: "location",
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
            setSelectedMassTimes(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedMassTimes(info.row.original);
            setOpenMassTimesModel(true);
          };

          // const handledelete = () => {
          //   setSelectedMassTimes(info.row.original);
          //   setIsOpenDeleteModal(true);
          // };
          return (
            <Menu autoSelect={false}>
              <MenuButton>
                <Icon as={MdMoreVert} color={"black"} boxSize={7} />
              </MenuButton>
              <MenuList minW="0" w={"8.5rem"}>
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  onClick={handleActivateOrDeactivate}
                >
                  {ActionButton(status ? "deactivate" : "activate")}
                </MenuItem>
                {/* <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  onClick={handledelete}
                >
                  {ActionButton("delete")}
                </MenuItem> */}
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  onClick={handleEdit}
                >
                  {ActionButton("edit")}
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
    data: massTimesData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Mass Times Management</Heading>
        </Stack>
        {/* <CustomLink
          to="/portal-user-management/role-management/create-role"
          mr={{ base: 0, lg: 2 }}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Mass Time
        </CustomLink> */}
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenMassTimesModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Mass Time
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
              numberPages={numberPages}
              // onFetch={onPageChange}
              useCustomPagination
            />
          )}
        </>
        {!loading && massTimesData.length === 0 && (
          <EmptyState text="There are no locations to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedMassTimes ? "Update" : "Add"} Mass Time`}
        isOpen={openMassTimesModel}
        onClose={() => setOpenMassTimesModel(false)}
        child={
          <AddMasstimeCard
            onClose={() => {
              setSelectedMassTimes(null);
              setOpenMassTimesModel(false);
            }}
            fetchMassTimes={fetchMassTimes}
            massTime={selectedMassTimes}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="22vw"
      />
      {/* <AlertDialog
        alertText={`Are you sure you want to delete this location?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedMassTimes(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedMassTimes) {
            handleLocationDelete(selectedMassTimes?.id);
          }
        }}
      /> */}
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedMassTimes?.isActive ? "deactivate" : "activate"
        } this Mass time?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedMassTimes(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedMassTimes) {
            handleMassTimesStatus(selectedMassTimes);
          }
        }}
      />
    </Stack>
  );
};

export default MassTimesManagement;
