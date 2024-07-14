import {
  Box,
} from "@chakra-ui/react";
import RecentEventsCard from "./Cards/recentEventsCard";
import TopParishNewsAndNoticesCard from "./Cards/topNewsAndNoticesCard";

const UpdateHomePage = () => {
  // useEffect(() => {
  //   if (updateUser.isSuccess && props.onFetch) props.onFetch()
  // }, [props, updateUser.isSuccess])

  return (
    <Box
      minH="full"
      bg="primaryBackground"
      pt={"6"}
      px={{ base: "4", sm: "6", md: "12", xl: "20" }}
      pb={"14"}
      // flexGrow="1"
      // alignSelf={"center"}
      // alignItems={"center"}
    >
      {/* <MasstimesCard /> */}
      {/* <MassLocationCard/> */}
      {/* <MassLanguageCard/> */}
      <RecentEventsCard/>
      <TopParishNewsAndNoticesCard/>
    </Box>
  );
};

export default UpdateHomePage


