import { Fab, Typography, Stack, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useErrorStore, useLoadingStore, useUserStore } from "../../stores";
import { MessagesResponseSchema } from "../../types/MessagesResponseSchema";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EditMessageButton } from "./EditMessageButton";
import { DeleteMessageButton } from "./DeleteMessageButton";
import { BaseToast, type TBaseToastProps } from "../shared/BaseToast";

export const ChatContainer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const error = useErrorStore();
  const loading = useLoadingStore();
  const user = useUserStore();
  const [baseToastProps, setBaseToastProps] = useState<TBaseToastProps>({
    severity: "info",
    message: "",
  });

  const SetToast = ({ severity, message }: TBaseToastProps) => {
    setBaseToastProps({ severity, message });
  };

  const GetMessages = useQuery({
    queryKey: ["get_messages"],

    queryFn: async () => {
      loading.setLoading();

      const response = await fetch("http://localhost:5271/api/v1/messages");
      const data = MessagesResponseSchema.parse(await response.json());

      return data;
    },

    enabled: true,

    onSuccess: () => {
      error.clearError();
    },

    onError: () => {
      error.setError();
    },

    onSettled: () => {
      loading.unsetLoading();
    },
  });

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showBackToTop && (
        <Fab
          color="primary"
          size="medium"
          aria-label="back-to-top"
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
          onClick={handleBackToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: "375px",
          margin: "0 auto",
          mt: 8,
          mb: 3,
        }}
      >
        {GetMessages.data?.map(({ id, messageContent, sender }) => {
          return (
            <Paper key={id} elevation={5} sx={{ p: 3, borderRadius: "10px" }}>
              <Typography variant="h5" sx={{ lineHeight: "25px", pt: 1 }}>
                {messageContent}
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {`??? ${sender}`}
              </Typography>

              {user.username === sender && (
                <Stack
                  direction="row"
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <EditMessageButton
                    id={id}
                    messageContent={messageContent}
                    SetToast={SetToast}
                  />
                  <DeleteMessageButton id={id} SetToast={SetToast} />
                </Stack>
              )}
            </Paper>
          );
        })}

        {baseToastProps.message !== "" && (
          <BaseToast
            severity={baseToastProps.severity}
            message={baseToastProps.message}
          />
        )}
      </Stack>
    </>
  );
};
