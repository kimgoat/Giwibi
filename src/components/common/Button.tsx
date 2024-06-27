import React from "react";
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  padding: ${(props) => props.theme.spacing.small};
  ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: ${(props) => props.theme.fontSizes.medium};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  background-color: ${(props) =>
    props.primary ? props.theme.colors.primary : props.theme.colors.secondary};
  color: white;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.lightGrey};
    cursor: not-allowed;
  }
`;
