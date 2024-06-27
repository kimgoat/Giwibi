import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import BottomNav from "@components/common/ButtomNav";
import CameraModal from "@components/features/CameraModal";
import MicrophoneModal from "@components/features/MicrophoneModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMicrophoneOpen, setIsMicrophoneOpen] = useState(false);

  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <BottomNav
        onCameraClick={() => setIsCameraOpen(true)}
        onMicrophoneClick={() => setIsMicrophoneOpen(true)}
      />
      {isCameraOpen && <CameraModal onClose={() => setIsCameraOpen(false)} />}
      {isMicrophoneOpen && (
        <MicrophoneModal onClose={() => setIsMicrophoneOpen(false)} />
      )}
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
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
