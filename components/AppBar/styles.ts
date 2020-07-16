import styled, { css } from "styled-components";

export const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 2.2rem;
  font-weight: 700;
  cursor: pointer;
  ${({ theme: { colors } }) => css`
    color: ${colors.primary[800]};
  `}
`;
