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
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import {
  TopNewsAndNoticesResponse,
  MessageResponse,
} from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import AddTopParishNewsOrNoticeCard from "./Components/TopNewsAndNoticesCard";
import {
  deleteTopNewsAndNotices,
  getAllTopNewsAndNotices,
  updateTopNewsAndNotices,
} from "../../api/topNewsAndNotices";
import { UpdateTopNewsAndNoticesForm } from "../../lib/validations/topParishNewsAndNotices";

const TopNewsAndNoticesManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [topNewsAndNoticesData, setTopNewsAndNoticesData] = useState<
    TopNewsAndNoticesResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewTopNewsAndNoticeModel, setOpenNewTopNewsAndNoticeModel] =
    useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedTopNewsAndNotice, setSelectedTopNewsAndNotice] =
    useState<TopNewsAndNoticesResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchTopNewsAndNotices = async () => {
    setLoading(true);
    await getAllTopNewsAndNotices()
      .then((data) => {
        setTopNewsAndNoticesData(data.topParishNewsAndNotices);
        setNumberPages(data.numberOfPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Top Parish News And Notices Message",
          description:
            error.response.data?.message ||
            "Error geting top parish news and notices!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchTopNewsAndNotices();
  }, []);

  const handleTopParishNewsAndNoticesStatus = async (
    topParishNewsAndEvent: TopNewsAndNoticesResponse
  ) => {
    const editPayload: UpdateTopNewsAndNoticesForm = {
      title_en: topParishNewsAndEvent.title_en,
      title_fr: topParishNewsAndEvent.title_fr,
      title_rw: topParishNewsAndEvent.title_rw,
      description_en: topParishNewsAndEvent.description_en,
      description_rw: topParishNewsAndEvent.description_rw,
      description_fr: topParishNewsAndEvent.description_fr,
      isActive: !topParishNewsAndEvent.isActive,
      topNewsOrNoticeId: topParishNewsAndEvent.id,
    };
    await updateTopNewsAndNotices(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Change Top Parish News / Notices Status Message",
          description:
            res?.message ||
            "Top parish news / notice status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchTopNewsAndNotices();
        setSelectedTopNewsAndNotice(null);
      })
      .catch((error) => {
        toast({
          title: "Change Top Parish News / Notices Status Message",
          description:
            error.response.data?.message ||
            "Error editing top parish news / notice status!",
          status: "error",
        });
      });
  };

  const handleTopNewsAndNoticeDelete = async (locationId: number) => {
    await deleteTopNewsAndNotices(locationId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete Top Parish News / Notices Message",
          description:
            res?.message || "Top Parish News / Notices deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchTopNewsAndNotices();
        setSelectedTopNewsAndNotice(null);
      })
      .catch((error) => {
        toast({
          title: "Delete Top Parish News / Notices Message",
          description:
            error.response.data?.message ||
            "Error deleting Top Parish News / Notices!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<TopNewsAndNoticesResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("title_en", {
        cell: (info) => info.getValue(),
        header: "Title(en)",
      }),
      columnHelper.accessor("title_fr", {
        cell: (info) => info.getValue(),
        header: "Title(fr)",
      }),
      columnHelper.accessor("title_rw", {
        cell: (info) => info.getValue(),
        header: "Title(rw)",
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
            setSelectedTopNewsAndNotice(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedTopNewsAndNotice(info.row.original);
            setOpenNewTopNewsAndNoticeModel(true);
          };

          const handledelete = () => {
            setSelectedTopNewsAndNotice(info.row.original);
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
                  // onClick={handleEdit}
                >
                  {ActionButton("edit", handleEdit)}
                </MenuItem>
                <Divider />
                <MenuItem
                  px={0}
                  _focus={{ bg: "transparent" }}
                  // onClick={handleActivateOrDeactivate}
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
                  // onClick={handledelete}
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
    data: topNewsAndNoticesData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Top Parish News / Notices Management</Heading>
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
          onClick={() => setOpenNewTopNewsAndNoticeModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New News/Notice
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
        {!loading && topNewsAndNoticesData.length === 0 && (
          <EmptyState text="There are no events to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${
          selectedTopNewsAndNotice ? "Update" : "Add"
        } news/notice`}
        isOpen={openNewTopNewsAndNoticeModel}
        onClose={() => setOpenNewTopNewsAndNoticeModel(false)}
        child={
          <AddTopParishNewsOrNoticeCard
            onClose={() => {
              setSelectedTopNewsAndNotice(null);
              setOpenNewTopNewsAndNoticeModel(false);
            }}
            fetchTopNewsAndNotices={fetchTopNewsAndNotices}
            topParishNewsOrNotice={selectedTopNewsAndNotice}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="40vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this Top Parish News / Notices?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedTopNewsAndNotice(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedTopNewsAndNotice) {
            handleTopNewsAndNoticeDelete(selectedTopNewsAndNotice?.id);
          }
        }}
      />
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedTopNewsAndNotice?.isActive ? "deactivate" : "activate"
        } this news/notice?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedTopNewsAndNotice(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedTopNewsAndNotice) {
            handleTopParishNewsAndNoticesStatus(selectedTopNewsAndNotice);
          }
        }}
      />
    </Stack>
  );
};

export default TopNewsAndNoticesManagement;
