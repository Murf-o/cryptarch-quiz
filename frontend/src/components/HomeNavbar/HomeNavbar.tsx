import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const pages = ["Daily Puzzle"];

function HomeNavbar(): React.ReactNode {
  return (
    <AppBar position="fixed" sx={{ width: "100%", height: "64px" }}>
      <Container>
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/destiny_ghost_sketch.png"
            alt="CryptArch Quiz Logo"
            sx={{
              height: "auto", // Adjust as needed
              width: 80, // Adjust as needed
              mr: 1, // Adds some spacing between the image and text
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
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CryptArch Quiz
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeNavbar;
