import React, { useEffect, useState } from "react";
import { firestoreGetLeaderboard, UserStats } from "../firebase/firestore";
import { getErrorMessage } from "../utils/utils";

function ScoreboardPage(): React.ReactNode {
  const [users, setUsers] = useState<UserStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setError(null);
        const leaderboard = await firestoreGetLeaderboard();
        setUsers(leaderboard);
      } catch (err) {
        console.error("Error fetching user data:", getErrorMessage(err));
        setError("Failed to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <p>Loading leaderboard...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#2f4f4f",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Scoreboard</h1>
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "80%",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Username</th>
              <th style={{ padding: "10px", textAlign: "left" }}>
                Puzzles Solved
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>{user.username}</td>
                <td style={{ padding: "10px" }}>{user.puzzlesSolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreboardPage;
