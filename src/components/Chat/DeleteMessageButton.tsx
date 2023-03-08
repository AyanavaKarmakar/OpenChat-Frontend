import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, type FC } from "react";
import { useLoadingStore, useErrorStore } from "../../stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type TBaseToastProps } from "../shared/BaseToast";
import {
  type TMessage,
  type TMessagesResponse,
  MessageDeleteResponseSchema,
} from "../../types/MessagesResponseSchema";

interface Props {
  id: number;
  SetToast: (params: TBaseToastProps) => void;
}

export const DeleteMessageButton: FC<Props> = ({ id, SetToast }) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const loading = useLoadingStore();
  const error = useErrorStore();
  const queryClient = useQueryClient();

  const DeleteMessage = useMutation({
    mutationKey: ["DeleteMessage"],

    mutationFn: async () => {
      loading.setLoading();

      const response = await fetch(
        `http://localhost:5271/api/v1/messages/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = MessageDeleteResponseSchema.parse(await response.json());

      if (
        "message" in data &&
        data.message === "Message deleted successfully"
      ) {
        SetToast({
          severity: "success",
          message: "Message deleted successfully",
        });

        const Timer = setTimeout(() => {
          SetToast({
            severity: "info",
            message: "",
          });
        }, 5000);

        return () => {
          clearTimeout(Timer);
        };
      }
    },

    onMutate: () => {
      queryClient.setQueryData(
        ["get_messages"],

        (oldData: TMessagesResponse | undefined) => {
          return oldData?.filter((message: TMessage) => message.id !== id);
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

  return (
    <>
      <Button
        color="error"
        variant="contained"
        sx={{ mt: 2, ml: 1 }}
        onClick={() => setOpenAlertDialog(true)}
      >
        Delete
      </Button>
      <Dialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        aria-labelledby="delete-message-dialog"
        aria-describedby="delete-message-dialog-confirmation"
      >
        <DialogTitle id="delete-message-alert-dialog">
          Delete Message
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-message-alert-dialog-description">
            Are you sure you want to delete this message? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlertDialog(false)}>Disagree</Button>
          <Button onClick={() => DeleteMessage.mutate()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
