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
import { UsersResponse, MessageResponse } from "../../types/apiResponses";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import {
  deleteUser,
  resendVerficationEmail,
  updateUser,
} from "../../api/users";
import { getUsers } from "../../api/users";
import { PortalUserStatus } from "../../../../shared-lib/src";
import AddUserCard from "./Components/AddNewUserCard";
import { EditUserForm } from "../../lib/validations/addNewUser";

const UsersManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [usersData, setUsersData] = useState<UsersResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openNewUserModel, setOpenNewUserModel] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersResponse | null>(null);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  const [numberOfPages, setnumberOfPages] = useState<number>(1);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    await getUsers({page})
      .then((data) => {
        setUsersData(data.users);
        setnumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Users Message",
          description:
            error.response.data?.message || "Error geting users time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserDelete = async (userId: number) => {
    await deleteUser(userId)
      .then((res: MessageResponse) => {
        toast({
          title: "Delete User Message",
          description: res?.message || "User deleted successfully",
          status: "success",
        });
        setIsOpenDeleteModal(false);
        fetchUsers();
        setSelectedUser(null);
      })
      .catch((error) => {
        toast({
          title: "Delete User Message",
          description: error.response.data?.message || "Error deleting user!",
          status: "error",
        });
      });
  };

  const handleUserStatus = async (selectedUser: UsersResponse) => {
    const editPayload: EditUserForm = {
      name: selectedUser.name,
      position: selectedUser.position,
      email: selectedUser.email,
      phone: selectedUser.phone_number,
      status:
        selectedUser.status === PortalUserStatus.ACTIVE
          ? PortalUserStatus.DISABLED
          : PortalUserStatus.ACTIVE,
      userId: selectedUser.id,
      //   backgroundImageId: recentEvent.backgroundImage?.id || null
    };
    await updateUser(editPayload)
      .then((res: MessageResponse) => {
        toast({
          title: "Edit User Status message!",
          description: res?.message || "User edited status successfully",
          status: "success",
        });
        fetchUsers();
        setIsOpenActivateOrDeactivateModal(false)
      })
      .catch((error) => {
        toast({
          title: "Edit User Status message",
          description:
            error.response?.data?.message || "Error editing user status!",
          status: "error",
        });
      });
  };

  const handleResendVerificationEmail = async (selectedUser: UsersResponse) => {
    await resendVerficationEmail(selectedUser.email)
      .then((res: MessageResponse) => {
        toast({
          title: "Edit Verification Email message!",
          description: res?.message || "Verification Email resent successfully",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          title: "Edit Verification Email message",
          description:
            error.response?.data?.message ||
            "Error resending Verification Email!",
          status: "error",
        });
      });
  };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<UsersResponse>();
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
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Email",
      }),
      columnHelper.accessor("position", {
        cell: (info) => info.getValue(),
        header: "Position",
      }),
      columnHelper.accessor("phone_number", {
        cell: (info) => info.getValue(),
        header: "Telephone",
      }),
      columnHelper.accessor("status", {
        cell: (info) => {
          const status = info.getValue();
          let statusIcon;
          switch (status) {
            case PortalUserStatus.ACTIVE:
              statusIcon = (
                <CommonIcons iconName="active" colorVal="green.500" />
              );
              break;
            case PortalUserStatus.UNVERIFIED:
              statusIcon = (
                <CommonIcons iconName="warning" colorVal="yellow.500" />
              );
              break;
            case PortalUserStatus.RESETPASSWORD:
              statusIcon = (
                <CommonIcons iconName="warning" colorVal="yellow.500" />
              );
              break;
            case PortalUserStatus.DISABLED:
              statusIcon = (
                <CommonIcons iconName="warning" colorVal="red.500" />
              );
              break;
            default:
              statusIcon = null;
          }
          return (
            <Flex alignItems="center" justifyContent="center">
              {statusIcon}
              <Text ml={2}>{status}</Text>
            </Flex>
          );
        },
        header: "Status",
      }),
      columnHelper.accessor("id", {
        cell: (info) => {
          const status = info.row.original.status;
          const handleActivateOrDeactivate = () => {
            setSelectedUser(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedUser(info.row.original);
            setOpenNewUserModel(true);
          };

          const handleResend = () => {
            handleResendVerificationEmail(info.row.original);
          };

          const handledelete = () => {
            setSelectedUser(info.row.original);
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
                {status !== PortalUserStatus.UNVERIFIED ? (
                  <>
                    <MenuItem
                      px={0}
                      _focus={{ bg: "transparent" }}
                    >
                      {ActionButton(
                        status == PortalUserStatus.ACTIVE
                          ? "disable"
                          : "activate",
                        handleActivateOrDeactivate
                      )}
                    </MenuItem>
                    <Divider />
                  </>
                ) : (
                  <>
                    <MenuItem
                      px={0}
                      _focus={{ bg: "transparent" }}
                    >
                      {ActionButton("resend", handleResend)}
                    </MenuItem>
                    <Divider />
                  </>
                )}
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
    data: usersData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={0} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Users Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setOpenNewUserModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> Add User
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
              onFetch={fetchUsers}
              useCustomPagination
            />
          )}
        </>
        {!loading && usersData.length === 0 && (
          <EmptyState text="There are no users to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedUser ? "Update" : "Add"} user`}
        isOpen={openNewUserModel}
        onClose={() => setOpenNewUserModel(false)}
        child={
          <AddUserCard
            onClose={() => {
              setSelectedUser(null);
              setOpenNewUserModel(false);
            }}
            fetchUsers={fetchUsers}
            user={selectedUser}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="30vw"
      />
      <AlertDialog
        alertText={`Are you sure you want to delete this user?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedUser(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedUser) {
            handleUserDelete(selectedUser?.id);
          }
        }}
      />
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedUser?.status == PortalUserStatus.ACTIVE
            ? "disable"
            : "activate"
        } this recent event?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedUser(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedUser) {
            handleUserStatus(selectedUser);
          }
        }}
      />
    </Stack>
  );
};

export default UsersManagement;
