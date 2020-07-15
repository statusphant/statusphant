import styled, { css } from "styled-components";
import { Flex } from "reflexbox";

const Container = styled(Flex)`
  margin: 0 auto !important;
  padding: 0px 16px 0px 16px;
  ${(props) => css`
    @media screen and (min-width: ${props.theme.breakpoints[0]}) {
      max-width: ${props.theme.containerWidth};
      padding: 0 10px 0 10px;
    }
  `}
  }
`;

export default Container;
