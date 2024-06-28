import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "./Icon";

interface BottomNavProps {
  onCameraClick: () => void;
  onMicrophoneClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({
  onCameraClick,
  onMicrophoneClick,
}) => {
  return (
    <Nav>
      <NavItem to="/">
        <Icon name="home" />
      </NavItem>
      <NavButton onClick={onMicrophoneClick}>
        <Icon name="mike" />
      </NavButton>
      <NavButton onClick={onCameraClick}>
        <Icon name="camera" />
      </NavButton>
      <NavItem to="/all-timers">
        <Icon name="clock" />
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

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 14px;
`;

export default BottomNav;
