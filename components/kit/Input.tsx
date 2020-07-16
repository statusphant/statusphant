import React from "react";
import styled, { css } from "styled-components";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

const StyledInput = styled.input<InputProps>`
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  border: none;
  outline: none;
  padding: 0.67857143em 1em;
  ${({ theme: { colors, radii }, isInvalid }) => css`
    color: ${colors.gray[800]};
    border-radius: ${radii[0]};
    border: 1px solid ${colors.gray[800]};
    ${isInvalid &&
    css`
      border-color: ${colors.red[500]};
    `}
  `}
`;

const Input: React.FC<InputProps> = (props: InputProps) => {
  return <StyledInput {...props} />;
};

Input.defaultProps = {
  isInvalid: false,
};

export default Input;
