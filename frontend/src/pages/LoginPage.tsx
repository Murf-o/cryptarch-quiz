import {
  Box,
  Button,
  DialogActions,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Google } from "@mui/icons-material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

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

  const onGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      doSignInWithGoogle().catch((_err) => {
        setIsSigningIn(false);
        setError("Could not sign in with Google");
      });
    }
  };

  return (
    <>
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
          {userLoggedIn && <Navigate to="/puzzle" replace />}
          <Box
            component="form"
            onSubmit={handleLogin}
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
              Login
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSigningIn}
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
              {isSigningIn ? "Logging In..." : " Login"}
            </Button>

            {/* Sign up Link */}
            <DialogActions sx={{ justifyContent: "center" }}>
              <Typography variant="body2" color="black">
                Don't have an account?{" "}
                <Button
                  color="primary"
                  onClick={() => navigate("/register")}
                  sx={{ fontWeight: "bold" }}
                >
                  Sign up
                </Button>
              </Typography>
            </DialogActions>

            {/* Divider */}
            <Box display="flex" alignItems="center" width="100%">
              <Divider
                sx={{
                  flexGrow: 1,
                  marginRight: 1,
                  backgroundColor: "#ccc",
                }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ width: "fit-content", marginX: 1 }}
                color="black"
              >
                OR
              </Typography>
              <Divider
                sx={{
                  flexGrow: 1,
                  marginLeft: 1,
                  backgroundColor: "#ccc",
                }}
              />
            </Box>

            {/* Google Sign-in Button */}
            <Button
              disabled={isSigningIn}
              onClick={onGoogleSignIn}
              variant="outlined"
              startIcon={<Google sx={{ paddingBottom: "4px" }} />}
              sx={{
                textTransform: "none",
                color: "#4285F4", // Blue color for text
                borderColor: "#4285F4",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                backgroundColor: "white",
                "&:hover": {
                  borderColor: "#4285F4",
                  backgroundColor: "#f1f3f4",
                },
                "&:active": {
                  backgroundColor: "#dce4ff",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              {isSigningIn ? "Signing In..." : "Continue with Google"}
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
