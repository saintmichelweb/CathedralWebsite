import { Box, Heading, Stack } from "@chakra-ui/react";
// import CustomFileUploadModal from "../../components/ui/CustomModal/CustomFileUploadModal";
import FileUploadModal from "../../components/ui/CustomModal/FileUploadModal";
// import ZoneFileUpload from "../../components/ui/CustomModal/ZoneFileUpload";
// import RecentEventsCard from "../RecentEvents/Components/recentEventsCard";
// import TopParishNewsAndNoticesCard from "../TopNewsAndNotices/Components/topNewsAndNoticesCard";

const UpdateHomePage = () => {
  // useEffect(() => {
  //   if (updateUser.isSuccess && props.onFetch) props.onFetch()
  // }, [props, updateUser.isSuccess])

  return (
    <Box
      h={"full"}
      bg="primaryBackground"
      // pt={"6"}
      // px={{ base: "4", sm: "6", md: "12", xl: "20" }}
      // pb={"14"}
      // flexGrow="1"
      alignSelf={"center"}
      alignItems={"center"}
    >
      <Stack
        minH="full"
        w={'full'}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={'fit-content'}>
          <Heading
            size={"4xl"}
            color={"primary"}
            width={'fit-content'}
          >
            Welcome To Cathedral Saint Michael Portal
          </Heading>
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdateHomePage;
