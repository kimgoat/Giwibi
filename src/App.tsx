import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyles";
import theme from "./styles/theme";
import Icon from "./components/common/Icon";
import Button from "./components/common/Button";
import VoiceRecorder from "./components/features/VoiceRecorder";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Icon name="home" color="#007AFF" />
        <Button children={"button title"} />
        <VoiceRecorder />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;
