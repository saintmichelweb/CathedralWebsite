import { Box, Heading } from "@chakra-ui/react";
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
      <Box
        minH="full"
        w={'full'}
        // bg="accent"
        // pt={"6"}
        // px={{ base: "4", sm: "6", md: "12", xl: "20" }}
        // pb={"14"}
        // flexGrow="1"
        // alignSelf={"center"}
        // justifySelf={'center'}
        alignContent={"center"}
        // justifyItems={"center"}
        justifyContent={"center"}
      >
        {/* <MasstimesCard /> */}
        {/* <MassLocationCard/> */}
        {/* <MassLanguageCard/> */}
        {/* <RecentEventsCard/> */}
        {/* <TopParishNewsAndNoticesCard/> */}
        <Box>
          <Heading
            size={"4xl"}
            alignSelf={"center"}
            justifySelf={"center"}
            width={"fit-content"}
            color={"primary"}
          >
            Welcome To Saint Michael Website Portal
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateHomePage;
