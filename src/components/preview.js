import React from "react";
import { Flex, Box, Text, Button, CloseButton } from "@chakra-ui/react";

function Preview({ previewData, execute, isExecuting, close }) {
  return (
    <Flex
      position={"absolute"}
      bg="blackAlpha.700"
      h="100%"
      w="100%"
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={"100"}
    >
      <Box bg="white" p={8} borderRadius="sm" minW="md">
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize="xl" fontWeight={"bold"}>
            Preview
          </Text>
          <CloseButton onClick={close} />
        </Flex>
        <Box py={4}>
          <Text>
            XTZ Added to Collateral:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.collateralToAdd.div(1e6).toNumber().toFixed(2)} XTZ
            </Text>
          </Text>
          <Text>
            Platform Fee:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.fee.div(1e6).toNumber().toFixed(2)} XTZ
            </Text>
          </Text>
          <Text>
            kUSD borrowed:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.kusdToBorrow.div(1e18).toNumber().toFixed(2)} kUSD
            </Text>
          </Text>
          <Text>
            XTZ received from selling kUSD:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.swappedXTZ.div(1e6).toNumber().toFixed(2)} XTZ
            </Text>
          </Text>
          <Text>
            Total XTZ added to collateral:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.totalCollateralToAdd.div(1e6).toNumber().toFixed(2)}{" "}
              XTZ
            </Text>
          </Text>
          <Text>
            XTZ Leverage:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.leverage.toNumber().toFixed(2)}x
            </Text>
          </Text>
        </Box>
        <hr />
        <Box py={4}>
          <Text>
            Total Collateral:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.totalCollateral.div(1e6).toNumber().toFixed(2)} XTZ
            </Text>
          </Text>
          <Text>
            Total kUSD borrowed:{" "}
            <Text fontWeight={"bold"} as="span">
              {previewData.totalBorrowed.div(1e18).toNumber().toFixed(2)} kUSD
            </Text>
          </Text>
        </Box>
        <Button
          mt={4}
          w="full"
          colorScheme={"blue"}
          onClick={execute}
          isLoading={isExecuting}
          loadingText={"Preparing Leverage"}
        >
          Execute 🚀
        </Button>
      </Box>
    </Flex>
  );
}

export default Preview;
