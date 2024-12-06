import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { firestoreSetUsername } from "../../firebase/firestore";
import { getErrorMessage } from "../../utils/utils";
import { useAuthRefreshContext } from "../../contexts/AuthRefreshContext";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { triggerAuthRefresh } = useAuthRefreshContext();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSaveUsername = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (username.length < 5) {
        setError("Username needs to be at least 5 characters");
        return;
      }

      if (username.length >= 13) {
        setError("Username needs to be at less than 13 characters");
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        setError(
          "Username can only contain letters, numbers, and underscores."
        );
        return;
      }

      await firestoreSetUsername(username);
      triggerAuthRefresh();
      setUsername("");
      onClose();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-settings-title"
      aria-describedby="user-settings-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "rgba(0, 0, 0, 0.4)",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            bgcolor: "#fafafa",
            borderRadius: 3,
            border: "1px solid #d0d0d0",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: 500,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Typography
            id="user-settings-title"
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            Settings
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 2 }}
          >
            <Tab label="Username" sx={{ color: "#333" }} />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
                  Change your username:
                </Typography>
                <TextField
                  fullWidth
                  label="New Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  sx={{
                    mb: 3,
                    input: { color: "#333" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#888" },
                    },
                  }}
                />
                {error && (
                  <Typography variant="body2" sx={{ color: "red", mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "grey",
                borderColor: "black",
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5", color: "#333" },
                fontWeight: "bold",
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: isLoading ? "lightgrey" : "teal",
                borderColor: "black",
                color: isLoading ? "darkgrey" : "#fff",
                "&:hover": {
                  backgroundColor: isLoading ? "lightgrey" : "darkblue",
                },
                padding: "8px 16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleSaveUsername}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserSettingsModal;
