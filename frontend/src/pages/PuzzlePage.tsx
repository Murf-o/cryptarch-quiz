import { useEffect, useState } from "react";
import Board from "../components/Board";
import { Button, CircularProgress } from "@mui/material";

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

const ITEMS_API = "/item_data";

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
    "Scout Rifle",
  ]);

  const rows = selectRandom(Array.from(itemTypes), NUM_ROWS);
  return rows;
}

function generateColumn(): string[] {
  const tiers = new Set<string>(["Legendary", "Exotic"]);

  const elements = new Set<string>([
    "Kinetic",
    "Arc",
    "Solar",
    "Void",
    "Stasis",
    "Strand",
  ]);

  const combined = new Set<string>([...tiers, ...elements]);
  const columns = selectRandom(Array.from(combined), NUM_COLS);
  return columns;
}

function handleRestart() {
  window.location.reload();
}

function PuzzlePage() {
  const [weaponItems, setWeaponItems] = useState<WeaponItem[]>([]);
  const [loading, setLoading] = useState(true);
  // const [rowLabels, setRowLabels] = useState<string[]>([]);
  // const [colLabels, setColLabels] = useState<string[]>([]);
  const rowLabels = generateRow();
  const colLabels = generateColumn();

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
        // setRowLabels(generateRow());
        // setColLabels(generateColumn());
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
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(20, 20, 40, 0.95)", // Dark background with transparency
          color: "#FFFFFF", // White text
          border: "2px solid #6A0DAD", // Glowing purple border
          boxShadow: "0px 0px 20px 5px #6A0DAD", // Glowing shadow
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 24,
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRestart}
            sx={{
              my: 2,
              ml: 2,
              color: "#fff", // White text color for better contrast
              backgroundColor: "#4CAF50", // Vibrant teal background color
              display: "block",
              padding: "8px 16px", // Adequate padding for the button
              fontWeight: 600,
              textTransform: "none",
              transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition for hover effect
              "&:hover": {
                backgroundColor: "#388E3C", // Darker shade of green on hover
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Hover shadow effect for depth
              },
              "&:active": {
                backgroundColor: "#2C6B2F", // Slightly darker green on click
              },
              "&:focus": {
                outline: "none", // Remove default focus outline
                boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.5)", // Custom focus outline for accessibility
              },
            }}
          >
            Restart
          </Button>
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
          © Bungie, Inc. All rights reserved. Destiny, the Destiny Logo, Bungie
          and the Bungie logo are among the trademarks of Bungie, Inc.
        </footer>
      </div>
    </>
  );
}

export default PuzzlePage;
