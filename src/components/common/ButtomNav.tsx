import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const BottomNav: React.FC = () => {
  return (
    <Nav>
      <NavItem to="/">
        <Icon name="home" />
      </NavItem>

      <NavItem to="/all-timers">
        <Icon name="mike" />
      </NavItem>
      <NavItem to="/">
        <Icon name="camera" />
      </NavItem>
      <NavItem to="/all-timers">
        <Icon name="profile" />
      </NavItem>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 13px 0;
  position: sticky;
  bottom: 0;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 14px;
`;

export default BottomNav;
