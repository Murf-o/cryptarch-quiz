import React, { useState } from "react";
import { FirebaseError } from "firebase/app";
import { TextField, Button, Typography, Box } from "@mui/material";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
      setSuccess("User registered successfully!");
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message); // might need to remove if it reveals too much
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#2f4f4f", // Slightly darker slate gray for a modern feel
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px", // Limit the max width for better readability
          padding: "20px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            padding: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ alignSelf: "center", fontWeight: 600, color: "black" }}
          >
            Register
          </Typography>
          {/* Email TextField */}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{
              input: {
                color: "black",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiOutlinedInput-root": {
                borderColor: "#ddd",
              },
              "&:hover .MuiOutlinedInput-root": {
                borderColor: "#4285F4",
              },
              "&.Mui-focused .MuiOutlinedInput-root": {
                borderColor: "#4285F4",
              },
            }}
          />

          {/* Password TextField */}
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{
              input: {
                color: "black",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiOutlinedInput-root": {
                borderColor: "#ddd",
              },
              "&:hover .MuiOutlinedInput-root": {
                borderColor: "#4285F4",
              },
              "&.Mui-focused .MuiOutlinedInput-root": {
                borderColor: "#4285F4",
              },
            }}
          />

          {error && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          )}
          {success && <Typography color="primary">{success}</Typography>}
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isRegistering}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              padding: "12px 0",
              borderRadius: "8px",
              mt: 2,
              "&:hover": {
                backgroundColor: "#4285F4",
              },
            }}
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default RegisterPage;
