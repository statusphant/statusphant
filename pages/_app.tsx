import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@chakra-ui/core";

import META from "../configs/meta";

import { GlobalStyles } from "../components/GlobalStyles";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Head>
        <title>{META.title}</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
