import React, { ReactNode } from "react";
import styled from "styled-components";
import VoiceRecorder from "@features/VoiceRecorder";
import Header from "@components/common/Header";
import BottomNav from "@components/common/ButtomNav";
import Camera from "@components/features/Camera";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <VoiceRecorderContainer>
        {/* <Camera /> */}
        <VoiceRecorder />
      </VoiceRecorderContainer>
      <BottomNav />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const VoiceRecorderContainer = styled.div`
  position: absolute;
  bottom: 60px;
  right: 20px;
`;
