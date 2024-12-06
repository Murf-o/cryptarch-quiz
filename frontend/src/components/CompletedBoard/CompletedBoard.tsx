import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import { WeaponItem } from "../../pages/PuzzlePage";

interface CompletedBoardProps {
  num_rows: number;
  num_cols: number;
  answers: WeaponItem[];
  rowLabels: string[];
  colLabels: string[];
}

const CompletedBoard: React.FC<CompletedBoardProps> = ({
  num_rows,
  num_cols,
  answers,
  rowLabels,
  colLabels,
}) => {
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
                  disabled={true}
                  sx={{ width: "100%", height: "170px", padding: 0 }}
                >
                  {answers[rowIndex * num_cols + colIndex] && (
                    <img
                      src={answers[rowIndex * num_cols + colIndex].iconURL}
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
    </div>
  );
};

export default CompletedBoard;
