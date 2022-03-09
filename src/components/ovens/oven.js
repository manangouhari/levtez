import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  Skeleton,
} from "@chakra-ui/react";

function Oven({ address, data }) {
  const [allGood, setAllGood] = useState(false);

  const [collateral, setCollateral] = useState(0);
  const [collateralUSD, setCollateralUSD] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [borrowedUSD, setBorrowedUSD] = useState(0);

  const [ratio, setRatio] = useState(0);
  const [utilization, setUtilization] = useState(0);
  const [liqPrice, setLiqPrice] = useState(0);

  useEffect(() => {
    setAllGood(false);
    if (data) {
      let coll = data.collateral.div(1e6);
      let borrow = data.borrowed.div(1e18);
      setCollateral(coll.toNumber());
      setBorrowed(borrow.toNumber());

      let collateralUSD = coll.times(data.usd.tez);
      setCollateralUSD(collateralUSD.toNumber());

      let borrowedUSD = borrow.times(data.usd.kusd);
      setBorrowedUSD(borrowedUSD.toNumber());

      setRatio(
        collateralUSD.div(borrowedUSD).times(100).toNumber()
          ? collateralUSD.div(borrowedUSD).times(100).toNumber()
          : 0
      );
      setUtilization(
        borrowedUSD.div(collateralUSD.div(2)).times(100).toNumber()
          ? borrowedUSD.div(collateralUSD.div(2)).times(100).toNumber()
          : 0
      );
      setLiqPrice(
        borrowedUSD.times(2).div(coll).toNumber()
          ? borrowedUSD.times(2).div(coll).toNumber()
          : 0
      );
      setAllGood(true);
    }
  }, [data]);

  return (
    <Box
      borderRadius={"sm"}
      boxShadow="md"
      border={"1px"}
      borderColor="gray.300"
    >
      <Flex p={4} bgGradient={"linear(to-r, blue.100, blue.300)"}>
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          {address}
        </Text>
      </Flex>

      <SimpleGrid px={4} py={6} columns={3} gap={4}>
        <Stat p={2} boxShadow="xs">
          <StatLabel>Collateral</StatLabel>
          <Skeleton isLoaded={allGood}>
            <StatNumber>{collateral.toFixed(2)} XTZ</StatNumber>
            <StatHelpText>${collateralUSD.toFixed(2)}</StatHelpText>
          </Skeleton>
        </Stat>
        <Stat p={2} boxShadow="xs">
          <StatLabel>Debt</StatLabel>
          <Skeleton isLoaded={allGood}>
            <StatNumber>{borrowed.toFixed(2)} kUSD</StatNumber>
            <StatHelpText>${borrowedUSD.toFixed(2)}</StatHelpText>
          </Skeleton>
        </Stat>
        <Stat p={2} boxShadow="xs">
          <StatLabel>Collateralisation Ratio</StatLabel>
          <Skeleton isLoaded={allGood}>
            <StatNumber>{ratio.toFixed(2)}%</StatNumber>
            <StatHelpText>Safe above: 200%</StatHelpText>
          </Skeleton>
        </Stat>
        <Stat p={2} boxShadow="xs">
          <StatLabel>Collateral Utilization</StatLabel>
          <Skeleton isLoaded={allGood}>
            <StatNumber>{utilization.toFixed(2)}%</StatNumber>
            <StatHelpText>Safe upto 80%</StatHelpText>
          </Skeleton>
        </Stat>
        <Stat p={2} boxShadow="xs">
          <StatLabel>Liquidation Price</StatLabel>
          <Skeleton isLoaded={allGood}>
            <StatNumber>1 XTZ = ${liqPrice.toFixed(2)}</StatNumber>
          </Skeleton>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}

export default Oven;
