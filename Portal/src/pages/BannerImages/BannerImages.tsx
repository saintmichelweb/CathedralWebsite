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
import { BannerImageResponse, MessageResponse } from "../../types/apiResponses";
import { StatusType } from "../../../../shared-lib/src";
import { useTable } from "../../hooks";
import CustomModal from "../../components/ui/CustomModal/CustomModal";
import { getLanguages, updateLanguage } from "../../api/language";
import AddBannerImageCard from "./Components/AddBannerImageCard";
import ActionButton from "../../components/ui/ActionButton/ActionButton";
import { getBannerImages, updateImage } from "../../api/images";
import { UpdateLanguageForm } from '../../lib/validations/language';
import { UpdateBannerImageForm } from "../../lib/validations/image";

const BannerImagesManagement = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: import.meta.env.VITE_LIMIT_PER_PAGE || 10,
  });

  const toast = useToast();
  const [bannerImagesData, setBannerImagesData] = useState<BannerImageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const ignore = useRef(false);
  const [openNewBannerImageModel, setOpenNewBannerImageModel] = useState(false);
  const [isOpenActivateOrDeactivateModal, setIsOpenActivateOrDeactivateModal] =
    useState(false);
  // const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedBannerImage, setSelectedBannerImage] =
    useState<BannerImageResponse | null>(null);
  // const toast = useToast();
  // const [searchOn, setSearchOn] = useState<boolean>(false);
  const [numberPages, setNumberPages] = useState<number>(1);

  const fetchBannerImages = async () => {
    setLoading(true);
    await getBannerImages()
      .then((data) => {
        setBannerImagesData(data.bannerImages);
        setNumberPages(data.numberOfPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Get Banner Images Message",
          description:
            error.response.data?.message || "Error getting banner images time!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchBannerImages();
  }, []);

  const handleBannerImageStatus = async (bannerImage: BannerImageResponse) => {
    const editPayload: UpdateBannerImageForm = {
      imageId: bannerImage.id,
      bannerDescription: bannerImage.bannerDescription,
      isActive: bannerImage.isActive,
    };
    await updateImage({...editPayload, isBannerImage: !bannerImage.isBannerImage})
      .then((res: MessageResponse) => {
        toast({
          title: "Change Banner Image Status Message",
          description: res?.message || "Banner Image  status changed successfully",
          status: "success",
        });
        setIsOpenActivateOrDeactivateModal(false);
        fetchBannerImages();
        setSelectedBannerImage(null);
      })
      .catch((error) => {
        toast({
          title: "Change Banner Image  Status Message",
          description:
            error.response.data?.message || "Error editing banner Image status!",
          status: "error",
        });
      });
  };

  // const handleLanguageDelete = async (bannerImageId: number) => {
  //   await deletLanguage(bannerImageId)
  //     .then((res: MessageResponse) => {
  //       toast({
  //         title: "Delete Language Message",
  //         description: res?.message || "Language deleted successfully",
  //         status: "success",
  //       });
  //       setIsOpenDeleteModal(false);
  //       fetchBannerImages();
  //       setSelectedBannerImage(null);
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Delete Language Message",
  //         description:
  //           error.response.data?.message || "Error deleting bannerImage!",
  //         status: "error",
  //       });
  //     });
  // };

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<BannerImageResponse>();
    return [
      columnHelper.display({
        id: "identifier",
        header: "Id",
        cell: ({ row }) => row.original.id,
      }),
      columnHelper.accessor("filename", {
        cell: (info) => {
          const imageUrl = info.row.original?.imageUrl;
          const filename = info.row.original?.filename;
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
        header: "Image ",
      }),
      columnHelper.accessor("bannerDescription", {
        cell: (info) => info.getValue(),
        header: "Description",
      }),
      columnHelper.accessor("isBannerImage", {
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
        header: "Banner Visible",
      }),
      columnHelper.accessor("id", {
        cell: (info) => {
          const status = info.row.original.isBannerImage;

          const handleActivateOrDeactivate = () => {
            setSelectedBannerImage(info.row.original);
            setIsOpenActivateOrDeactivateModal(true);
          };

          const handleEdit = () => {
            setSelectedBannerImage(info.row.original);
            setOpenNewBannerImageModel(true);
          };

          // const handledelete = () => {
          //   setSelectedBannerImage(info.row.original);
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
            //     // </MenuItem>
            //     <Divider />
            //     <MenuItem
            //       px={0}
            //       _focus={{ bg: "transparent" }}
            //       onClick={handledelete}
            //     >
            //       {/* {ActionButton("delete")} */}
            //     </MenuItem>
            //     {/* // <Divider />
            //     // <MenuItem
            //     //   px={0}
            //     //   _focus={{ bg: "transparent" }}
            //     //   onClick={handleEdit}
            //     // > */}
            //       {ActionButton("edit")}
            // //     </MenuItem>
            // //   </MenuList>
            // // </Menu>
          );
        },
        header: "Action",
      }),
    ];
  }, []);

  const table = useTable({
    data: bannerImagesData || [],
    columns,
    pagination,
    setPagination,
  });

  return (
    <Stack minH="full" pt="0" px={{ base: "4", sm: "6", lg: "8" }} pb="14">
      <Flex justify="space-between" mb={4} mt={7}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Heading size="md">Banner Images Management</Heading>
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
          onClick={() => setOpenNewBannerImageModel(true)}
        >
          <Icon as={MdAdd} color={"white"} mr={1} boxSize={5} /> New Image
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
        {!loading && bannerImagesData.length === 0 && (
          <EmptyState text="There are no bannerImages to present yet." mt="10" />
        )}
      </Box>
      <CustomModal
        headerTitle={`${selectedBannerImage ? "Update" : "Add"} Banner Image`}
        isOpen={openNewBannerImageModel}
        onClose={() => setOpenNewBannerImageModel(false)}
        child={
          <AddBannerImageCard
            onClose={() => {
              setSelectedBannerImage(null);
              setOpenNewBannerImageModel(false);
            }}
            fetchBannerImages={fetchBannerImages}
            bannerImage={selectedBannerImage}
          />
        }
        showFooter={false}
        isCentered={true}
        widthSize="25vw"
      />
      {/* <AlertDialog
        alertText={`Are you sure you want to delete this bannerImage?`}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setSelectedBannerImage(null);
          setIsOpenDeleteModal(false);
        }}
        onConfirm={() => {
          if (selectedBannerImage) {
            handleLanguageDelete(selectedBannerImage?.id);
          }
        }}
      /> */}
      <AlertDialog
        alertText={`Are you sure you want to ${
          selectedBannerImage?.isActive ? "deactivate" : "activate"
        } this bannerImage?`}
        isOpen={isOpenActivateOrDeactivateModal}
        onClose={() => {
          setSelectedBannerImage(null);
          setIsOpenActivateOrDeactivateModal(false);
        }}
        onConfirm={() => {
          if (selectedBannerImage) {
            handleBannerImageStatus(selectedBannerImage);
          }
        }}
      />
    </Stack>
  );
};

export default BannerImagesManagement;
