import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  html {
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 14px;
  }
`;
