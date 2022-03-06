import React from "react";
import { Flex, Button, Text, Spinner } from "@chakra-ui/react";

function Header({ connectWallet, disconnectWallet, address, tezBalance }) {
  return (
    <Flex justifyContent={"space-between"} alignItems="center" px={8} py={4}>
      <Text color="blue.600" fontSize="xl" fontWeight={800}>
        LevTez
      </Text>
      <Flex>
        <Button
          onClick={!address ? connectWallet : disconnectWallet}
          colorScheme="blue"
          borderRadius={"md"}
          borderRightRadius={address ? 0 : "md"}
          // size="sm"
        >
          {!address ? "sync" : `${address.slice(0, 8)}...`}
        </Button>
        {address && (
          <Flex
            borderRadius="md"
            borderLeftRadius={0}
            justifyContent="center"
            alignItems="center"
            px={4}
            bg="blue.400"
          >
            {tezBalance ? (
              <Text color="white" fontWeight={"bold"}>
                {tezBalance.div(1e6).toNumber().toFixed(2)} XTZ
              </Text>
            ) : (
              <Spinner size="sm" color="blue.700" />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
