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
      <Box bg="white" p={8} borderRadius="sm" w="md">
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
        <hr />
        <Box py={4}>
          <Text>
            Coll. Ratio:{" "}
            <Text
              fontWeight={"bold"}
              as="span"
              color={
                previewData.collRatio > 300
                  ? "green.600"
                  : previewData.collRatio > 200
                  ? "yellow.600"
                  : "red.600"
              }
            >
              {previewData.collRatio.toFixed(2)}%
            </Text>
          </Text>
          <Text>
            Coll. Utilization:{" "}
            <Text
              fontWeight={"bold"}
              as="span"
              color={
                previewData.collUtilization <= 50
                  ? "green.600"
                  : previewData.collUtilization <= 70
                  ? "yellow.600"
                  : "red.600"
              }
            >
              {previewData.collUtilization.toFixed(2)}%
            </Text>
          </Text>
        </Box>
        <Button
          mt={4}
          w="full"
          colorScheme={previewData.collRatio >= 200 ? "blue" : "red"}
          disabled={previewData.collRatio < 200}
          onClick={execute}
          isLoading={isExecuting}
          loadingText={"Preparing Leverage"}
        >
          Execute 🚀
        </Button>
        {previewData.collRatio < 200 && (
          <Text color="red.600" fontSize={"sm"} mt={1} fontWeight={"bold"}>
            Collateralisation Ratio needs to be above 200%.
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default Preview;
