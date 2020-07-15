import React from "react";

import { Button } from "@chakra-ui/core";
import { Flex, Box } from "reflexbox";

import META from "../../configs/meta";

import { Title } from "./styles";

const AppBar: React.FC = () => {
  return (
    <Flex py={["4px", "16px"]} width="100vw" flexDirection={["column", "row"]}>
      <Box width={[1, 1 / 5]}>
        <Title>{META.title}.</Title>
      </Box>
      <Box width={[1, 2 / 5]}></Box>
      <Box width={[1, 2 / 5]}>
        <Flex justifyContent="flex-end" width={["100vw", "auto"]}>
          <Box mx="4px">
            <Button variantColor="gray" border="none">
              Sign in
            </Button>
          </Box>
          <Box mx="4px">
            <Button variantColor="green" border="none">
              Get Started
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AppBar;
