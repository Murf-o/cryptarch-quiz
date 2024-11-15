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

function selectRandom<T>(arr: T[], n: number): T[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function generateRow(): string[] {
  const itemTypes = new Set<string>([
    "Fusion Rifle",
    "Sniper Rifle",
    "Sidearm",
    "Hand Cannon",
    "Trace Rifle",
    "Shotgun",
    "Pulse Rifle",
    "Rocket Launcher",
    "Sword",
    "Glaive",
    "Auto Rifle",
    "Grenade Launcher",
    "Machine Gun",
    "Submachine Gun",
    "Combat Bow",
    "Scout Rifle"
  ]);

  const rows = selectRandom(Array.from(itemTypes), NUM_ROWS);
  return rows;
}

function generateColumn(): string[] {
  const tiers = new Set<string>([
    "Legendary",
    "Exotic"
  ]);
  
  const elements = new Set<string>([
    "Kinetic",
    "Arc",
    "Solar",
    "Void",
    "Stasis",
    "Strand"
  ]);

  const combined = new Set<string>([...tiers, ...elements]);
  const columns = selectRandom(Array.from(combined), NUM_COLS);
  return columns;
}

function PuzzlePage() {
  const [weaponItems, setWeaponItems] = useState<WeaponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowLabels, setRowLabels] = useState<string[]>([]);
  const [colLabels, setColLabels] = useState<string[]>([]);

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
        setRowLabels(generateRow());
        setColLabels(generateColumn());
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
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Board
            num_rows={NUM_ROWS}
            num_cols={NUM_COLS}
            weaponItems={weaponItems}
            rowLabels={rowLabels}
            colLabels={colLabels}
          />
        </div>
        <footer
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "monospace",
            fontSize: "10px",
          }}
        >
          © Bungie, Inc. All rights reserved. Destiny, the Destiny Logo, Bungie and the Bungie logo are among the trademarks of Bungie, Inc.
        </footer>
      </div>
    </>
  );
}

export default PuzzlePage;
