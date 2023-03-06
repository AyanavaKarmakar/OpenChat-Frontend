import { Typography, Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: 3,
      }}
    >
      <Stack
        spacing={5}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography fontWeight={"bold"} variant="h4">
          404 — Page not found!
        </Typography>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large" color="info">
            Go Back
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};
