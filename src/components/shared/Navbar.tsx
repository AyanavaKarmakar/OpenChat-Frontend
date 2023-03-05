import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Brightness4SharpIcon from "@mui/icons-material/Brightness4Sharp";
import BrightnessHighSharpIcon from "@mui/icons-material/BrightnessHighSharp";

export const Navbar = () => {
  const [themeToggle, setThemeToggle] = useState("light");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OPENCHAT
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="theme-toggle"
            onClick={() =>
              setThemeToggle(themeToggle === "dark" ? "light" : "dark")
            }
          >
            {themeToggle === "dark" ? (
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
