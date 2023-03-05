import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeStore } from "./stores";
import {
  ErrorToast,
  LoadingAnimation,
  GreetingComponent,
  Navbar,
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
        <GreetingComponent />
        <LoadingAnimation />
        <ErrorToast />
      </main>
    </ThemeProvider>
  );
};

export default App;
