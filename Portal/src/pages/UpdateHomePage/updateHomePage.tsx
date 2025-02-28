import { Box, Heading, Stack } from "@chakra-ui/react";
// import CustomFileUploadModal from "../../components/ui/CustomModal/CustomFileUploadModal";
import FileUploadModal from "../../components/ui/CustomModal/FileUploadModal";
// import ZoneFileUpload from "../../components/ui/CustomModal/ZoneFileUpload";
// import RecentEventsCard from "../RecentEvents/Components/recentEventsCard";
// import TopParishNewsAndNoticesCard from "../TopNewsAndNotices/Components/topNewsAndNoticesCard";

const UpdateHomePage = () => {
  return (
    <Box
      h={"full"}
      bg="primaryBackground"
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
