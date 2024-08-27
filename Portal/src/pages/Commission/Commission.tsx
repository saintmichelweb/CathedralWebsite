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
  // CommonIcons,
  CustomButton,
  CustomLink,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import { commissionResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddCommissionCard from "./Components/CommissionCard";
import { deleteCommission, getAllCommissions } from "../../api/commission";

const CommissionManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [CommissionsData, setCommissionData] = useState<commissionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewRecentEventModel, setOpenNewRecentEventModel] = useState(false);
  // const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
  //   useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedCommission, setSelectedRecentEvent] =
    useState<commissionResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchCommission = async () => {
    setLoading(true);
    await getAllCommissions()
      .then((data) => {
        setCommissionData(data.commissions);
        setNumberPages(1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Commission Message",
          description:
            error.response.data?.message || "Error geting Commissions time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchCommission();
  }, []);

  // const handleEventStatus = async (Commission: commissionResponse) => {
  //   const editPayload: UpdateCommissionForm = {
  //     name_en: Commission.name_en,
  //     name_fr: Commission.name_fr,
  //     name_rw: Commission.name_rw,
  //     description_en: Commission.description_en,
  //     description_fr: Commission.description_fr,
  //     description_rw: Commission.description_rw,
  //     work_hours: Commission.work_hours,
  //     work_days: Commission.work_days,
  //     contact_person_name: Commission.contact_person_name,
  //     contact_person_phone_number: Commission.contact_person_phone_number,
  //     backgroundImageId: Commission.backgroundImage?.id || null,
  //     CommissionsId: selectedCommission?.id || null
  //   };
  //   await updateCommission(editPayload)
  //     .then((res: MessageResponse) => {
  //       toast({
  //         title: "Change Commission Status Message",
  //         description:
  //           res?.message || "Commission status changed successfully",
  //         status: "success",
  //       });
  //       setIsOpenActivateOrDeactivateModal(false);
  //       fetchCommission();
  //       setSelectedRecentEvent(null);
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Change Commission Status Message",
  //         description:
  //           error.response.data?.message ||
  //           "Error editing recent event status!",
  //         status: "error",
  //       });
  //     });
  // };

  const handleLocationDelete = async (CommissionId: number) => {
    await deleteCommission(CommissionId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Commission Message",
          description: res?.message || "Commission deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchCommission();
        setSelectedRecentEvent(null);
      })
      .catch((error) => {
        toast({
          title: "Delete Commission Message",
          description:
            error.response.data?.message || "Error deleting recent event!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<commissionResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("name_en", {
        cell: (info) => info.getValue(),
        header: "Name(EN)",
      }),
      columnHelper.accessor("name_fr", {
        cell: (info) => info.getValue(),
        header: "Name(FR))",
      }),
      columnHelper.accessor("name_rw", {
        cell: (info) => info.getValue(),
        header: "Name(RW)",
      }),
      columnHelper.accessor("contact_person_name", {
        cell: (info) => info.getValue(),
        header: "Contact Person Name",
      }),
      columnHelper.accessor("contact_person_role", {
        cell: (info) => info.getValue(),
        header: "Contact Person Role",
      }),
      columnHelper.accessor("contact_person_phone_number", {
        cell: (info) => info.getValue(),
        header: "Contact Person Phone",
      }),
      columnHelper.accessor("contact_person_email", {
        cell: (info) => info.getValue(),
        header: "Contact Person Email",
      }),
      columnHelper.accessor("description_en", {
        cell: (info) => info.getValue(),
        header: "Description (EN)",
      }),
      columnHelper.accessor("description_fr", {
        cell: (info) => info.getValue(),
        header: "Description (FR)",
      }),
      columnHelper.accessor("description_rw", {
        cell: (info) => info.getValue(),
        header: "Description (RW)",
      }),
      // columnHelper.accessor("work_days", {
      //   cell: (info) => info.getValue(),
      //   header: "Work Days",
      // }),
      // columnHelper.accessor("work_hours", {
      //   cell: (info) => info.getValue(),
      //   header: "Work Hours",
      // }),
      // columnHelper.accessor("event_date", {
      //   cell: (info) => formatTheDate(info.getValue(), "DD/MM/YYYY"),
      //   header: "Date",
      // }),
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
      // columnHelper.accessor("isActive", {
      //   cell: (info) => {
      //     const status_ = info.getValue();

      //     let status_HTML: React.ReactNode;
      //     switch (status_) {
      //       case true:
      //         status_HTML = (
      //           <Flex alignItems="center" justifyContent="center">
      //             <CommonIcons iconName="active" colorVal="green.500" />
      //             <Text ml={2}>{StatusType.ACTIVATED}</Text>
      //           </Flex>
      //         );
      //         break;
      //       case false:
      //         status_HTML = (
      //           <Flex alignItems="center" justifyContent="center">
      //             <CommonIcons iconName="disable" colorVal="red.500" />
      //             <Text ml={2}>{StatusType.DEACTIVATED}</Text>
      //           </Flex>
      //         );
      //         break;
      //       default:
      //         status_HTML = <Text ml={2}>N/A</Text>;
      //     }
      //     return status_HTML;
      //   },
      //   header: "Status",
      // }),
      columnHelper.accessor("id", {
        cell: (info) => {
          // const status = info.row.original.isActive;

          // const handleActivateOrDeactivate = () => {
          //   setSelectedRecentEvent(info.row.original);
          //   setIsOpenActivateOrDeactivateModal(true);
          // };

          const handleEdit = () => {
            setSelectedRecentEvent(info.row.original);
            setOpenNewRecentEventModel(true);
          };

          const handledelete = () => {
            setSelectedRecentEvent(info.row.original);
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
                {/* <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  // onClick={handleActivateOrDeactivate}
                >
                  {ActionButton(
                    status ? "deactivate" : "activate",
                    handleActivateOrDeactivate
                  )}
                </MenuItem> */}
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
    data: CommissionsData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Commission Management</Heading>
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
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Commission
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
        {!loading && CommissionsData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedCommission ? "Update" : "Add"} recent event`}
        isOpen={openNewRecentEventModel}
        onClose={() => setOpenNewRecentEventModel(false)}
        child={
          <AddCommissionCard
            onClose={() => {
              setSelectedRecentEvent(null);
              setOpenNewRecentEventModel(false);
            }}
            fetchCommission={fetchCommission}
            Commission={selectedCommission}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="25vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this location?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedRecentEvent(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedCommission) {
            handleLocationDelete(selectedCommission?.id);
          }
        }}
      />
      {/* <AlertDialog
        alertText={`Are you sure you want to ${
          selectedCommission?.isActive ? "deactivate" : "activate"
        } this recent event?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedRecentEvent(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedCommission) {
            handleEventStatus(selectedCommission);
          }
        }}
      /> */}
    </Stack>
  );
};

export default CommissionManagement;
