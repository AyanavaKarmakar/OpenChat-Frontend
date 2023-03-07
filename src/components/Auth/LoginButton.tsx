import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, type FC } from "react";
import { useLoadingStore, useErrorStore } from "../../stores";
import { BaseToast, type TBaseToastProps } from "../shared/BaseToast";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserResponseSchema } from "../../types/RegisterUserResponseSchema";

interface Props {
  username: string;
  password: string;
  disabled: boolean;
}

export const LoginButton: FC<Props> = ({ username, password, disabled }) => {
  const navigate = useNavigate();
  const loading = useLoadingStore();
  const error = useErrorStore();
  const [baseToastProps, setBaseToastProps] = useState<TBaseToastProps>({
    severity: "info",
    message: "",
  });

  const LoginUser = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      loading.setLoading();

      const response = await fetch("http://localhost:5271/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = RegisterUserResponseSchema.parse(await response.json());

      if ("message" in data && data.message === "User doesn't exist") {
        setBaseToastProps({
          severity: "warning",
          message: "User doesn't exist!",
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

      if ("message" in data && data.message === "Login failed") {
        setBaseToastProps({
          severity: "error",
          message: "Login failed!",
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
          message: "You have been successfully logged in!",
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
      <Link to="/auth" style={{ textDecoration: "none" }}>
        <Button
          color="success"
          disabled={disabled}
          size="large"
          variant="contained"
          onClick={() => LoginUser.mutate()}
        >
          <Typography variant="h6">Log in</Typography>
        </Button>
      </Link>

      {baseToastProps.message !== "" && (
        <BaseToast
          severity={baseToastProps.severity}
          message={baseToastProps.message}
        />
      )}
    </>
  );
};
