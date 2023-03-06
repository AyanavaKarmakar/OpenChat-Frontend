import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginButton = () => {
  return (
    <Link to="/auth" style={{ textDecoration: "none" }}>
      <Button color="success" disabled={false} size="large" variant="contained">
        <Typography variant="h6">Log in</Typography>
      </Button>
    </Link>
  );
};
