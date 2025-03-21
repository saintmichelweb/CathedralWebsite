import { Box, Heading, Stack } from "@chakra-ui/react";
import TimeSelector from "../../components/ui/HoursMinutesInputs/HoursMinutesInputs";

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
          <TimeSelector/>
          {/* <TimeSelectors/> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default UpdateHomePage;
