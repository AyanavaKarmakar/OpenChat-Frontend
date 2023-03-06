import { Button, Typography } from "@mui/material";
import { type FC } from "react";

interface Props {
  username: string;
  password: string;
}

export const SignupButton: FC<Props> = ({ username, password }) => {
  return (
    <Button color="info" disabled={false} size="large" variant="contained">
      <Typography variant="h6">Sign up</Typography>
    </Button>
  );
};
