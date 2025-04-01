import {
  Box,
  FormControl,
  FormLabel,
  Text,
  type SelectProps,
} from "@chakra-ui/react";
import { ChakraStylesConfig, GroupBase, Select } from "chakra-react-select";

import { SelectOption } from "../../../types/forms";

interface FormSelectProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  selectValue: SelectOption | null;
  onChangeFn: (value: SelectOption | null) => void;
  isError?: boolean;
  errorMsg?: string;
  selectProps?: SelectProps;
  maxWVal?:
    | {
        lg: string;
        sm: string;
      }
    | string;
}

const CustomFormSelect = ({
  label,
  placeholder,
  options,
  errorMsg,
  selectProps,
  selectValue,
  onChangeFn,
  isError = false,
  maxWVal = { lg: "20rem", sm: "90rem" },
  ...props
}: FormSelectProps) => {
  const chakraStyles: ChakraStylesConfig = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (provided: any) => ({
      ...provided,
      borderColor: "gray",
    }),
  };
  return (
    <FormControl isInvalid={isError} maxW={maxWVal} {...props}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Box bgColor="white">
        <Select<SelectOption, true, GroupBase<SelectOption>>
          sx={{ borderColor: "red" }}
          {...selectProps}
          focusBorderColor="#90CDF4"
          options={options}
          placeholder={placeholder}
          value={selectValue}
          onChange={() => onChangeFn}
          chakraStyles={chakraStyles}
        />
      </Box>
      {isError && <Text color={"red.400"}>{errorMsg || ""}</Text>}
    </FormControl>
  );
};

export default CustomFormSelect;
