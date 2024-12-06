import { Box } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
function SharePage(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const score = searchParams.get("score");
  const puzzleToString = searchParams.get("puzzleToString");

  console.log(score);
  console.log(puzzleToString);
  return (
    <Box sx={{ backgroundColor: "black" }}>
      <h1>Shared Puzzle</h1>
      <p>Puzzle: {puzzleToString}</p>
      <p>Score: {score}</p>
    </Box>
  );
}

export default SharePage;
