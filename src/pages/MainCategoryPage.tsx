import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import Icon from "@components/common/Icon";
import VoiceRecorder from "@components/features/VoiceRecorder";
import Button from "@components/common/Button";

function MainCategoryPage() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Icon name="home" color="#b9dbff" />
      {/* <Button children={"button title"} /> */}
      <Button children={"title"} />
      <VoiceRecorder />
    </ThemeProvider>
  );
}

export default MainCategoryPage;
