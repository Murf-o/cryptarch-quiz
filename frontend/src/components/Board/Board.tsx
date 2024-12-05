import { Button, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemSearchModal from "../ItemSearchModal";
import { WeaponItem } from "../../pages/PuzzlePage";
import { firestoreSaveUserScore } from "../../firebase/firestore";
import { useAuth } from "../../contexts/authContext";

interface BoardProps {
  num_rows: number;
  num_cols: number;
  weaponItems: WeaponItem[];
  rowLabels: string[];
  colLabels: string[];
}

function Board({
  num_rows,
  num_cols,
  weaponItems,
  rowLabels,
  colLabels,
}: BoardProps): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [answers, setAnswers] = useState<WeaponItem[][]>(
    Array.from(Array(num_rows), () => Array(num_cols).fill(null))
  );
  const [itemSelectMessage, setItemSelectMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const auth = useAuth();

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedRow(rowIndex);
    setSelectedCol(colIndex);
    setIsModalOpen(true);
  };

  const handleItemSelect = (item: WeaponItem) => {
    if (selectedRow === null || selectedCol === null) return;

    const updated = [...answers];
    updated[selectedRow][selectedCol] = item;
    setAnswers(updated);

    if (
      item.itemType === rowLabels[selectedRow] &&
      (item.tier === colLabels[selectedCol] ||
        item.elementType === colLabels[selectedCol])
    ) {
      setScore((prev) => prev + 100);
      setItemSelectMessage("Matches! +100 points");
    } else {
      setItemSelectMessage("Incorrect!");
    }
    setIsModalOpen(false);
  };
  const isGameFinished = answers.flatMap((e) => e).every((e) => e !== null);
  if (isGameFinished) {
    if (auth?.currentUser?.email)
      firestoreSaveUserScore(score, auth?.currentUser?.email);
  }

  return (
    <div style={{ marginLeft: "-250px" }}>
      <Grid2 container spacing={1}>
        <Grid2 size={12 / (num_cols + 1)}></Grid2>
        {colLabels.map((label, colIndex) => (
          <Grid2 size={12 / (num_cols + 1)} key={`col-label-${colIndex}`}>
            <div style={{ textAlign: "center", fontFamily: "monospace" }}>
              {label}
            </div>
          </Grid2>
        ))}

        {Array.from(Array(num_rows)).map((_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Grid2 size={12 / (num_cols + 1)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  height: "100%",
                  fontFamily: "monospace",
                }}
              >
                {rowLabels[rowIndex]}
              </div>
            </Grid2>
            {Array.from(Array(num_cols)).map((_, colIndex) => (
              <Grid2
                size={12 / (num_cols + 1)}
                key={`cell-${rowIndex}-${colIndex}`}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={!!answers[rowIndex][colIndex]}
                  sx={{
                    width: "100%",
                    height: "170px",
                    padding: 0,
                  }}
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
      {/* Display the Score */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontFamily: "monospace", mt: 4, ml: 24 }}
      >
        Score: {score}
      </Typography>
      {/* Display the Item Select Message */}
      {itemSelectMessage && (
        <Typography
          variant="body1"
          align="center"
          sx={{ fontFamily: "monospace", color: "white", mt: 2, ml: 22 }}
        >
          {itemSelectMessage}
        </Typography>
      )}
      {isGameFinished && (
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "monospace",
            mt: 4,
            color: "white",
            ml: 22,
            whiteSpace: "pre-line", // makes \n render as a new line
          }}
        >
          {`Game finished, with a score of ${score}!\n ${
            auth?.currentUser ? "Score Saved." : "Login to save your scores!"
          }`}
        </Typography>
      )}
      <ItemSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weaponItems={weaponItems}
        onItemSelect={(item) => handleItemSelect(item)}
      />
    </div>
  );
}

export default Board;
