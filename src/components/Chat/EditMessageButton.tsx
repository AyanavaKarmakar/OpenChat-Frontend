import { Button } from "@mui/material";
import { type FC } from "react";

interface Props {
  id: number;
}

export const EditMessageButton: FC<Props> = ({ id }) => {
  return (
    <Button color="secondary" variant="contained" sx={{ mt: 2 }}>
      Edit
    </Button>
  );
};
