import React from "react";
import styled, { css } from "styled-components";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "0.6" | "0.8" | "1.0" | "1.2" | "1.4" | "1.6" | "1.8" | "2.0" | "2.2";
}

const StyledText = styled.div<TextProps>`
  font-size: 1rem;
  ${({ size }) => css`
    font-size: ${size}rem;
  `}
`;

const Text: React.FC<TextProps> = (props: TextProps) => {
  return <StyledText {...props} />;
};

Text.defaultProps = {
  size: "1.0",
};

export default Text;
