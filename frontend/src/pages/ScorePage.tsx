import React, { useEffect, useState } from "react";
import { firestoreGetUserScores } from "../firebase/firestore"; // Adjust the import as necessary
import { useAuth } from "../contexts/authContext";
import { CircularProgress, Typography, List, ListItem, ListItemText } from "@mui/material";

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
          if (userScores != null) {
            setScores(userScores);
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
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Previous Scores
      </Typography>
      {scores.length === 0 ? (
        <Typography variant="body1" align="center">
          No scores available.
        </Typography>
      ) : (
        <List>
          {scores.map((score, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Score: ${score}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default ScoresPage;