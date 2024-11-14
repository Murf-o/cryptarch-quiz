import React, { useState } from "react";
import { FirebaseError } from "firebase/app";
import { TextField, Button, Typography, Box } from "@mui/material";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setSuccess("User registered successfully!");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message); // might need to remove if it reveals too much
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h5">Register</Typography>
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
      {success && <Typography color="primary">{success}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </Box>
  );
};

export default RegisterPage;
