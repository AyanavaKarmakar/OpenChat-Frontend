import { Button, Typography } from "@mui/material";
import { type FC } from "react";

interface Props {
  username: string;
  password: string;
  disabled: boolean;
}

export const SignupButton: FC<Props> = ({ username, password, disabled }) => {
  return (
    <Button color="info" disabled={disabled} size="large" variant="contained">
      <Typography variant="h6">Sign up</Typography>
    </Button>
  );
};
