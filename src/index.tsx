import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import router from "./Routes";
import { RecoilRoot } from "recoil";

const AppContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.neutral.white};
`;

const client = new QueryClient();
const element = document.getElementById("root");
const root = createRoot(element as Element);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <RouterProvider router={router} />
        </AppContainer>
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>
  // </React.StrictMode>
);
