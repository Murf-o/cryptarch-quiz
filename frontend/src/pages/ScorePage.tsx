import { useEffect, useState } from "react";
import { firestoreGetUserScores } from "../firebase/firestore";
import { useAuth } from "../contexts/authContext";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Card,
  CardContent,
} from "@mui/material";

function ScoresPage() {
  const [scores, setScores] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  useEffect(() => {
    const fetchScores = async () => {
      if (currentUser?.email) {
        try {
          setLoading(true);
          const userScores = await firestoreGetUserScores(currentUser.email);
          let topTenScores: number[] = [];
          if (userScores != null) {
            userScores.sort((a, b) => b - a);
            topTenScores = userScores.slice(0, 10);
            setScores(topTenScores);
          }
        } catch (error) {
          console.error("Error fetching scores:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchScores();
  }, [currentUser]);

  if (loading) {
    return <CircularProgress sx={{ color: "#fff" }} />;
  }

  return (
    <div
      style={{
        backgroundColor: "#2f4f4f", // Slate gray background for a modern feel
        color: "white",
        height: "100vh", // Full screen height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        Top Scores
      </Typography>
      {scores.length === 0 ? (
        <Typography variant="body1" align="center">
          No scores available.
        </Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            backgroundColor: "lightblue",
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
            overflowY: "auto", // Allow scrolling for the scores list
            maxHeight: "60vh", // Limit height to 60% of the viewport height
          }}
        >
          <List>
            {scores.map((score, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#fafafa",
                  marginBottom: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
              >
                <Card sx={{ display: "flex", width: "100%" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <ListItemText
                      primary={`#${index + 1} - Score: ${score}`}
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                      }}
                    />
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
}

export default ScoresPage;
