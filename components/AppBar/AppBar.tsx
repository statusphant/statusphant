import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import getConfig from "next/config";
import fetch from "cross-fetch";
import { Flex, Box } from "reflexbox";
import * as Cookies from "js-cookie";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";

import { Avatar, Button } from "../kit";

import META from "../../configs/meta";

// stores
import AuthStore from "../../stores/auth";

import { Title } from "./styles";

const { publicRuntimeConfig } = getConfig();

const AppBar: React.FC = () => {
  const auth = AuthStore.useContainer();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
      toast.error(data.error.message);
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
    auth.setAvatar(null);
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
            <Box mx="4px" width={1 / 3}>
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
                    disabled={renderProps.disabled}
                    variant="gray"
                    isLoading={loading}
                  >
                    Sign in
                  </Button>
                )}
              />
            </Box>
            <Box mx="4px" width={1 / 3}>
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
                    disabled={renderProps.disabled}
                    variant="primary"
                    isLoading={loading}
                  >
                    Get Started
                  </Button>
                )}
              />
            </Box>
          </Flex>
        ) : (
          <Flex justifyContent="flex-end" width={["100vw", "auto"]}>
            {!router.pathname.includes("/dashboard") && (
              <Box mx="4px">
                <Button
                  variant="primary"
                  onClick={() => Router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              </Box>
            )}
            <Box mx="4px">
              <Avatar name={auth.name} imgSrc={auth.avatar} alt={auth.name} />
            </Box>
            <Box mx="4px">
              <Button variant="gray" onClick={handleLogout}>
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
