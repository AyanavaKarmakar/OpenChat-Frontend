import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores";
import { LogoutButton } from "./LogoutButton";

export const AuthContainer = () => {
  const user = useUserStore();

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
          {user.username === "" ? (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <Button color="primary" size="large" variant="contained">
                <Typography variant="h6">Log in / Sign up</Typography>
              </Button>
            </Link>
          ) : (
            <LogoutButton />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
