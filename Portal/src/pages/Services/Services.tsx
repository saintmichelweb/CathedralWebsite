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
import { ServicesResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddServicesCard from "./Components/ServicesCard";
import { deleteService, getAllServices } from "../../api/services";

const ServicesManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [servicesData, setServicesData] = useState<ServicesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewRecentEventModel, setOpenNewRecentEventModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedRecentEvent, setSelectedRecentEvent] =
    useState<ServicesResponse | null>(null);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchServices = async (page = 1) => {
    setLoading(true);
    await getAllServices({page})
      .then((data) => {
        setServicesData(data.services);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Services Message",
          description:
            error.response.data?.message || "Error geting services time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleLocationDelete = async (serviceId: number) => {
    await deleteService(serviceId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Servise Message",
          description: res?.message || "Servise deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchServices();
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
    const columnHelper = createColumnHelper<ServicesResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("name_en", {
        cell: (info) => info.getValue(),
        header: "Title(EN)",
      }),
      columnHelper.accessor("name_fr", {
        cell: (info) => info.getValue(),
        header: "Title(FR)",
      }),
      columnHelper.accessor("name_rw", {
        cell: (info) => info.getValue(),
        header: "Title(RW)",
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
      columnHelper.accessor("contact_person_name", {
        cell: (info) => info.getValue(),
        header: "Contact Person",
      }),
      columnHelper.accessor("contact_person_phone_number", {
        cell: (info) => info.getValue(),
        header: "Telephone Number",
      }),
      columnHelper.accessor("work_days", {
        cell: (info) => info.getValue(),
        header: "Work Days",
      }),
      columnHelper.accessor("work_hours", {
        cell: (info) => info.getValue(),
        header: "Work Hours",
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
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                >
                  {ActionButton("delete", handledelete)}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
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
    data: servicesData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Services Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewRecentEventModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Service
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
              onFetch={fetchServices}
              useCustomPagination
            />
          )}
        </>
        {!loading && servicesData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedRecentEvent ? "Update" : "Add"} Service`}
        isOpen={openNewRecentEventModel}
        onClose={() => setOpenNewRecentEventModel(false)}
        child={
          <AddServicesCard
            onClose={() => {
              setSelectedRecentEvent(null);
              setOpenNewRecentEventModel(false);
            }}
            fetchServices={fetchServices}
            service={selectedRecentEvent}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="45vw"
      />
      <AlertDialog
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
      />
    </Stack>
  );
};

export default ServicesManagement;
