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
import { RecentEventResponse, MessageResponse } from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import { getAllRecentEvents, updateRecentEvent } from "../../api/recentEvents";
import { UpdateRecentEventsForm } from "../../lib/validations/recentEvents";
import AddRecentEventsCard from "./Components/RecentEventsCard";

const RecentEventsManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [recentEventsData, setRecentEventsData] = useState<RecentEventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewRecentEventModel, setOpenNewRecentEventModel] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  // const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedRecentEvent, setSelectedRecentEvent] =
    useState<RecentEventResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchRecentEvents = async () => {
    setLoading(true);
    await getAllRecentEvents()
      .then((data) => {
        setRecentEventsData(data.recentEvents);
        setNumberPages(data.numberOfPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Recent Events Message",
          description:
            error.response.data?.message || "Error geting recent events time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchRecentEvents();
  }, []);

  const handleLocationStatus = async (recentEvent: RecentEventResponse) => {
    const editPayload: UpdateRecentEventsForm = {
      title: recentEvent.title,
      description: recentEvent.description,
      isActive: !recentEvent.isActive,
      recentEventId: recentEvent.id
    };
    await updateRecentEvent(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Change Recent Event Status Message",
          description: res?.message || "Recent event status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchRecentEvents();
        setSelectedRecentEvent(null);
      })
      .catch((error) => {
        toast({
          title: "Change Recent Event Status Message",
          description:
            error.response.data?.message || "Error editing recent event status!",
          status: "error",
        });
      });
  };

  // const handleLocationDelete = async (locationId: number) => {
  //   await deletLocation(locationId)
  //     .then((res: MessageResponse) => {
  //       toast({
  //         title: "Delete Location Message",
  //         description: res?.message || "Location deleted successfully",
  //         status: "success",
  //       });
  //       setIsOpenDeleteModal(false);
  //       fetchRecentEvents();
  //       setSelectedRecentEvent(null);
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Delete Location Message",
  //         description:
  //           error.response.data?.message || "Error deleting location!",
  //         status: "error",
  //       });
  //     });
  // };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<RecentEventResponse>();
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
      columnHelper.accessor("description", {
        cell: (info) => info.getValue(),
        header: "Description",
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
            setSelectedRecentEvent(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedRecentEvent(info.row.original);
            setOpenNewRecentEventModel(true);
          };

          // const handledelete = () => {
          //   setSelectedRecentEvent(info.row.original);
          //   setIsOpenDeleteModal(true);
          // };
          return (
            <Box>
              {ActionButton("edit", handleEdit)}
              {ActionButton(
                status ? "deactivate" : "activate",
                handleActivateOrDeactivate
              )}
            </Box>
            // <Menu autoSelect={false}>
            //   <MenuButton>
            //     <Icon as={MdMoreVert} color={"black"} boxSize={7} />
            //   </MenuButton>
            //   <MenuList minW="0" w={"8.5rem"}>
            //     <MenuItem
            //       px={0}
            //       _focus={{ bg: "transparent" }}
            //       onClick={handleActivateOrDeactivate}
            //     >
            //       {ActionButton(status ? "deactivate" : "activate")}
            //     </MenuItem>
            //     {/* <Divider />
            //     <MenuItem
            //       px={0}
            //       _focus={{ bg: "transparent" }}
            //       onClick={handledelete}
            //     >
            //       {ActionButton("delete")}
            //     </MenuItem> */}
            //     <Divider />
            //     <MenuItem
            //       px={0}
            //       _focus={{ bg: "transparent" }}
            //       onClick={handleEdit}
            //     >
            //       {ActionButton("edit")}
            //     </MenuItem>
            //   </MenuList>
            // </Menu>
          );
        },
        header: "Action",
      }),
    ];
  }, []);

  const table = useTable({
    data: recentEventsData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Recent Events Management</Heading>
        </Stack>
        {/* <CustomLink
          to="/portal-user-management/role-management/create-role"
          mr={{ base: 0, lg: 2 }}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Location
        </CustomLink> */}
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewRecentEventModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Recent Event
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
        {!loading && recentEventsData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedRecentEvent ? "Update" : "Add"} recent event`}
        isOpen={openNewRecentEventModel}
        onClose={() => setOpenNewRecentEventModel(false)}
        child={
          <AddRecentEventsCard
            onClose={() => {
              setSelectedRecentEvent(null);
              setOpenNewRecentEventModel(false);
            }}
            fetchRecentEvents={fetchRecentEvents}
            recentEvent={selectedRecentEvent}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="25vw"
      />
      {/* <AlertDialog
        alertText={`Are you sure you want to delete this location?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedRecentEvent(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedRecentEvent) {
            handleLocationDelete(selectedRecentEvent?.id);
          }
        }}
      /> */}
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedRecentEvent?.isActive ? "deactivate" : "activate"
        } this recent event?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedRecentEvent(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedRecentEvent) {
            handleLocationStatus(selectedRecentEvent);
          }
        }}
      />
    </Stack>
  );
};

export default RecentEventsManagement;
