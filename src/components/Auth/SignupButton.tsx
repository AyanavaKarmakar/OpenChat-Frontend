import { Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserResponseSchema } from "../../types/RegisterUserResponseSchema";
import { type FC, useState } from "react";
import { BaseToast, type TBaseToastProps } from "../shared/BaseToast";
import { useErrorStore, useLoadingStore } from "../../stores";
import { useNavigate } from "react-router-dom";

interface Props {
  username: string;
  password: string;
  disabled: boolean;
}

export const SignupButton: FC<Props> = ({ username, password, disabled }) => {
  const navigate = useNavigate();
  const loading = useLoadingStore();
  const error = useErrorStore();
  const [baseToastProps, setBaseToastProps] = useState<TBaseToastProps>({
    severity: "info",
    message: "",
  });

  const RegisterUser = useMutation({
    mutationKey: ["register"],

    mutationFn: async () => {
      loading.setLoading();

      const response = await fetch(
        "http://localhost:5271/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = RegisterUserResponseSchema.parse(await response.json());

      if ("message" in data && data.message === "Username already taken") {
        setBaseToastProps({
          severity: "warning",
          message: "Username is already taken!",
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

      if ("token" in data) {
        setBaseToastProps({
          severity: "success",
          message: "You have been successfully registered!",
        });

        localStorage.setItem("token", data.token);

        navigate("/");

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
        color="info"
        disabled={disabled}
        size="large"
        variant="contained"
        onClick={() => RegisterUser.mutate()}
      >
        <Typography variant="h6">Sign up</Typography>
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
