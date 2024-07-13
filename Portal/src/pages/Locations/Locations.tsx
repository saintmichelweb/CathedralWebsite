import { useEffect, useMemo, useRef, useState } from "react";
import {
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAdd, MdMoreVert } from "react-icons/md";

import { searchParams } from "@/types/merchants";
// import {
//   RolesFilterForm,
//   rolesFilterSchema,
// } from "@/lib/validations/listFilters";
// import { getRoles } from "@/api/roles";
import { useTable } from "@/hooks";
import {
  AlertDialog,
  CommonIcons,
  CustomButton,
  CustomLink,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "@/components/ui";
import ExportButton from "@/components/ui/ExportButton/ExportButton";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import { CustomFormSelect, FormSelect } from "@/components/form";
import { LocationResponse } from "../../types/apiResponses";
import { formatTheDate } from "../../utils";
import { StatusType } from "../../../../shared-lib/src";

const LocationsManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });
const locations: LocationResponse= [
    {
    id: 1,
    location: 'kigali',
    isActive: true,
    created_at: formatTheDate(Date.now()),
    updated_at: formatTheDate(Date.now())
},
    {
    id: 2,
    location: 'Nyarugenge',
    isActive: true,
    created_at: formatTheDate(Date.now()),
    updated_at: formatTheDate(Date.now())
},
    {
    id: 3,
    location: 'Kicukiro',
    isActive: true,
    created_at: formatTheDate(Date.now()),
    updated_at: formatTheDate(Date.now())
},
    {
    id: 4,
    location: 'Gasabo',
    isActive: false,
    created_at: formatTheDate(Date.now()),
    updated_at: formatTheDate(Date.now())
},
]

  const [locationData, setLocationData] = useState<LocationResponse[]>([locations]);
  const [loading, setLoading] = useState<boolean>(true);
  const ignore = useRef(false);
  const [isOpenActivateModal, setIsOpenActivateModal] = useState(false);
  const [isOpenBlockModal, setIsOpenBlockModal] = useState(false);
  const [isOpenDisableModal, setIsOpenDisableModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const toast = useToast();
  const [searchOn, setSearchOn] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    reset,
    handleSubmit,
  } = useForm<RolesFilterForm>({
    resolver: zodResolver(rolesFilterSchema),
    defaultValues: {
      status: null,
    },
  });

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
            : "accent-outline"
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
            : "Disable"}
        </Text>
      </CustomLink>
    );
  };

  const fetchRolesRecords = async (query: RolesFilterForm | searchParams) => {
    setLoading(true);
    // await getRoles(query)
    //   .then((response) => {
    //     setlocationData(response.data);
    //     setTotalPages(response.totalPages);
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error fetching data!",
    //       description:
    //         error?.response?.data?.message ||
    //         "Failed to fetch data. Please try again.",
    //       status: "error",
    //     });
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const onSearchFn = async (query: string) => {
    fetchRolesRecords({
      ...getValues(),
      search: query,
      page: 1,
    });
  };

  useEffect(() => {
    if (!query && searchOn) {
      fetchRolesRecords({
        page: 1,
      });
      setSearchOn(false);
    }
  }, [query, searchOn]);

  const onPageChange = (currentPageVal: number) => {
    fetchRolesRecords({
      page: currentPageVal,
    });
  };

  useEffect(() => {
    if (ignore.current) {
      return;
    }
    ignore.current = true;
    fetchRolesRecords({
      page: 1,
    });
  }, []);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<LocationResponse>();
    return [
      columnHelper.display({
        id: 'identifier',
        header: 'Id',
        cell: ({row}) => row.original.id,
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
          const roleId = info.getValue();
          const status = info.row.original.status;

          const handleEdit = () => {
            setSelectedLocation(roleId);
          };

          const handleDisable = () => {
            setSelectedRole(info.row.original);
            setIsOpenDisableModal(true);
          };

          const handleActivate = () => {
            setSelectedRole(info.row.original);
            setIsOpenActivateModal(true);
          };

          const handledelete = () => {
            setSelectedRole(info.row.original);
            setIsOpenBlockModal(true);
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
                  onClick={status ? handleDisable : handleActivate}
                >
                  {ActionButton(status ? "deactivate" : "activate")}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  onClick={handledelete}
                >
                  {ActionButton("delete")}
                </MenuItem>
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

  const onFilterSubmit = () => {
    fetchRolesRecords({
      ...getValues(),
      page: 1,
    });
  };

  const filterBody = (
    <Flex
      as="form"
      flexDir={{ base: "column", md: "row" }}
      gap="8"
      data-testid="filter-form"
      onSubmit={handleSubmit(onFilterSubmit)}
    >
      <FormSelect
        name="status"
        register={register}
        errors={errors}
        label="Status"
        placeholder="Choose role status"
        options={COMMON_STATUSES}
      />
      <CustomFormSelect
        label="Level"
        placeholder="Choose role level"
        options={roleLevels.data?.data.map((e: string) => ({
          label: `${e}`,
          value: e,
        }))}
        selectValue={selectedRoleLevel}
        onChangeFn={(val) => {
          if (val) {
            setSelectedRoleLevel(val);
            setValue("level", val.value.toString());
          }
        }}
      />

      <HStack alignSelf="end" gap="3">
        <CustomButton
          colorVariant="accent-outline"
          mb="1"
          minW={"7.5rem"}
          onClick={() => {
            fetchRolesRecords({
              page: 1,
            });
            setSelectedRoleLevel(null);
            reset();
          }}
        >
          Clear
        </CustomButton>

        <CustomButton type="submit" mb="1" minW={"7.5rem"}>
          Filter
        </CustomButton>
      </HStack>
    </Flex>
  );

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
          <Heading size="md">Role Management</Heading>
        </Stack>
        <CustomLink
          to="/portal-user-management/role-management/create-role"
          mr={{ base: 0, lg: 2 }}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Role
        </CustomLink>
      </Flex>
      {viewType === "list" && (
        <SearchInput
          filterBody={filterBody}
          onReset={() => {
            setSelectedRoleLevel(null);
            reset();
          }}
          onSearch={(query: string) => {
            onSearchFn(query);
            setSearchOn(true);
          }}
          setQuery={setQuery}
          exportButton={
            <ExportButton
              onExportCSV={() => {
                setExport("csv");
                handleExport();
              }}
              onExportExcel={() => {
                setExport("xlsx");
                handleExport();
              }}
              isDisable={locationData.length === 0}
            />
          }
        />
      )}
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
              totalPages={totalPages}
              onFetch={onPageChange}
              useCustomPagination
            />
          )}
        </>
        {!loading && locationData.length === 0 && (
          <EmptyState text="There are no roles to present yet." mt="10" />
        )}
      </Box>
      {/* alert Dialogues */}
      <AlertDialog
        alertText={`Are you sure you wan't to Activate  ${selectedRole?.name}?`}
        isOpen={isOpenActivateModal}
        onClose={() => setIsOpenActivateModal(false)}
        onConfirm={() => {
          handleStatusClick(selectedRole?.id, "1");
          setIsOpenActivateModal(false);
        }}
      />
      <AlertDialog
        alertText={`are you sure you wan't to Disable ${selectedRole?.name}?`}
        isOpen={isOpenDisableModal}
        onClose={() => setIsOpenDisableModal(false)}
        onConfirm={() => {
          handleStatusClick(selectedRole?.id, "0");
          setIsOpenDisableModal(false);
        }}
      />
      <AlertDialog
        alertText={`Are you sure you wan't to Delete ${selectedRole?.name}?`}
        isOpen={isOpenBlockModal}
        onClose={() => setIsOpenBlockModal(false)}
        onConfirm={() => {
          handleDeleteClick(selectedRole?.id);
          setIsOpenBlockModal(false);
        }}
      />
    </Stack>
  );
};

export default LocationsManagement;
