import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gray";
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  outline: none;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  font-size: 100%;
  height: 2.5rem;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
  white-space: nowrap;
  transition: all 0.3s ease-out;
  > svg {
    vertical-align: text-top;
    font-size: 1.1rem;
  }
  ${({ theme: { colors, radii }, variant, disabled }) => css`
    background: ${colors[variant][600]};
    border-radius: ${radii[0]};
    color: #fff;
    svg {
      height: inherit;
    }
    path {
      fill: #fff;
    }
    &:hover {
      background: ${colors[variant][700]};
    }
    ${variant === "gray" &&
    css`
      background: ${colors.gray[50]};
      color: ${colors.gray[800]};
      path {
        fill: ${colors.gray[800]};
      }
      &:hover {
        background: ${colors.gray[100]};
      }
    `}
    ${disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.3;
    `}
  `}
`;

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <>
      {props.isLoading ? (
        <StyledButton {...props}>
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
          >
            <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </StyledButton>
      ) : (
        <StyledButton {...props} />
      )}
    </>
  );
};

Button.defaultProps = {
  variant: "primary",
  isLoading: false,
};

export default Button;
