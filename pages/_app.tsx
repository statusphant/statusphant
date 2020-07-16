import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { ThemeProvider } from "styled-components";
import cookies from "next-cookies";
import fetch from "cross-fetch";
import Progress from 'nprogress';
import Router from 'next/router';

import META from "../configs/meta";
import theme from "../configs/theme";

import { GlobalStyles } from "../components/GlobalStyles";
import Container from "../components/Container";
import AppBar from "../components/AppBar";

Router.events.on('routeChangeStart', () => Progress.start());
Router.events.on('routeChangeComplete', () => Progress.done());
Router.events.on('routeChangeError', () => Progress.done());

// stores
import AuthStore from "../stores/auth";

const App = (props) => {
  const { Component, pageProps, token, name, email, avatar, app } = props;
  return (
    <ThemeProvider theme={theme}>
      <AuthStore.Provider initialState={{ token, name, email, avatar, app }}>
        <Head>
          <title>{META.title}</title>
        </Head>
        <GlobalStyles />
        <Container>
          <AppBar />
        </Container>
        <Component {...pageProps} />
      </AuthStore.Provider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const { token } = cookies(ctx);
  const { res, req } = ctx;

  const authPages = ["/new", "/dashboard"];

  const { publicRuntimeConfig } = getConfig();

  if (token) {
    const response = await fetch(`${publicRuntimeConfig.URL}/api/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (
      (!data.user.app && req && req.url.includes("/new")) ||
      (req && req.url.includes("/dashboard" && !data.user.app))
    ) {
      if (res) {
        res.writeHead(301, {
          Location: "new",
        });
        res.end();
      }
    } else if (req && req.url.includes("/new") && data.user.app) {
      if (res) {
        res.writeHead(301, {
          Location: "dashboard",
        });
        res.end();
      }
    }

    if (data.user) {
      return {
        token: token,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
        app: data.user.app,
      };
    } else {
      return {
        token: null,
        name: null,
        email: null,
        avatar: null,
        app: null,
      };
    }
  } else {
    if (req && authPages.includes(req.url)) {
      if (res) {
        res.writeHead(301, {
          Location: "/",
        });
        res.end();
      }
    }
    return {
      token: null,
      name: null,
      email: null,
      avatar: null,
      app: null,
    };
  }
};

export default App;
