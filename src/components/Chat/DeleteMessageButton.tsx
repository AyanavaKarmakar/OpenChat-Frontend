import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { useLoadingStore, useErrorStore } from "../../stores";
import { useMutation } from "@tanstack/react-query";
import { MessageDeleteResponseSchema } from "../../types/MessagesResponseSchema";
import { BaseToast, type TBaseToastProps } from "../shared/BaseToast";

interface Props {
  id: number;
}

export const DeleteMessageButton: FC<Props> = ({ id }) => {
  const loading = useLoadingStore();
  const error = useErrorStore();
  const [baseToastProps, setBaseToastProps] = useState<TBaseToastProps>({
    severity: "info",
    message: "",
  });

  const DeleteMessage = useMutation({
    mutationKey: ["DeleteMessage"],

    mutationFn: async () => {
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
        setBaseToastProps({
          severity: "success",
          message: "Message deleted successfully",
        });

        const timer = setTimeout(() => {
          setBaseToastProps({
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

  return (
    <>
      <Button
        color="error"
        variant="contained"
        sx={{ mt: 2, ml: 1 }}
        onClick={() => DeleteMessage.mutate()}
      >
        Delete
      </Button>

      {baseToastProps.message !== "" && (
        <BaseToast
          severity={baseToastProps.severity}
          message={baseToastProps.message}
        />
      )}
    </>
  );
};
