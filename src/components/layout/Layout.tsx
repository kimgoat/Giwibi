import React, { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import VoiceRecorder from "@features/VoiceRecorder";
import Header from "@components/common/Header";
import theme from "@styles/theme";
import GlobalStyle from "@styles/globalStyles";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LayoutContainer>
        <Header />
        <Main>{children}</Main>
        <VoiceRecorderContainer>
          <VoiceRecorder />
        </VoiceRecorderContainer>
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.medium};
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
`;

const VoiceRecorderContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
