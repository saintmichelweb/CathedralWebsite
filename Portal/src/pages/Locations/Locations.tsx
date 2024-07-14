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
import { LocationResponse, MessageResponse } from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import {
  getLocations,
  updateLocation,
} from "../../api/location";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import AddLocationCard from "./Components/LocationCard";
import { UpdateLocationForm } from "../../lib/validations/location";

const LocationsManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [locationData, setLocationData] = useState<LocationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewLocationModel, setOpenNewLocationModel] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  // const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchLocations = async () => {
    setLoading(true)
    await getLocations()
      .then((data) => {
        console.log(data.locations);
        setLocationData(data.locations);
        setNumberPages(data.numberOfPages || 1);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        toast({
          title: "Get Locations Message",
          description:
            error.response.data?.message || "Error geting locations time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchLocations();
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

  const handleLocationStatus = async (location: LocationResponse) => {
    const editPayload: UpdateLocationForm = {
      location: location.location,
      locationId: location.id,
      isActive: !location.isActive,
    };
    await updateLocation(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Change Location Status Message",
          description: res?.message || "Location status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchLocations();
        setSelectedLocation(null);
      })
      .catch((error) => {
        toast({
          title: "Change Location Status Message",
          description:
            error.response.data?.message || "Error editing location status!",
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
  //       fetchLocations();
  //       setSelectedLocation(null);
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
    const columnHelper = createColumnHelper<LocationResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("location", {
        cell: (info) => info.getValue(),
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
            setSelectedLocation(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedLocation(info.row.original);
            setOpenNewLocationModel(true);
          };

          // const handledelete = () => {
          //   setSelectedLocation(info.row.original);
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
    data: locationData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Locations Management</Heading>
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
          onClick={() => setOpenNewLocationModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Location
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
        {!loading && locationData.length === 0 && (
          <EmptyState text="There are no locations to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedLocation ? "Update" : "Add"} Location`}
        isOpen={openNewLocationModel}
        onClose={() => setOpenNewLocationModel(false)}
        child={
          <AddLocationCard
            onClose={() => {
              setSelectedLocation(null);
              setOpenNewLocationModel(false);
            }}
            fetchLocations={fetchLocations}
            location={selectedLocation}
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
          setSelectedLocation(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedLocation) {
            handleLocationDelete(selectedLocation?.id);
          }
        }}
      /> */}
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedLocation?.isActive ? "deactivate" : "activate"
        } this location?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedLocation(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedLocation) {
            handleLocationStatus(selectedLocation);
          }
        }}
      />
    </Stack>
  );
};

export default LocationsManagement;
