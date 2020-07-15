import styled, { css } from "styled-components";
import { Flex } from "reflexbox";

const CenterImage = styled(Flex)`
  img {
    width: 80%;
    height: 80%;
  }
  ${(props) => css`
    @media screen and (min-width: ${props.theme.breakpoints[0]}) {
      img {
        height: 120%;
        width: 60%;
      }
    }
  `}
  }
`;

export default CenterImage;
