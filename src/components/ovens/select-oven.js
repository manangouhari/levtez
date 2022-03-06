import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import Oven from "./oven-option";

function SelectOven({ ovens, setSelected, afterSelect }) {
  return (
    <Box
      p={8}
      borderRadius={"sm"}
      boxShadow="sm"
      border={"1px"}
      borderColor="gray.300"
      maxW={"container.md"}
      mx={"auto"}
    >
      <Box fontSize={"2xl"} fontWeight={"bold"} pb={8}>
        <Text>Select Oven</Text>
      </Box>

      {ovens.length ? (
        <SimpleGrid spacing={4}>
          {ovens.map((o) => (
            <button
              key={o}
              onClick={() => {
                setSelected(o);
                afterSelect();
              }}
            >
              <Oven oven={o} />
            </button>
          ))}
        </SimpleGrid>
      ) : (
        "loading"
      )}
    </Box>
  );
}

export default SelectOven;
