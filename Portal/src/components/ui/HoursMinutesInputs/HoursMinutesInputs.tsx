import { useEffect, useState } from "react";
import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { CustomFormSelect } from "../../form";
import { SelectOption } from "../../../types/forms";

const TimeSelector = () => {
  const [hour, setHour] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState<SelectOption | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23
  const minutes = Array.from({ length: 60 }, (_, i) => i).filter(num => num % 5 === 0);
  let hoursArray: SelectOption[] = []
  let minutesArray: SelectOption[] = []
  useEffect(() => {
    if (hoursArray.length === 0) {
      hours.map((hour) => hoursArray.push({ label: `${hour}`.padStart(2, "0"), value: `${hour}`.padStart(2, "0") }))
      minutes.map((minutes) => minutesArray.push({ label: `${minutes}`.padStart(2, "0"), value: `${minutes}`.padStart(2, "0") }))
    }
  }, [])

  return (
    <VStack >
      <Stack alignContent={'space-between'} flexDirection={'row'} w={'full'}>
        <CustomFormSelect
          selectValue={hour}
          isError={true ? true : false}
          // errorMsg={errors.day_rw ? errors.day_rw.message : undefined}
          label="Hour"
          placeholder="Select Hour"
          options={hoursArray}
          onChangeFn={(selectedVal) => {
            console.log(selectedVal)
            setHour(selectedVal);
            // if (selectedVal) {
            //   setValue("day_rw", selectedVal.value.toString());
            // }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
        <CustomFormSelect
          selectValue={minute}
          isError={true? true : false}
          // errorMsg={errors.day_rw ? errors.day_rw.message : undefined}
          label="Minute"
          placeholder="Select Minute"
          options={minutesArray}
          onChangeFn={(selectedVal) => {
            console.log(selectedVal)
            setMinute(selectedVal);
            // if (selectedVal) {
            //   setValue("day_rw", selectedVal.value.toString());
            // }
          }}
          maxWVal={{ lg: "full", sm: "90vw" }}
        />
      </Stack>
      <Box width={'full'}>
        <Text fontSize={''} color={'red'} >'this is the error we have here!'</Text>
      </Box>
    </VStack>
  );
};

export default TimeSelector;
