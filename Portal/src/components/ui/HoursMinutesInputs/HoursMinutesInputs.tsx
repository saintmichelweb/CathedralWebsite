import React, { useState } from "react";
import { Box, Select, VStack } from "@chakra-ui/react";

const TimeSelector = () => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 to 59

  return (
    <VStack spacing={4} align="start">
      <Box>
        <Select placeholder="Select Hour" value={hour} onChange={(e) => setHour(e.target.value)}>
          {hours.map((h) => (
            <option key={h} value={h}>
              {String(h).padStart(2, "0")}
            </option>
          ))}
        </Select>
      </Box>

      <Box>
        <Select placeholder="Select Minute" value={minute} onChange={(e) => setMinute(e.target.value)}>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {String(m).padStart(2, "0")}
            </option>
          ))}
        </Select>
      </Box>
    </VStack>
  );
};

export default TimeSelector;
