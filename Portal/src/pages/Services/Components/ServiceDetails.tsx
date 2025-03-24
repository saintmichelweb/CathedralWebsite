import type { FC, ReactNode } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Stack, 
  Image, 
  SimpleGrid, 
  Badge, 
  Divider,
  IconButton,
  useClipboard,
  useToast,
  Tooltip,
  Collapse,
  Button,
  HStack,
  useDisclosure,
  Icon,
  BoxProps
} from "@chakra-ui/react";
import { ServicesResponse } from "../../../types/apiResponses";
import { MdContentCopy, MdPhone, MdExpandMore, MdExpandLess, MdAccessTime, MdDateRange } from "react-icons/md";

interface ServiceDetailsProps extends Omit<BoxProps, 'children'> {
  service: ServicesResponse;
  onEdit?: () => void;
  isPreview?: boolean;
}

interface InfoRowProps {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}

const InfoRow: FC<InfoRowProps> = ({ label, children, icon }: InfoRowProps) => (
  <Box>
    <HStack spacing={2} mb={1}>
      <Text fontWeight="semibold">{label}</Text>
      {icon}
    </HStack>
    {children}
  </Box>
);

const ServiceDetails: FC<ServiceDetailsProps> = ({ 
  service, 
  onEdit, 
  isPreview = false,
  ...boxProps 
}: ServiceDetailsProps) => {
  const { isOpen: showFullDescription, onToggle: toggleDescription } = useDisclosure();
  const { onCopy } = useClipboard(service.contact_person_phone_number);
  const toast = useToast();

  const handleCopyPhone = () => {
    onCopy();
    toast({
      title: "Phone number copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right"
    });
  };

  const handleCallPhone = () => {
    window.location.href = `tel:${service.contact_person_phone_number}`;
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      p={6}
      width="full"
      transition="all 0.2s"
      _hover={{ boxShadow: "md" }}
      position="relative"
      opacity={isPreview ? 0.7 : 1}
      {...boxProps}
    >
      {onEdit && !isPreview && (
        <Button
          position="absolute"
          top={4}
          right={4}
          size="sm"
          colorScheme="blue"
          onClick={onEdit}
          zIndex={1}
        >
          Edit Service
        </Button>
      )}

      {service.backgroundImage?.imageUrl && (
        <Box 
          mb={4} 
          position="relative" 
          height="200px" 
          overflow="hidden" 
          borderRadius="md"
          role="img"
          aria-label={`Background image for ${service.name_en}`}
        >
          <Image
            src={service.backgroundImage.imageUrl}
            alt={service.name_en}
            objectFit="cover"
            width="100%"
            height="100%"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            loading="lazy"
          />
        </Box>
      )}

      <Stack spacing={4}>
        <Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
            {[
              { lang: "English", name: service.name_en, desc: service.description_en },
              { lang: "French", name: service.name_fr, desc: service.description_fr },
              { lang: "Kinyarwanda", name: service.name_rw, desc: service.description_rw }
            ].map((item) => (
              <Box key={item.lang}>
                <Heading size="sm" color="gray.600" mb={1}>{item.lang}</Heading>
                <Text fontWeight="bold">{item.name}</Text>
                <Collapse startingHeight={60} in={showFullDescription}>
                  <Text mt={2}>{item.desc}</Text>
                </Collapse>
              </Box>
            ))}
          </SimpleGrid>
          <Button
            size="sm"
            onClick={toggleDescription}
            variant="ghost"
            rightIcon={showFullDescription ? <MdExpandLess /> : <MdExpandMore />}
            aria-label={showFullDescription ? "Show less" : "Read more"}
            mt={2}
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </Button>
        </Box>

        <Divider />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box>
            <Heading size="sm" color="gray.600" mb={2}>Schedule</Heading>
            <Stack spacing={2}>
              <InfoRow 
                label="Work Days" 
                icon={<Icon as={MdDateRange} color="blue.500" />}
              >
                <Badge colorScheme="blue">{service.work_days}</Badge>
              </InfoRow>
              <InfoRow 
                label="Work Hours"
                icon={<Icon as={MdAccessTime} color="green.500" />}
              >
                <Badge colorScheme="green">{service.work_hours}</Badge>
              </InfoRow>
            </Stack>
          </Box>

          <Box>
            <Heading size="sm" color="gray.600" mb={2}>Contact Information</Heading>
            <Stack spacing={2}>
              <InfoRow label="Contact Person">
                <Text>{service.contact_person_name}</Text>
              </InfoRow>
              <InfoRow label="Phone Number">
                <HStack>
                  <Text>{service.contact_person_phone_number}</Text>
                  <Tooltip label="Copy phone number" hasArrow>
                    <IconButton
                      aria-label="Copy phone number"
                      icon={<MdContentCopy />}
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyPhone}
                    />
                  </Tooltip>
                  <Tooltip label="Call phone number" hasArrow>
                    <IconButton
                      aria-label="Call phone number"
                      icon={<MdPhone />}
                      size="sm"
                      colorScheme="green"
                      variant="ghost"
                      onClick={handleCallPhone}
                    />
                  </Tooltip>
                </HStack>
              </InfoRow>
            </Stack>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default ServiceDetails;
