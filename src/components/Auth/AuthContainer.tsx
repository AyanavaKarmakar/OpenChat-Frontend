import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores";
import { LogoutButton } from "./LogoutButton";
import { SendMessageButton } from "../Chat/SendMessageButton";
import { BaseToast, type TBaseToastProps } from "../shared/BaseToast";
import { useState } from "react";

export const AuthContainer = () => {
  const user = useUserStore();
  const [baseToastProps, setBaseToastProps] = useState<TBaseToastProps>({
    severity: "info",
    message: "",
  });

  const SetToast = ({ severity, message }: TBaseToastProps) => {
    setBaseToastProps({ severity, message });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mx: 5,
          mt: 12,
        }}
      >
        <Stack spacing={3} direction="column">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            CHAT LOGS
          </Typography>

          <Stack
            spacing={1}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user.username === "" ? (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <Button color="primary" size="large" variant="contained">
                  <Typography variant="h5">Log in / Sign up</Typography>
                </Button>
              </Link>
            ) : (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SendMessageButton SetToast={SetToast} />
                <LogoutButton />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>

      {baseToastProps.message !== "" && (
        <BaseToast
          severity={baseToastProps.severity}
          message={baseToastProps.message}
        />
      )}
    </>
  );
};
