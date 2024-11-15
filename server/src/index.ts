import { response, type Express, type Request, type Response } from "express";
import path from "path";
import fs from "fs/promises";
import AdmZip from "adm-zip";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { destinyInventoryItemDefinition } from "./database/schema";
import { Client } from "@libsql/client/.";
import { error } from "console";
// import sqlite3 from "sqlite3";

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const BUNGIE_API_KEY =
  process.env.BUNGIE_API_KEY ?? "65cb0ca42ffd4995808cf1c74cd1aeb8";
const BUNGIE_MANIFEST_API_ENDPOINT = process.env.BUNGIE_MANIFEST_API_ENDPOINT;
const DB_FILE_NAME = process.env.DB_FILE_NAME!;

const WEAPON_TYPES = new Set([
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

const DAMAGE_TYPE_MAP: { [key: number]: string } = {
  0: "Kinetic", // Not official, but some weapons still have a damage type of 0 and are kinetic
  1: "Kinetic", // Kinetic -- officially marked in DestinyDamageTypeDefinition
  2: "Arc",
  3: "Solar",
  4: "Void",
  5: "Raid", // This is a special damage type reserved for some raid activity encounters -- no weapons have it as defaultDamageType 11/12/2024
  6: "Stasis",
  7: "Strand",
};

const WEAPON_ITEMS: any[] = []; // This will store the weapon items

async function downloadAndOpenManifest(manifestUrl: string) {
  // Step 1: fetch the manifest
  const response = await fetch("https://bungie.net" + manifestUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest: ${response.statusText}`);
  }

  // Declare paths/directory
  const directoryName = "./manifest_data/";
  const contentFilePath = path.join(directoryName, "manifest.content");

  // Ensure the directory exists
  await fs.mkdir(directoryName, { recursive: true });

  // Step 2: Save the .content file
  await fs.writeFile(
    contentFilePath,
    await response.arrayBuffer().then((arrayBuffer) => Buffer.from(arrayBuffer))
  );
  console.log(`Manifest saved to ${contentFilePath}`);

  // Step 3: Rename to a zip file
  let extractedFiles = await fs.readdir(directoryName);
  const zipFilePath = path.join(directoryName, "manifest.zip");
  let savedZip = false;
  for (const file of extractedFiles) {
    const filePath = path.join(directoryName, file);
    if (file.endsWith(".content")) {
      await fs.rename(filePath, zipFilePath);
      console.log(`Manifest zipped to ${zipFilePath}`);
      savedZip = true;
      break;
    }
  }

  if (!savedZip) throw new Error("Failed to save content file as a zip");

  // Step 4: Extract the ZIP file
  const zipExtract = new AdmZip(zipFilePath);
  const extractedZipPath = "./src/database";
  zipExtract.extractAllTo(extractedZipPath, true);
  console.log(`ZIP extracted to ${extractedZipPath}`);

  // Step 5: Rename the extracted content file to an SQLite3 file
  extractedFiles = await fs.readdir(extractedZipPath);
  for (const file of extractedFiles) {
    const oldFilePath = path.join(extractedZipPath, file);
    if (file.endsWith(".content")) {
      await fs.rename(oldFilePath, DB_FILE_NAME);
      console.log(`Renamed ${extractedFiles[0]} to ${DB_FILE_NAME}`);
      break;
    }
  }
}

async function getManifestURL() {
  if (!BUNGIE_API_KEY) throw new Error("BUNGIE API KEY undefined");
  if (!BUNGIE_MANIFEST_API_ENDPOINT)
    throw new Error("BUNGIE MANIFEST API ENDPOINT undefined");

  // Helper function to add delay (throttling)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const resp = await fetch(BUNGIE_MANIFEST_API_ENDPOINT, {
        method: "GET",
        headers: {
          "x-api-key": BUNGIE_API_KEY,
        },
      });

      if (!resp.ok) {
        throw new Error(`Failed to fetch bungie API: ${resp.statusText}`);
      }

      const manifestUrl: string = await resp
        .json()
        .then((response) => response.Response.mobileWorldContentPaths.en);
      return manifestUrl;
    } catch (error) {
      attempt++;
      if (attempt == maxRetries) {
        break;
      }
      console.log(`Fetch attempt ${attempt} failed. Retrying...`);
      await delay(2000); // Wait 2 seconds before retrying
    }
  }
  throw new Error(`Failed to fetch bungie API after ${maxRetries} attempts`);
}

async function parseItemData(
  db: LibSQLDatabase<Record<string, never>> & {
    $client: Client;
  }
) {
  const data = await db.select().from(destinyInventoryItemDefinition);

  for (let i = 0; i < data.length; ++i) {
    const json = JSON.parse(data[i].json as string);
    if (json?.itemTypeDisplayName && json?.collectibleHash) {
      const itemType: string = json.itemTypeDisplayName;
      if (WEAPON_TYPES.has(itemType)) {
        const name: string = json.displayProperties.name;
        const iconURL: string =
          "https://www.bungie.net/" + json.displayProperties.icon;
        const hasIcon: boolean = json.displayProperties.hasIcon;
        const tier: string = json.inventory.tierTypeName;
        const damageType: number = json.defaultDamageType;
        // Map damageType to an elementType (like "Solar", "Arc", etc.)
        const elementType: string = DAMAGE_TYPE_MAP[damageType] || "Unknown";
        WEAPON_ITEMS.push({
          id: data[i].id,
          name,
          itemType,
          tier,
          elementType,
          // damageType,
          hasIcon,
          iconURL,
        });
      }
    }
  }
}

// get Item data we parsed earlier -- Weapons
app.get("/item_data", async (req: Request, res: Response) => {
  res.json(WEAPON_ITEMS);
});

app.listen(port, async () => {
  // get manifest URL
  const manifestUrl = await getManifestURL();

  // download manifest
  await downloadAndOpenManifest(manifestUrl);

  // open db
  const db = drizzle("file:" + process.env.DB_FILE_NAME!);
  // parse item data out of db -- filter out unneccesary data and remove items not used in the game
  await parseItemData(db);

  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const FRONTEND_PROD_BUILD_PATH = "../../frontend/dist";

app.use(express.static(path.join(__dirname, FRONTEND_PROD_BUILD_PATH)));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, FRONTEND_PROD_BUILD_PATH, "index.html"));
});
