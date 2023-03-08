import { Button, TextField } from "@mui/material";
import { type FC, useState, useEffect } from "react";
import { type TBaseToastProps } from "../shared/BaseToast";
import { useErrorStore, useLoadingStore } from "../../stores";
import { useMutation } from "@tanstack/react-query";
import { MessageSchema } from "../../types/MessagesResponseSchema";

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
  const loading = useLoadingStore();
  const error = useErrorStore();

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
        onClick={() => UpdateMessage.mutate()}
      >
        Edit
      </Button>

      {/* temporary, should be replaced with dialog later */}
      <TextField
        type="text"
        id="updatedMessageContent"
        label="Update message "
        variant="outlined"
        defaultValue={updatedMessageContent}
        onChange={(e) => setUpdatedMessageContent(e.target.value)}
        helperText={messageContentError && "message cannot be empty"}
        error={messageContentError}
      />
    </>
  );
};
