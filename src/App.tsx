import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeStore } from "./stores";
import {
  Navbar,
  ErrorToast,
  AuthContainer,
  LoadingAnimation,
  GreetingComponent,
} from "./components";

const App = () => {
  const currentMode = useThemeStore((state) => state.theme);

  const theme = createTheme({
    palette: {
      mode: currentMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <nav>
        <Navbar />
      </nav>

      <main>
        <AuthContainer />

        <GreetingComponent />
        <LoadingAnimation />
        <ErrorToast />
      </main>
    </ThemeProvider>
  );
};

export default App;
