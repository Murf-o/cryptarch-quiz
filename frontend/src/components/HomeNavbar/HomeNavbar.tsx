import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

const pages = [{ displayName: "Puzzles", url: "puzzle" }];

function HomeNavbar(): React.ReactNode {
  const auth = useAuth();
  const userLoggedIn = auth?.userLoggedIn;
  const currentUser = auth?.currentUser;

  const navigate = useNavigate();
  const handleLogout = () => {
    doSignOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch(() => {
        // An error happened.
      });
  };

  return (
    <AppBar
      position="fixed"
      sx={{ width: "100%", height: "64px", backgroundColor: "#B0B0B0 " }}
    >
      <Container>
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/destiny_ghost_sketch.png"
            alt="CryptArch Quiz Logo"
            sx={{
              height: "auto",
              width: 80,
              mr: 2, // Adds some spacing between the image and text
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              mr: 2,
              mb: 0.5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Cryptarch Quiz
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.url}
                component={Link}
                to={`/${page.url}`}
                sx={{
                  my: 2,
                  ml: 2,
                  color: "#fff", // White text color for better contrast
                  backgroundColor: "#4CAF50", // Vibrant teal background color
                  display: "block",
                  padding: "8px 16px", // Adequate padding for the button
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition for hover effect
                  "&:hover": {
                    backgroundColor: "#388E3C", // Darker shade of green on hover
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Hover shadow effect for depth
                  },
                  "&:active": {
                    backgroundColor: "#2C6B2F", // Slightly darker green on click
                  },
                  "&:focus": {
                    outline: "none", // Remove default focus outline
                    boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.5)", // Custom focus outline for accessibility
                  },
                }}
              >
                {page.displayName}
              </Button>
            ))}
          </Box>

          {/* Register and Login buttons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!userLoggedIn ? (
              <>
                <Button
                  component={Link}
                  variant="outlined"
                  to="/register" // Link to the Register page
                  sx={{
                    my: 2,
                    color: "#fff", // White text color
                    display: "block",
                    mr: 2,
                    backgroundColor: "#3f51b5", // Blue background
                    padding: "8px 20px", // Padding for a better size
                    fontWeight: 600, // Bold text
                    textTransform: "none", // Prevent text transformation
                    "&:hover": {
                      backgroundColor: "#2c387e", // Darker shade on hover
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Hover shadow effect
                    },
                  }}
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  variant="outlined"
                  to="/login" // Link to the Login page
                  sx={{
                    my: 2,
                    color: "#fff", // White text color
                    display: "block",
                    backgroundColor: "#00796b", // Teal background

                    padding: "8px 20px", // Padding for a better size
                    fontWeight: 600, // Bold text
                    textTransform: "none", // Prevent text transformation
                    "&:hover": {
                      backgroundColor: "#004d40", // Darker teal on hover
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Hover shadow effect
                    },
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#000",
                    mr: 2,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Welcome {currentUser?.displayName || "Back"}!
                </Typography>
                <Button
                  onClick={handleLogout} // Logout handler
                  sx={{
                    my: 2,
                    color: "#fff", // White text color
                    display: "block",
                    backgroundColor: "#d32f2f", // Red background for logout
                    borderRadius: "20px", // Rounded corners
                    padding: "8px 20px", // Padding for a better size
                    fontWeight: 600, // Bold text
                    textTransform: "none", // Prevent text transformation
                    "&:hover": {
                      backgroundColor: "#b71c1c", // Darker red on hover
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Hover shadow effect
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeNavbar;
