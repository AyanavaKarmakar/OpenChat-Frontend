import { Button, Typography } from "@mui/material";

export const LoginButton = () => {
  return (
    <Button color="success" disabled={false} size="large" variant="contained">
      <Typography variant="h6">Log in</Typography>
    </Button>
  );
};
