import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { type FC, useState, useEffect } from "react";
import { type TBaseToastProps } from "../shared/BaseToast";
import { useErrorStore, useLoadingStore } from "../../stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MessageSchema,
  type TMessage,
  type TMessagesResponse,
} from "../../types/MessagesResponseSchema";

interface Props {
  id: number;
  messageContent: string;
  SetToast: (params: TBaseToastProps) => void;
}

export const EditMessageButton: FC<Props> = ({
  id,
  messageContent,
  SetToast,
}) => {
  const [messageContentError, setMessageContentError] = useState(false);
  const [updatedMessageContent, setUpdatedMessageContent] =
    useState(messageContent);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const loading = useLoadingStore();
  const error = useErrorStore();
  const queryClient = useQueryClient();

  const UpdateMessage = useMutation({
    mutationKey: ["UpdateMessage"],

    mutationFn: async () => {
      loading.setLoading();

      const response = await fetch(
        `http://localhost:5271/api/v1/messages/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMessageContent),
        }
      );

      const data = MessageSchema.parse(await response.json());

      if ("messageContent" in data) {
        SetToast({
          severity: "success",
          message: "Message updated successfully",
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

    onMutate: () => {
      queryClient.setQueryData(
        ["get_messages"],

        (oldData: TMessagesResponse | undefined) => {
          return oldData?.map((message: TMessage) => {
            if (message.id === id) {
              return {
                ...message,
                messageContent: updatedMessageContent,
              };
            }
            return message;
          });
        }
      );
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

  useEffect(() => {
    if (updatedMessageContent === "" || updatedMessageContent === " ") {
      setMessageContentError(true);
    } else {
      setMessageContentError(false);
    }

    return () => {
      setMessageContentError(false);
    };
  }, [updatedMessageContent]);

  return (
    <>
      <Button
        sx={{ mt: 2 }}
        color="secondary"
        variant="contained"
        onClick={() => setOpenAlertDialog(true)}
      >
        Edit
      </Button>

      <Dialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        aria-labelledby="update-message-dialog"
        aria-describedby="update-message-dialog-confirmation"
      >
        <DialogTitle id="update-message-alert-dialog">Update</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            id="updatedMessageContent"
            label="Update message "
            variant="outlined"
            defaultValue={updatedMessageContent}
            onChange={(e) => setUpdatedMessageContent(e.target.value)}
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
            onClick={() => UpdateMessage.mutate()}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
