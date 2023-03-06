import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const SignupButton = () => {
  return (
    <Link to="/auth">
      <Button color="info" disabled={false} size="large" variant="contained">
        <Typography variant="h6">Sign up</Typography>
      </Button>
    </Link>
  );
};
