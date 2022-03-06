import React, { useContext } from "react";
import useSWR from "swr";

import { Box, Flex, Text, Spinner } from "@chakra-ui/react";

import { TezosContext } from "../../context/TezosContext";

const fetchOvenData = async (tezos, oven) => {
  const UserOven = await tezos.wallet.at(oven);
  const storage = await UserOven.storage();

  const borrowed = storage.borrowedTokens;
  const isLiquidated = storage.isLiquidated;
  const collateral = await tezos.tz.getBalance(oven);

  return {
    borrowed,
    isLiquidated,
    collateral,
  };
};

function Oven({ oven }) {
  const { tezos } = useContext(TezosContext);
  const { data: ovenData } = useSWR(`oven/${oven}`, () =>
    fetchOvenData(tezos, oven)
  );

  const dataLoaded = !!ovenData;

  return (
    <Box
      color="gray.800"
      border={"2px"}
      borderColor="blue.500"
      borderRadius={"md"}
      overflow="hidden"
      boxShadow={"lg"}
    >
      <Box bg="gray.300" px={4} py={3}>
        <Text fontWeight={600} fontSize="lg">
          {oven}
        </Text>
      </Box>
      <Flex
        bg="gray.100"
        px={4}
        py={2}
        height={8}
        fontSize="sm"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {dataLoaded ? (
          <>
            <Text fontSize={""}>
              <Text as="span" fontWeight={600}>
                Collateral:
              </Text>{" "}
              {ovenData.collateral.div(1e6).toFixed(2)} $XTZ
            </Text>
            <Text>
              <Text as="span" fontWeight={600}>
                Debt:
              </Text>{" "}
              {ovenData.borrowed.div(1e18).toFixed(2)} $kUSD
            </Text>
          </>
        ) : (
          <Spinner size="sm" />
        )}
      </Flex>
    </Box>
  );
}

export default Oven;
