import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import router from "./Routes";
import { RecoilRoot } from "recoil";
import PageTransition from "@components/common/PageTransition";

const AppContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.neutral.white};
`;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}

const client = new QueryClient();
const element = document.getElementById("root");
const root = createRoot(element as Element);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* <PageTransition> */}
        <AppContainer>
          <RouterProvider router={router} />
        </AppContainer>
        {/* </PageTransition> */}
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>
  // </React.StrictMode>
);
