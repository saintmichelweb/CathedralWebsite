import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { getUserProfile } from "../../api/users";
import logo from '../../assets/Logo.png'

const UpdateHomePage = () => {
  useEffect(() => {
    getUserProfile()
  }, [])
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
        <Image
          border={'dashed'}
          borderColor={'gray.200'}
          rounded={10}
          mt={'-20'}
          loading="lazy"
          height={'10rem'}
          maxH={'fit-content'}
          alt="Image"
          objectFit={'contain'}
          src={logo}
          crossOrigin="anonymous"
        />
        <Heading
          size={"3xl"}
          color={"primary"}
          width={'fit-content'}
        >
          Website's Management Portal
        </Heading>
      </Stack>
    </Box>
  );
};

export default UpdateHomePage;
