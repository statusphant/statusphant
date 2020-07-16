import React from "react";
import styled, { css } from "styled-components";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc?: string;
  alt?: string;
  name: string;
}

const StyledAvatar = styled.div`
  text-align: center;
  font-weight: 600;
  height: 2.5rem;
  img {
    border-radius: 50%;
    height: 2.2rem;
  }
`;

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
  return (
    <StyledAvatar>
      {props.imgSrc ? (
        <img src={props.imgSrc} alt={props.alt} title={props.name} />
      ) : (
        <>{props.name}</>
      )}
    </StyledAvatar>
  );
};

export default Avatar;
