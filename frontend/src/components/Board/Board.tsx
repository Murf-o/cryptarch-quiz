import { Button, Grid2 } from "@mui/material";
import React, { useState } from "react";
import ItemSearchModal from "../ItemSearchModal";
import { WeaponItem } from "../../App";

interface BoardProps {
  num_rows: number;
  num_cols: number;
  weaponItems: WeaponItem[];
}

function Board({
  num_rows,
  num_cols,
  weaponItems,
}: BoardProps): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <Grid2 container spacing={1}>
        {Array.from(Array(num_rows * num_cols)).map((_, index) => (
          <Grid2 size={12 / num_cols} key={index}>
            <Button
              variant="outlined"
              onClick={() => setIsModalOpen(true)}
              sx={{
                width: "100%",
                height: "170px",
              }}
            ></Button>
          </Grid2>
        ))}
      </Grid2>
      <ItemSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        weaponItems={weaponItems}
      />
    </>
  );
}

export default Board;
