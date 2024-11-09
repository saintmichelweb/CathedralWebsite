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
import { OfficeHoursResponse, MessageResponse } from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import OfficetimeCard from "./Components/OfficeHoursCard";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import { getAllOfficeHours, updateOfficeHour } from "../../api/officeHours";
import { UpdateOfficeHoursForm } from "../../lib/validations/officeHours";

const OfficeTimesManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [officeHoursData, setMassTimesData] = useState<OfficeHoursResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openMassTimesModel, setOpenMassTimesModel] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  const [selectedOfficeHour, setSelectedMassTimes] =
    useState<OfficeHoursResponse | null>(null);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchOfficeHours = async (page = 1) => {
    setLoading(true);
    await getAllOfficeHours({page})
      .then((data) => {
        console.log(data)
        setMassTimesData(data.officeHours);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Office Hours Message",
          description:
            error.response.data?.message || "Error geting mass times time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchOfficeHours();
  }, []);

  const handleMassTimesStatus = async (officeHour: OfficeHoursResponse) => {
    const editPayload: UpdateOfficeHoursForm = {
      OfficeHourId: officeHour.id,
      office_place: officeHour.office_place.id,
      isActive: !officeHour.isActive,
      day_en: officeHour.day_en,
      day_fr: officeHour.day_fr,
      day_rw: officeHour.day_rw,
      time: officeHour.time,
    };
    await updateOfficeHour(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Change Office Hours Status Message",
          description: res?.message || "Office Hours status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchOfficeHours();
        setSelectedMassTimes(null);
      })
      .catch((error) => {
        toast({
          title: "Change Office Hours Status Message",
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
  //         title: "Delete Office Hour Message",
  //         description: res?.message || "Office Hour deleted successfully",
  //         status: "success",
  //       });
  //       setIsOpenDeleteModal(false);
  //       fetchOfficeHours();
  //       setSelectedMassTimes(null);
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Delete Office Hour Message",
  //         description:
  //           error.response.data?.message || "Error deleting Mass time!",
  //         status: "error",
  //       });
  //     });
  // };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<OfficeHoursResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("day_en", {
        cell: (info) => info.getValue(),
        header: "Day",
      }),
      columnHelper.accessor("day_fr", {
        cell: (info) => info.getValue(),
        header: "Jour",
      }),
      columnHelper.accessor("day_rw", {
        cell: (info) => info.getValue(),
        header: "Umunsi",
      }),
      columnHelper.accessor("time", {
        cell: (info) => info.getValue(),
        header: "Time",
      }),
      columnHelper.accessor("office_place", {
        cell: (info) => info.getValue().location,
        header: "Place",
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
    data: officeHoursData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Office Hours Management</Heading>
        </Stack>
        {/* <CustomLink
          to="/portal-user-management/role-management/create-role"
          mr={{ base: 0, lg: 2 }}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Office Hour
        </CustomLink> */}
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenMassTimesModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Office Hour
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
              onFetch={fetchOfficeHours}
              useCustomPagination
            />
          )}
        </>
        {!loading && officeHoursData.length === 0 && (
          <EmptyState text="There are no Office Hours to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedOfficeHour ? "Update" : "Add"} Office Hour`}
        isOpen={openMassTimesModel}
        onClose={() => setOpenMassTimesModel(false)}
        child={
          <OfficetimeCard
            onClose={() => {
              setSelectedMassTimes(null);
              setOpenMassTimesModel(false);
            }}
            fetchOfficeHours={fetchOfficeHours}
            officeHour={selectedOfficeHour}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="45vw"
      />
      {/* <AlertDialog
        alertText={`Are you sure you want to delete this location?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedMassTimes(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedOfficeHour) {
            handleLocationDelete(selectedOfficeHour?.id);
          }
        }}
      /> */}
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedOfficeHour?.isActive ? "deactivate" : "activate"
        } this Mass time?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedMassTimes(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedOfficeHour) {
            handleMassTimesStatus(selectedOfficeHour);
          }
        }}
      />
    </Stack>
  );
};

export default OfficeTimesManagement;
