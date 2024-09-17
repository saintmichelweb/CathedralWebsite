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
  CustomButton,
  CustomLink,
  DataTable,
  EmptyState,
  TableSkeleton,
} from "../../components/ui";
import { WelcomeMessageResponse } from '../../types/apiResponses';
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import { getWelcomeMessage } from "../../api/welcomeMessage";
import AddWelcomeMessageCard from "./Components/welcomeMessageCard";

const WelcomeMessageManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [welcomeMessageData, setWelcomeMessageData] = useState<WelcomeMessageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewWelcomeMessageModel, setWelcomeMessageModel] = useState(false);
  const [selectedWelcomeMessage, setSelectedWelcomeMessage] =
    useState<WelcomeMessageResponse | null>(null);
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchWelcomeMessage = async () => {
    setLoading(true);
    await getWelcomeMessage()
      .then((data) => {
        console.log(data.welcomeMessage)
        setWelcomeMessageData(data.welcomeMessage);
        if (data.welcomeMessage.length) setSelectedWelcomeMessage(data.welcomeMessage[0])
        setNumberPages(1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Welcome Message Message",
          description:
            error.response.data?.message || "Error geting Welcome Message!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<WelcomeMessageResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("welcomeMessage_en", {
        cell: (info) => info.getValue(),
        header: "Message (EN)",
      }),
      columnHelper.accessor("welcomeMessage_fr", {
        cell: (info) => info.getValue(),
        header: "Message (FR)",
      }),
      columnHelper.accessor("welcomeMessage_rw", {
        cell: (info) => info.getValue(),
        header: "Message (RW)",
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
            setSelectedWelcomeMessage(info.row.original);
            setWelcomeMessageModel(true);
          };

          return (
            <Box>
              {ActionButton("edit", handleEdit)}
            </Box>
          );
        },
        header: "Action",
      }),
    ];
  }, []);

  const table = useTable({
    data: welcomeMessageData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Welcome Message Management</Heading>
        </Stack>
        <CustomButton
          type="button"
          isLoading={false}
          minW={"8rem"}
          onClick={() => setWelcomeMessageModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> Add Welcome Message
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
        {!loading && welcomeMessageData.length === 0 && (
          <EmptyState text="There are no priests to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedWelcomeMessage ? "Update" : "Add"} Welcome Message`}
        isOpen={openNewWelcomeMessageModel}
        onClose={() => setWelcomeMessageModel(false)}
        child={
          <AddWelcomeMessageCard
            onClose={() => {
              setSelectedWelcomeMessage(null);
              setWelcomeMessageModel(false);
            }}
            fetchWelcomeMessage={fetchWelcomeMessage}
            welcomeMessage={selectedWelcomeMessage}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="25vw"
      />
    </Stack>
  );
};

export default WelcomeMessageManagement;