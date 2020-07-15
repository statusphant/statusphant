import React from "react";
import { Flex, Box } from "reflexbox";

import { Text, Input } from "@chakra-ui/core";

import Container from "../components/Container";
import CenterImage from "../components/CenterImage";

// stores
import AuthStore from "../stores/auth";

const New = () => {
  const auth = AuthStore.useContainer();

  return (
    <Container>
      <Flex justifyContent="center">
        <CenterImage textAlign="center" p="36px" flexDirection="column">
          <Box>
            <img src="/assets/light_the_fire.svg" alt="launch app" />
          </Box>
          <Box mt="36px">
            <Text fontSize="4xl">Hey {auth.name}</Text>
          </Box>
          <Box mt="8px">Let's start by creating your app</Box>
          <Flex flexDirection={["column", "row"]}>
            <Box width={1 / 3}></Box>
            <Box mt="16px" width={["100%", 1 / 3]}>
              <Input placeholder="Your app name" />
            </Box>
          </Flex>
        </CenterImage>
      </Flex>
    </Container>
  );
};

export default New;
