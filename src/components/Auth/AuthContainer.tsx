import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const AuthContainer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        m: 5,
      }}
    >
      <Stack spacing={3} direction="column">
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          CHAT LOGS
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/auth" style={{ textDecoration: "none" }}>
            <Button
              color="info"
              disabled={false}
              size="large"
              variant="contained"
            >
              <Typography variant="h6">Sign up</Typography>
            </Button>
          </Link>

          <Link to="/auth" style={{ textDecoration: "none" }}>
            <Button
              color="success"
              disabled={false}
              size="large"
              variant="contained"
            >
              <Typography variant="h6">Log in</Typography>
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};
