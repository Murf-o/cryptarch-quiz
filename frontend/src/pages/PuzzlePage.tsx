import { useEffect, useState } from "react";
import Board from "../components/Board";
import { CircularProgress } from "@mui/material";

const NUM_ROWS = 3;
const NUM_COLS = 3;

export interface WeaponItem {
  id: number;
  name: string;
  itemType: string;
  hasIcon: boolean;
  iconURL: string;
  elementType: string;
  tier: string;
}

const ITEMS_API = "http://localhost:8000/item_data";

function PuzzlePage() {
  const [weaponItems, setWeaponItems] = useState<WeaponItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchWeaponItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(ITEMS_API);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setWeaponItems(data);
      } catch (error) {
        console.error("Failed to fetch weapon items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeaponItems();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#2f4f4f",
          color: "white",
          height: "100vh",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Board
            num_rows={NUM_ROWS}
            num_cols={NUM_COLS}
            weaponItems={weaponItems}
          />
        </div>
      </div>
    </>
  );
}

export default PuzzlePage;
