import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthForm, ErrorToast, LoadingAnimation, Navbar } from "./components";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useThemeStore } from "./stores";
import App from "./App";

import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthForm />,
  },
]);

const Root = () => {
  const currentMode = useThemeStore((state) => state.theme);

  const theme = createTheme({
    palette: {
      mode: currentMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <ErrorToast />
        <LoadingAnimation />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
