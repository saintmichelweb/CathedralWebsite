import { CustomLink } from '../../components/ui';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

function NotFoundPage() {
    return (
        <Box
            textAlign="center"
            minHeight="100vh"
            display="flex"
            minWidth="100vw"
            flexGrow="1"
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
                    <FiAlertTriangle />
                </Heading>
                <Text fontSize="3xl" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color="gray.500">
                    The page you're looking for doesn't exist or has been moved.
                </Text>
                <CustomLink colorVariant={'link-outline'} w={'12rem'} to={'/'} mx={{ base: 0, lg: 2 }} fontSize="md">
                    <IoArrowBackCircleOutline size={20} />
                    <Text ml={2}>Return</Text>
                </CustomLink>
            </VStack>
        </Box>
    );
}

export default NotFoundPage;