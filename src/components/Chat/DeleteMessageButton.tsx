import { Button } from "@mui/material";
import { type FC } from "react";

interface Props {
  id: number;
}

export const DeleteMessageButton: FC<Props> = ({ id }) => {
  return (
    <Button color="error" variant="contained" sx={{ mt: 2, ml: 1 }}>
      Delete
    </Button>
  );
};
