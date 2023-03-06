import { Box, Stack, Typography } from "@mui/material";
import { SignupButton } from "./SignupButton";
import { LoginButton } from "./LoginButton";

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
          <SignupButton />
          <LoginButton />
        </Stack>
      </Stack>
    </Box>
  );
};
