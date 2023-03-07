import { Fab, Typography, Stack, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useErrorStore, useLoadingStore, useUserStore } from "../../stores";
import { MessagesResponseSchema } from "../../types/MessagesResponseSchema";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GetMessageTime } from "../../utils/GetMessageTime";
import { EditMessageButton } from "./EditMessageButton";
import { DeleteMessageButton } from "./DeleteMessageButton";

export const ChatContainer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const error = useErrorStore();
  const loading = useLoadingStore();
  const user = useUserStore();

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
        {GetMessages.data?.map(({ id, messageContent, sender, timestamp }) => {
          return (
            <Paper key={id} elevation={5} sx={{ p: 3, borderRadius: "10px" }}>
              <Typography variant="h6" sx={{ lineHeight: "25px" }}>
                {messageContent}
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {`${sender} ${GetMessageTime(new Date(timestamp))}`}
              </Typography>

              {user.username === sender || (
                <Stack
                  direction="row"
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <EditMessageButton id={id} />
                  <DeleteMessageButton id={id} />
                </Stack>
              )}
            </Paper>
          );
        })}
      </Stack>
    </>
  );
};
