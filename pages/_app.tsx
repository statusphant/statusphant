import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as ChakraThemeProvider } from "@chakra-ui/core";

import META from "../configs/meta";
import theme from "../configs/theme";

import { GlobalStyles } from "../components/GlobalStyles";
import Container from "../components/Container";
import AppBar from "../components/AppBar";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ChakraThemeProvider>
        <Head>
          <title>{META.title}</title>
        </Head>
        <GlobalStyles />
        <Container>
          <AppBar />
        </Container>
        <Component {...pageProps} />
      </ChakraThemeProvider>
    </ThemeProvider>
  );
};

export default App;
