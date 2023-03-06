import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Brightness4SharpIcon from "@mui/icons-material/Brightness4Sharp";
import BrightnessHighSharpIcon from "@mui/icons-material/BrightnessHighSharp";
import { useThemeStore, useUserStore } from "../../stores";

export const Navbar = () => {
  const themeController = useThemeStore();
  const user = useUserStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OPENCHAT
          </Typography>

          {user.username !== "" && (
            <Typography variant="h6" component="div">
              {`[ ${user.username} ]`}
            </Typography>
          )}

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="theme-toggle"
            onClick={() => themeController.setTheme()}
          >
            {themeController.theme === "dark" ? (
              <BrightnessHighSharpIcon />
            ) : (
              <Brightness4SharpIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
