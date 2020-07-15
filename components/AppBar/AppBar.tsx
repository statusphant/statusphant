import React from "react";
import getConfig from "next/config";
import fetch from "cross-fetch";
import { Button, Avatar, useToast } from "@chakra-ui/core";
import { Flex, Box } from "reflexbox";
import * as Cookies from "js-cookie";
import { GoogleLogin } from "react-google-login";

import META from "../../configs/meta";

// stores
import AuthStore from "../../stores/auth";

import { Title } from "./styles";

const { publicRuntimeConfig } = getConfig();

const AppBar: React.FC = () => {
  const auth = AuthStore.useContainer();
  const toast = useToast();

  const handleResponse = async (response) => {
    const { profileObj } = response;
    const user = {
      id: profileObj.googleId,
      email: profileObj.email,
      name: profileObj.name,
      avatar: profileObj.imageUrl,
    };

    console.log(response);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    console.log(data);

    if (data.error) {
      toast({
        title: data.error.message,
        status: "error",
        duration: 3000,
      });
    } else if (data.user.id) {
      Cookies.set("token", data.token);
      auth.setToken(data.token);
      auth.setName(data.user.name);
      auth.setEmail(data.user.email);
      auth.setAvatar(data.user.avatar);
    }
  };

  const handleFailure = async (response) => {
    console.error("Error");
    console.error(response);
  };

  const handleLogout = async () => {
    Cookies.remove("token");
    auth.setToken(null);
    auth.setEmail(null);
    auth.setName(null);
  };

  return (
    <Flex py={["4px", "16px"]} width="100vw" flexDirection={["column", "row"]}>
      <Box width={[1, 1 / 5]}>
        <Title>{META.title}.</Title>
      </Box>
      <Box width={[1, 2 / 5]}></Box>
      <Box width={[1, 2 / 5]}>
        {!auth.token ? (
          <Flex justifyContent="flex-end" width={["100vw", "auto"]}>
            <Box mx="4px">
              <GoogleLogin
                clientId={publicRuntimeConfig.GOOGLE_CLIENT_ID}
                onSuccess={handleResponse}
                onFailure={handleFailure}
                buttonText="Login"
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    isDisabled={renderProps.disabled}
                    variantColor="gray"
                    border="none"
                  >
                    Sign in
                  </Button>
                )}
              />
            </Box>
            <Box mx="4px">
              <GoogleLogin
                clientId={publicRuntimeConfig.GOOGLE_CLIENT_ID}
                onSuccess={handleResponse}
                onFailure={handleFailure}
                buttonText="Login"
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    isDisabled={renderProps.disabled}
                    variantColor="green"
                    border="none"
                  >
                    Get Started
                  </Button>
                )}
              />
            </Box>
          </Flex>
        ) : (
          <Flex justifyContent="flex-end" width={["100vw", "auto"]}>
            <Box mx="4px">
              <Avatar name={auth.name} src={auth.avatar} size="sm" />
            </Box>
            <Box mx="4px">
              <Button variantColor="gray" border="none" onClick={handleLogout}>
                Log out
              </Button>
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default AppBar;
