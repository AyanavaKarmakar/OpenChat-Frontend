import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useState, forwardRef, useEffect } from "react";
import { useErrorStore } from "../../stores/ErrorStore";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorToast = () => {
  const [open, setOpen] = useState(false);
  const error = useErrorStore();

  useEffect(() => {
    if (error.isError) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    return () => {
      setOpen(false);
    };
  }, [error.isError]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={"bottom" + "center"}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="error"
        sx={{ width: "100%" }}
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
};
