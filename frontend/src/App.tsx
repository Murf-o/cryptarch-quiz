import { useEffect, useState } from "react";
import Board from "./components/Board";
import HomeNavbar from "./components/HomeNavbar";

const NUM_ROWS = 3;
const NUM_COLS = 3;

export interface WeaponItem {
  name: string;
  itemType: string;
  hasIcon: boolean;
  iconURL: string;
  elementType: string;
  tier: string;
  // Add other properties if needed, like itemType, icon, etc.
}

function App() {
  const [weaponItems, setWeaponItems] = useState<WeaponItem[]>([]);
  // const [loading, setLoading] = useState(true);  // Optional: For loading state

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchWeaponItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/item_data");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setWeaponItems(data);
      } catch (error) {
        console.error("Failed to fetch weapon items:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchWeaponItems();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          height: "100vh",
          width: "100%",
          display: "flex",
        }}
      >
        {/* navbar thing -- sign-up/login and all that */}
        <HomeNavbar />
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

export default App;
