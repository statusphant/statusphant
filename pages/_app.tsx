import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as ChakraThemeProvider } from "@chakra-ui/core";
import cookies from "next-cookies";
import fetch from "cross-fetch";

import META from "../configs/meta";
import theme from "../configs/theme";

import { GlobalStyles } from "../components/GlobalStyles";
import Container from "../components/Container";
import AppBar from "../components/AppBar";

// stores
import AuthStore from "../stores/auth";

const App = (props) => {
  const { Component, pageProps, token, name, email, avatar } = props;
  return (
    <ThemeProvider theme={theme}>
      <ChakraThemeProvider>
        <AuthStore.Provider initialState={{ token, name, email, avatar }}>
          <Head>
            <title>{META.title}</title>
          </Head>
          <GlobalStyles />
          <Container>
            <AppBar />
          </Container>
          <Component {...pageProps} />
        </AuthStore.Provider>
      </ChakraThemeProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const { token } = cookies(ctx);

  if (token) {
    const res = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.user) {
      return {
        token: token,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
      };
    } else {
      return {
        token: null,
        name: null,
        email: null,
        avatar: null,
      };
    }
  } else {
    return {
      token: null,
      name: null,
      email: null,
      avatar: null,
    };
  }
};

export default App;
