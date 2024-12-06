import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WeaponItem } from "./PuzzlePage";
import CompletedBoard from "../components/CompletedBoard";
import { firestoreGetPuzzle } from "../firebase/firestore";

const NUM_ROWS = 3;
const NUM_COLS = 3;
const ITEMS_API = "/item_data";

function SharePage(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const puzzleId = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<WeaponItem[]>([]);
  const [score, setScore] = useState(0);
  const [rowLabels, setRowLabels] = useState<string[]>([]);
  const [colLabels, setColLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeaponItems = async () => {
      if (!puzzleId) return;
      try {
        setLoading(true);
        const puzzleDoc = await firestoreGetPuzzle(puzzleId);
        if (!puzzleDoc) return;

        const response = await fetch(ITEMS_API);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = (await response.json()) as WeaponItem[];
        const answerIds = puzzleDoc.answers;

        setScore(puzzleDoc.score);
        setRowLabels(puzzleDoc.rowLabels);
        setColLabels(puzzleDoc.colLabels);
        setAnswers(
          answerIds.flatMap((answerId: number) =>
            data.filter((item) => item.id === answerId)
          )
        );
      } catch (error) {
        console.error("Failed to fetch weapon items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeaponItems();
  }, [puzzleId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div
      style={{
        backgroundColor: "#2f4f4f",
        color: "white",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {answers.length === 0 ? (
        <>Invalid Link, or puzzle no longer available.</>
      ) : (
        <>
          <h1>Shared Puzzle</h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginBottom: "20px",
            }}
          >
            <CompletedBoard
              num_rows={NUM_ROWS}
              num_cols={NUM_COLS}
              answers={answers}
              rowLabels={rowLabels}
              colLabels={colLabels}
            />
          </div>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Score: {score}
          </p>
        </>
      )}
    </div>
  );
}

export default SharePage;
