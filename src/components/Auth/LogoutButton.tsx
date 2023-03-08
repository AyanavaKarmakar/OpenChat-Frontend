import { Button, Typography } from "@mui/material";
import { useUserStore } from "../../stores";

export const LogoutButton = () => {
  const user = useUserStore();

  const handleClick = () => {
    localStorage.removeItem("token");
    user.clearUsername();
  };

  return (
    <Button
      color="error"
      size="medium"
      variant="contained"
      onClick={handleClick}
    >
      <Typography variant="h6">Log out</Typography>
    </Button>
  );
};
