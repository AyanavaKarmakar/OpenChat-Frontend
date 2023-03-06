import { Button, Typography } from "@mui/material";

export const SignupButton = () => {
  return (
    <Button color="info" disabled={false} size="large" variant="contained">
      <Typography variant="h6">Sign up</Typography>
    </Button>
  );
};
