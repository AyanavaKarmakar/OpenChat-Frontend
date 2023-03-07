import { Fab, Typography, Stack, Paper } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

export const ChatContainer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showBackToTop && (
        <Fab
          color="primary"
          size="medium"
          aria-label="back-to-top"
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
          onClick={handleBackToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: "375px",
          margin: "0 auto",
          mt: 8,
          mb: 3,
        }}
      >
        <Paper elevation={5} sx={{ p: 3, borderRadius: "10px" }}>
          <Typography variant="h6" sx={{ lineHeight: "25px" }}>
            This is a chat message which maybe or may not be long af
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Username - 12:00
          </Typography>
        </Paper>
      </Stack>
    </>
  );
};