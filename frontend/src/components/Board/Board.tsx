import { Button, Grid2, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ItemSearchModal from "../ItemSearchModal";
import { WeaponItem } from "../../pages/PuzzlePage";
import {
  firestoreIncrementPuzzlesSolved,
  firestoreSaveUserScore,
} from "../../firebase/firestore";
import { useAuth } from "../../contexts/authContext";
import { useAuthRefreshContext } from "../../contexts/AuthRefreshContext";

interface BoardProps {
  num_rows: number;
  num_cols: number;
  weaponItems: WeaponItem[];
  rowLabels: string[];
  colLabels: string[];
}

const Board: React.FC<BoardProps> = ({
  num_rows,
  num_cols,
  weaponItems,
  rowLabels,
  colLabels,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [answers, setAnswers] = useState<WeaponItem[][]>(
    Array.from({ length: num_rows }, () => Array(num_cols).fill(null))
  );
  const [itemSelectMessage, setItemSelectMessage] = useState<string>("");

  const [score, setScore] = useState<number>(0);
  const [consecutiveCorrectGuesses, setConsecutiveCorrectGuesses] = useState<number>(1);
  const numAnswersCorrect = useRef(0);


  const auth = useAuth();

  const { triggerAuthRefresh } = useAuthRefreshContext();

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedRow(rowIndex);
    setSelectedCol(colIndex);
    setIsModalOpen(true);
  };

  const handleItemSelect = (item: WeaponItem) => {
    if (selectedRow === null || selectedCol === null) return;

    const updatedAnswers = [...answers];
    updatedAnswers[selectedRow][selectedCol] = item;
    setAnswers(updatedAnswers);
    if (
      item.itemType === rowLabels[selectedRow] &&
      (item.tier === colLabels[selectedCol] ||
        item.elementType === colLabels[selectedCol])
    ) {

      setScore((prev) => prev + consecutiveCorrectGuesses*(100));
      setItemSelectMessage(`Matches! +${consecutiveCorrectGuesses*(100)} points`);
      setConsecutiveCorrectGuesses((prev) => prev + 1);
      numAnswersCorrect.current += 1;

    } else {
      setItemSelectMessage("Incorrect!");
      setConsecutiveCorrectGuesses(1);
    }
    setIsModalOpen(false);
  };

  const isGameFinished = answers.flat().every((cell) => cell !== null);

  useEffect(() => {
    const incrementPuzzlesSolved = async () => {
      if (isGameFinished) {
        if (auth?.currentUser?.email) {
          firestoreSaveUserScore(score, auth.currentUser.email);
        }
        if (
          auth?.userLoggedIn &&
          numAnswersCorrect.current === num_rows * num_cols
        ) {
          await firestoreIncrementPuzzlesSolved(); // Make sure to wait for the async operation
          triggerAuthRefresh();
        }
      }
    };

    incrementPuzzlesSolved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameFinished]);

  return (
    <div style={{ marginLeft: "-250px", paddingBottom: "20px" }}>
      <Grid2 container spacing={1}>
        {/* Column Labels */}
        <Grid2 size={12 / (num_cols + 1)} />
        {colLabels.map((label, colIndex) => (
          <Grid2 size={12 / (num_cols + 1)} key={`col-label-${colIndex}`}>
            <Typography align="center" sx={{ fontFamily: "monospace" }}>
              {label}
            </Typography>
          </Grid2>
        ))}

        {/* Board Cells */}
        {Array.from({ length: num_rows }).map((_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Grid2 size={12 / (num_cols + 1)}>
              <Typography
                align="right"
                sx={{ fontFamily: "monospace", height: "100%" }}
              >
                {rowLabels[rowIndex]}
              </Typography>
            </Grid2>
            {Array.from({ length: num_cols }).map((_, colIndex) => (
              <Grid2
                size={12 / (num_cols + 1)}
                key={`cell-${rowIndex}-${colIndex}`}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={!!answers[rowIndex][colIndex]}
                  sx={{ width: "100%", height: "170px", padding: 0 }}
                >
                  {answers[rowIndex][colIndex] && (
                    <img
                      src={answers[rowIndex][colIndex].iconURL}
                      alt={`Selected item for row ${rowIndex} col ${colIndex}`}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  )}
                </Button>
              </Grid2>
            ))}
          </React.Fragment>
        ))}
      </Grid2>

      {/* Score Display */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontFamily: "monospace", mt: 4, ml: 24 }}
      >
        Score: {score}
      </Typography>

      {/* Item Select Message */}
      {itemSelectMessage && (
        <Typography
          variant="body1"
          align="center"
          sx={{ fontFamily: "monospace", color: "white", mt: 2, ml: 22 }}
        >
          {itemSelectMessage}
        </Typography>
      )}

      {/* Game Finished Message */}
      {isGameFinished && (
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "monospace",
            mt: 4,
            color: "white",
            ml: 22,
            mb: 3,
            whiteSpace: "pre-line",
          }}
        >
          {`Game finished with a score of ${score}!\n${
            auth?.currentUser ? "Score saved." : "Log in to save your score!"
          }`}
          {numAnswersCorrect.current === num_rows * num_cols &&
            "\nCongratulations! You got all answers correct!"}
        </Typography>
      )}

      {/* Item Selection Modal */}
      <ItemSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weaponItems={weaponItems}
        onItemSelect={handleItemSelect}
      />
    </div>
  );
};

export default Board;
