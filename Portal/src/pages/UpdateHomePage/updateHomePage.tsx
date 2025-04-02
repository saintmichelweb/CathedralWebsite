import { Box, Heading, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { getUserProfile } from "../../api/users";

const UpdateHomePage = () => {
  useEffect(() => {
    getUserProfile()
  },[])
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
            size={"3xl"}
            color={"primary"}
            width={'fit-content'}
          >
            Welcome To Cathedral Saint Michel Website Portal
          </Heading>
          {/* <TimeSelector/> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdateHomePage;
