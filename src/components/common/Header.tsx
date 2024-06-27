import React from "react";
import styled from "styled-components";

const Header: React.FC = () => {
  return <HeaderContainer></HeaderContainer>;
};

export default Header;

const HeaderContainer = styled.header`
  height: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.dark};
`;
