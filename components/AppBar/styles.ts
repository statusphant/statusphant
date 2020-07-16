import styled, { css } from "styled-components";

export const Title = styled.h1`
  font-family: "Staatliches", cursive;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 2.2rem;
  font-weight: 500;
  cursor: pointer;
  ${({ theme: { colors } }) => css`
    color: ${colors.primary[800]};
  `}
`;
