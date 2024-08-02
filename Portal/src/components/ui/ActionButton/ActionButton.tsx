import { Text } from "@chakra-ui/react";
import { CommonIcons } from "../CommonIcons/CommonIcons";
import CustomLink from "../CustomLink/CustomLink";



const ActionButton = (action: string, onClick: () => void) => {
    return (
      <CustomLink
        to={"#"}
        onClick={onClick}
        colorVariant={
          action === "edit"
            ? "info"
            : action === "delete"
            ? "danger"
            : action == "activate"
            ? "success"
            : "grayed"
        }
        w={"8rem"}
        mx="2"
      >
        {action === "edit" ? (
          <CommonIcons iconName="edit" />
        ) : action === "delete" ? (
          <CommonIcons iconName="delete" />
        ) : action == "activate" ? (
          <CommonIcons iconName="active" />
        ) : (
          <CommonIcons iconName="disable" />
        )}
        <Text>
          {action === "edit"
            ? "Edit"
            : action === "delete"
            ? "Delete"
            : action == "activate"
            ? "Activate"
            : "Deactivate"}
        </Text>
      </CustomLink>
    );
  };

  export default ActionButton