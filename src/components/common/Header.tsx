import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Icon name="logo" size={65} color="none" />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  z-index: 99;
  background-color: ${(props) => props.theme.colors.neutral.white};
  display: flex;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  height: 3rem;
  position: sticky;
  top: 0;
  svg {
    margin-left: 20px;
  }
`;
