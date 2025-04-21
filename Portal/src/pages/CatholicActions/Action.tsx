import { useState } from "react";
import {
  Box,
  Stack,
  SimpleGrid,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  actionSchema,
  type AddActionForm,
} from "../../lib/validations/CatholicAction";
import { CustomButton } from "../../components/ui";
import { MessageResponse, ActionsResponse } from "../../types/apiResponses";

// Define Action type
interface Action {
  name: string;
  logo: string;
  description: string;
  leader: {
    name: string;
    phone: string;
  };
}

// Sample default Catholic actions
const catholicActions: Action[] = [
  {
    name: "Charismatique",
    logo: "charismatique_logo.png",
    leader: { name: "Jean Paul Mugisha", phone: "+250788567890" },
    description:
      "A spiritual movement focusing on prayer, healing, and charismatic worship.",
  },
  {
    name: "Neocatechumenal",
    logo: "neocatechumenal_logo.png",
    leader: { name: "Francois Nkurunziza", phone: "+250788123456" },
    description:
      "A Catholic formation group that deepens faith through catechesis and community life.",
  },
  {
    name: "Légion de Marie",
    logo: "legion_marie_logo.png",
    leader: { name: "Marie Claire Uwase", phone: "+250789654321" },
    description:
      "A Marian movement dedicated to prayer, evangelization, and serving the Church.",
  },
  {
    name: "Scouts Catholiques",
    logo: "scouts_catholiques_logo.png",
    leader: { name: "Eric Habimana", phone: "+250788987654" },
    description:
      "A Catholic scouting group promoting faith, leadership, and community service.",
  },
  {
    name: "Mouvement Eucharistique des Jeunes (MEJ)",
    logo: "mej_logo.png",
    leader: { name: "Christine Niyonsaba", phone: "+250788345678" },
    description:
      "A youth movement focused on the Eucharist, prayer, and missionary work.",
  },
];

interface AddActionProps {
  onClose: () => void;
  fetchActions: () => void;
  action: ActionsResponse | null;
}

const AddActionsCard = (props: AddActionProps) => {
  const {
    handleSubmit,
    reset,
  } = useForm<AddActionForm>({
    resolver: zodResolver(actionSchema),
  });

  const toast = useToast();
  const [actions, setActions] = useState<Action[]>(catholicActions);

  const onSubmit = async (values: AddActionForm) => {
    await addNewAction(values)
      .then((res: MessageResponse) => {
        toast({
          title: "Add Action message!",
          description: res?.message || "Action saved successfully",
          status: "success",
        });

        // Add a default logo and dummy leader for new entries
        const newAction: Action = {
          ...values,
          logo: "", // Optionally, handle image upload separately
          leader: { name: "New Leader", phone: "+250000000000" },
          description: ""
        };

        setActions([...actions, newAction]);
        props.fetchActions();
        props.onClose();
      })
      .catch((error: { response: { data: { message: any } } }) => {
        toast({
          title: "Add Action message",
          description: error.response?.data?.message || "Error saving action!",
          status: "error",
        });
      });

    reset();
  };

  return (
    <Box>
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {actions.map((action, index) => (
            <Box
              key={index}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
            >
              <Image
                src={`/images/${action.logo}`}
                alt={action.name}
                boxSize="50px"
                mx="auto"
                mb={2}
              />
              <Text fontWeight="bold">{action.name}</Text>
              <Text fontSize="sm">{action.description}</Text>
              <Text fontSize="xs" color="gray.500">
                Leader: {action.leader.name} ({action.leader.phone})
              </Text>
            </Box>
          ))}
        </SimpleGrid>


        <CustomButton type="submit">Add Action</CustomButton>
      </Stack>
    </Box>
  );
};

export default AddActionsCard;
function addNewAction(_values: { description_en: string; name: string; description_rw: string; leaderName: string; phone: string; }) {
  throw new Error("Function not implemented.");
}

