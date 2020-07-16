import React, { useState, useEffect } from "react";
import { Flex, Box } from "reflexbox";
import Router from "next/router";
import getConfig from "next/config";
import fetch from "cross-fetch";
import { Text, Input, Button, useToast } from "@chakra-ui/core";

import Container from "../components/Container";
import CenterImage from "../components/CenterImage";

// stores
import AuthStore from "../stores/auth";

const { publicRuntimeConfig } = getConfig();

const New = () => {
  const auth = AuthStore.useContainer();
  const [query, setQuery] = useState<string | null>(null);
  const [exist, setExist] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    setExist(false);
    async function check() {
      const response = await fetch(
        `${publicRuntimeConfig.URL}/api/apps/${query}`
      );
      const data = await response.json();
      setExist(data.exist);
    }

    if (query && query.length > 2) {
      check();
    }
  }, [query]);

  const handleSubmit = async () => {
    const response = await fetch(`${publicRuntimeConfig.URL}/api/apps`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        email: auth.email,
        app: query,
      }),
    });

    const data = await response.json();

    if (data.error) {
      toast({
        title: data.error,
        status: "error",
        duration: 3000,
      });
    } else {
      Router.push("/dashboard");
    }
  };

  const isButtonDisabled = !(query && query.length > 2) || exist;

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
              <Input
                isInvalid={exist}
                placeholder="Your app name"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Box>
          </Flex>
          <Box mt="8px">
            <Button
              variantColor="green"
              border="none"
              isDisabled={isButtonDisabled}
              onClick={handleSubmit}
            >
              Create App
            </Button>
          </Box>
        </CenterImage>
      </Flex>
    </Container>
  );
};

export default New;
