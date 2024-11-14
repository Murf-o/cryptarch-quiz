import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userLoggedIn = useAuth()?.userLoggedIn;
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/puzzle");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message); // might need to remove if it reveals too much
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/puzzle"} replace={true} />}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 300,
          mx: "auto",
          mt: 4,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    </>
  );
}

export default LoginPage;
