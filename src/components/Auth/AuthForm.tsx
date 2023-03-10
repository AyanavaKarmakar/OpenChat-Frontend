import { Typography, Stack, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginButton } from "./LoginButton";
import { SignupButton } from "./SignupButton";
import { Link } from "react-router-dom";

export const AuthForm = () => {
  const [username, setUsername] = useState("John Doe");
  const [password, setPassword] = useState("********");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    // validate username
    if (username === "" || username === " ") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    // validate password
    if (password === "" || password === " ") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    return () => {
      setUsernameError(false);
      setPasswordError(false);
    };
  }, [username, password]);

  return (
    <Stack
      spacing={5}
      direction="column"
      sx={{ width: "100%", maxWidth: "450px", margin: "0 auto", mt: 12 }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Login or Signup
      </Typography>
      <TextField
        type="text"
        id="username"
        label="Username"
        variant="outlined"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
        helperText={
          usernameError ? "Username is required" : "Enter your username"
        }
        required
        error={usernameError}
      />
      <TextField
        type="password"
        id="password"
        label="Password"
        variant="outlined"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText={
          passwordError ? "Password is required" : "Enter your password"
        }
        required
        error={passwordError}
      />

      <Stack
        direction="row"
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button color="secondary" size="large" variant="contained">
            <Typography variant="h6">Go Back</Typography>
          </Button>
        </Link>

        <SignupButton
          disabled={usernameError || passwordError}
          username={username}
          password={password}
        />

        <LoginButton
          disabled={usernameError || passwordError}
          username={username}
          password={password}
        />
      </Stack>
    </Stack>
  );
};
