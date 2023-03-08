import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";

export const SendMessageButton = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [sendMessage, setSendMessage] = useState("Hi, there!");
  const [messageContentError, setMessageContentError] = useState(false);

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
            //onClick={() => UpdateMessage.mutate()}
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
