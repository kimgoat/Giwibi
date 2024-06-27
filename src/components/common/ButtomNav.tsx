import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BottomNav: React.FC = () => {
  return (
    <Nav>
      <NavItem to="/">홈</NavItem>
      <NavItem to="/all-timers">타이머</NavItem>
      {/* <NavItem to="/profile">프로필</NavItem> */}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 14px;
`;

export default BottomNav;
