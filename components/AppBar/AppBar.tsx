import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleResponse = async (response) => {
    const { profileObj } = response;
    const user = {
      id: profileObj.googleId,
      email: profileObj.email,
      name: profileObj.name,
      avatar: profileObj.imageUrl,
    };

    const res = await fetch(`${publicRuntimeConfig.URL}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    setLoading(false);

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
      if (!data.user.app) {
        Router.push("/new");
      } else {
        Router.push("/dashboard");
      }
    }
  };

  const handleFailure = async (response) => {
    setLoading(false);
    console.error("Error");
    console.error(response);
  };

  const handleLogout = async () => {
    Cookies.remove("token");
    auth.setToken(null);
    auth.setEmail(null);
    auth.setName(null);
    Router.push("/");
  };

  return (
    <Flex py={["4px", "16px"]} width="100vw" flexDirection={["column", "row"]}>
      <Box width={[1, 1 / 5]}>
        <Link href="/">
          <Title>{META.title}.</Title>
        </Link>
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
                    onClick={() => {
                      setLoading(true);
                      renderProps.onClick();
                    }}
                    isDisabled={renderProps.disabled}
                    variantColor="gray"
                    border="none"
                    isLoading={loading}
                    loadingText="Taking you in"
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
                    onClick={() => {
                      setLoading(true);
                      renderProps.onClick();
                    }}
                    isDisabled={renderProps.disabled}
                    variantColor="green"
                    border="none"
                    isLoading={loading}
                    loadingText="Taking you in"
                  >
                    Get Started
                  </Button>
                )}
              />
            </Box>
          </Flex>
        ) : (
          <Flex justifyContent="flex-end" width={["100vw", "auto"]}>
            <Button
              mx="4px"
              variantColor="green"
              border="none"
              onClick={() => Router.push("/dashboard")}
            >
              Dashboard
            </Button>
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
