import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalStyles";
import theme from "../styles/theme";
import Icon from "../components/common/Icon";
import Button from "../components/common/Button";
import VoiceRecorder from "../components/features/VoiceRecorder";

function MainCategoryPage() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Icon name="home" color="#007AFF" />
      <Button children={"button title"} />
      <VoiceRecorder />
    </ThemeProvider>
  );
}

export default MainCategoryPage;
