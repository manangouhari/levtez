import React from "react";
import {
  Box,
  SimpleGrid,
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Button,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

function MainForm({
  setCollateralToAdd,
  setKUSDToBorrow,
  setShowPreview,
  loadingPreview,
  allowPreview,
}) {
  console.log("Loading Preview", loadingPreview);
  return (
    <Box
      mt={5}
      py={6}
      px={4}
      boxShadow="md"
      borderRadius="sm"
      border={"1px"}
      borderColor="gray.300"
    >
      <Box mb={8}>
        <Text fontSize={"xl"} fontWeight="bold" mb={1}>
          Leverage $XTZ
        </Text>
        <Text>In one click -</Text>
        <UnorderedList>
          <ListItem>Add $XTZ collateral</ListItem>
          <ListItem>Borrow $kUSD</ListItem>
          <ListItem>Convert borrowed $kUSD to $XTZ</ListItem>
          <ListItem>Add converted $XTZ as collateral</ListItem>
        </UnorderedList>
      </Box>
      <SimpleGrid columns={2} gap={6}>
        <InputGroup>
          <InputLeftAddon children="Collateral" />
          <Input
            placeholder="$XTZ to add as collateral"
            borderRadius={"sm"}
            onChange={(e) => setCollateralToAdd(e.target.value)}
            type="number"
          />
          <InputRightAddon children="$XTZ" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Borrow" />
          <Input
            placeholder="$kUSD to mint"
            borderRadius={"sm"}
            onChange={(e) => setKUSDToBorrow(e.target.value)}
            type="number"
          />
          <InputRightAddon children="$kUSD" />
        </InputGroup>
      </SimpleGrid>

      <Button
        mt={4}
        w="100%"
        colorScheme={"blue"}
        disabled={!allowPreview}
        onClick={() => {
          setShowPreview(true);
        }}
        isLoading={loadingPreview}
        loadingText={"Preparing Preview"}
      >
        Preview Leverage
      </Button>
    </Box>
  );
}

export default MainForm;
