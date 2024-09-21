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
import { parishCommitteeCouncilResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddparishCommitteeCouncilCard from "./Components/ParishCommitteeCouncilCard";
import { deleteparishCommitteeCouncil, getAllparishCommitteeCouncils } from "../../api/parishCommitteeCouncil";

const ParishCommitteeCouncilManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [parishCommitteeCouncilsData, setparishCommitteeCouncilData] = useState<parishCommitteeCouncilResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewRecentEventModel, setOpenNewRecentEventModel] = useState(false);
  // const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
  //   useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedparishCommitteeCouncil, setSelectedRecentEvent] =
    useState<parishCommitteeCouncilResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchparishCommitteeCouncil = async () => {
    setLoading(true);
    await getAllparishCommitteeCouncils()
      .then((data) => {
        setparishCommitteeCouncilData(data.parishCommitteeCouncils);
        setNumberPages(1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get parishCommitteeCouncil Message",
          description:
            error.response.data?.message || "Error geting parishCommitteeCouncils time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchparishCommitteeCouncil();
  }, []);

  // const handleEventStatus = async (parishCommitteeCouncil: parishCommitteeCouncilResponse) => {
  //   const editPayload: UpdateparishCommitteeCouncilForm = {
  //     name_en: parishCommitteeCouncil.name_en,
  //     name_fr: parishCommitteeCouncil.name_fr,
  //     name_rw: parishCommitteeCouncil.name_rw,
  //     description_en: parishCommitteeCouncil.description_en,
  //     description_fr: parishCommitteeCouncil.description_fr,
  //     description_rw: parishCommitteeCouncil.description_rw,
  //     work_hours: parishCommitteeCouncil.work_hours,
  //     work_days: parishCommitteeCouncil.work_days,
  //     contact_person_name: parishCommitteeCouncil.contact_person_name,
  //     contact_person_phone_number: parishCommitteeCouncil.contact_person_phone_number,
  //     backgroundImageId: parishCommitteeCouncil.backgroundImage?.id || null,
  //     parishCommitteeCouncilsId: selectedparishCommitteeCouncil?.id || null
  //   };
  //   await updateparishCommitteeCouncil(editPayload)
  //     .then((res: MessageResponse) => {
  //       toast({
  //         title: "Change Servise Status Message",
  //         description:
  //           res?.message || "parishCommitteeCouncil status changed successfully",
  //         status: "success",
  //       });
  //       setIsOpenActivateOrDeactivateModal(false);
  //       fetchparishCommitteeCouncil();
  //       setSelectedRecentEvent(null);
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Change Servise Status Message",
  //         description:
  //           error.response.data?.message ||
  //           "Error editing recent event status!",
  //         status: "error",
  //       });
  //     });
  // };

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
        header: "position(EN)",
      }),
      columnHelper.accessor("position_fr", {
        cell: (info) => info.getValue(),
        header: "position(FR)",
      }),
      columnHelper.accessor("position_rw", {
        cell: (info) => info.getValue(),
        header: "position(RW)",
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
      columnHelper.accessor("telephone", {
        cell: (info) => info.getValue(),
        header: "Telephone",
      }),
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Email",
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
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Parish Committee Council
          Event
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
        {!loading && parishCommitteeCouncilsData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedparishCommitteeCouncil ? "Update" : "Add"} Parish Committee Council`}
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
          if (selectedparishCommitteeCouncil) {
            handleLocationDelete(selectedparishCommitteeCouncil?.id);
          }
        }}
      />
      {/* <AlertDialog
        alertText={`Are you sure you want to ${
          selectedparishCommitteeCouncil?.isActive ? "deactivate" : "activate"
        } this recent event?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedRecentEvent(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedparishCommitteeCouncil) {
            handleEventStatus(selectedparishCommitteeCouncil);
          }
        }}
      /> */}
    </Stack>
  );
};

export default ParishCommitteeCouncilManagement;
