import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { type FC, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorStore, useLoadingStore, useUserStore } from "../../stores";
import { MessageSchema } from "../../types/MessagesResponseSchema";
import { TBaseToastProps } from "../shared/BaseToast";

interface Props {
  SetToast: (params: TBaseToastProps) => void;
}

export const SendMessageButton: FC<Props> = ({ SetToast }) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [sendMessage, setSendMessage] = useState("Hi, there!");
  const [messageContentError, setMessageContentError] = useState(false);
  const user = useUserStore();
  const error = useErrorStore();
  const loading = useLoadingStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (sendMessage === "" || sendMessage === " ") {
      setMessageContentError(true);
    } else {
      setMessageContentError(false);
    }

    return () => {
      setMessageContentError(false);
    };
  }, [sendMessage]);

  const SendMessage = useMutation({
    mutationKey: ["sendMessage"],

    mutationFn: async () => {
      loading.setLoading();

      const response = await fetch("http://localhost:5271/api/v1/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: user.username,
          messageContent: sendMessage,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = MessageSchema.parse(await response.json());

      if ("messageContent" in data) {
        SetToast({
          severity: "success",
          message: "Message sent successfully",
        });

        const timer = setTimeout(() => {
          SetToast({
            severity: "info",
            message: "",
          });
        }, 5000);

        return () => {
          clearTimeout(timer);
        };
      }
    },

    onSuccess: () => {
      error.clearError();
    },

    onError: () => {
      error.setError();
    },

    onSettled: () => {
      loading.unsetLoading();
      setOpenAlertDialog(false);
    },
  });

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        size="medium"
        onClick={() => setOpenAlertDialog(true)}
      >
        <Typography variant="h6">Send Message</Typography>
      </Button>

      <Dialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        aria-labelledby="send-message-dialog"
        aria-describedby="send-message-dialog-confirmation"
      >
        <DialogTitle id="send-message-alert-dialog">Send</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            id="sendMessageContent"
            label="Send message"
            variant="outlined"
            defaultValue={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            helperText={messageContentError && "message cannot be empty"}
            error={messageContentError}
            sx={{
              mt: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlertDialog(false)}>Cancel</Button>
          <Button
            disabled={messageContentError}
            onClick={() => SendMessage.mutate()}
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
