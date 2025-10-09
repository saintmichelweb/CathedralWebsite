import { CustomLink } from '../../components/ui';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";

function NotFoundPage() {
    return (
        <Box
            textAlign="center"
            minHeight="100vh"
            minWidth="100vw"
            flexGrow="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg='primaryBackground'
        >
            <VStack spacing={4} >
                <Heading
                    as="h1"
                    size="4xl"
                    color="danger"
                    fontWeight="bold"
                >
                    <CgCloseO />
                </Heading>
                <Text fontSize="3xl" mt={3} mb={2}>
                    Access Denied
                </Text>
                <Text color="gray.500">
                    You do not have permission to view this page. Please contact your administrator for assistance.
                </Text>
                <CustomLink colorVariant={'link-outline'} w={'12rem'} to={'..'} mx={{ base: 0, lg: 2 }} fontSize="md">
                    <IoArrowBackCircleOutline size={20} />
                    <Text ml={2}>Return</Text>
                </CustomLink>
            </VStack>
        </Box>
    );
}

export default NotFoundPage;