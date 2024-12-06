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
  Button,
} from "@mui/material";

function ScoresPage() {
  const [scores, setScores] = useState<{ score: number; puzzleId: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  useEffect(() => {
    const fetchScores = async () => {
      if (currentUser?.email) {
        try {
          setLoading(true);
          const userScoreDocs = await firestoreGetUserScores(currentUser.email);
          const userScores = userScoreDocs.map((doc) => {
            return { score: doc.data().score, puzzleId: doc.id };
          });

          userScores.sort((a, b) => b.score - a.score);
          const topTenScores = userScores.slice(0, 10);
          setScores(topTenScores);
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

  const handleCopyLink = (shareLinkId: string) => {
    if (shareLinkId) {
      const linkToCopy = `${window.location.origin}/share?id=${shareLinkId}`;

      // Try to use the Clipboard API
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(linkToCopy)
          .then(() => {
            alert("Link copied to clipboard!");
          })
          .catch(() => {
            // Create an input element to hold the link
            const input = document.createElement("input");
            input.value = linkToCopy;
            document.body.appendChild(input);

            // Select and copy the text inside the input element
            input.select();
            document.execCommand("copy");

            // Remove the input element after copying
            document.body.removeChild(input);

            alert("Link copied to clipboard!");
          });
      } else {
        // Fallback for older browsers or unsupported API
        // Create an input element to hold the link
        const input = document.createElement("input");
        input.value = linkToCopy;
        document.body.appendChild(input);

        // Select and copy the text inside the input element
        input.select();
        document.execCommand("copy");

        // Remove the input element after copying
        document.body.removeChild(input);

        alert("Link copied to clipboard!");
      }
    }
  };

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
            {scores.map((o, index) => (
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
                <Card
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      primary={`#${index + 1} - Score: ${o.score}`}
                      sx={{
                        fontWeight: 600,
                        color: "#333",
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        marginLeft: 2,
                        borderRadius: 2,
                        height: "40px",
                      }}
                      onClick={() => handleCopyLink(o.puzzleId)}
                    >
                      Copy Link to Share
                    </Button>
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
