import { response, type Express, type Request, type Response } from "express";
import path from "path";
import fs from "fs/promises";
import AdmZip from "adm-zip";
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

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY;
const BUNGIE_MANIFEST_API_ENDPOINT = process.env.BUNGIE_MANIFEST_API_ENDPOINT;
const DB_FILE_NAME = process.env.DB_FILE_NAME!;

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

  // const zipFilePath = path.join(directoryName, "manifest.zip");
  // const zip = new AdmZip();
  // zip.addLocalFile(filePath);
  // zip.writeZip(zipFilePath);

  // Step 4: Extract the ZIP file
  const zipExtract = new AdmZip(zipFilePath);
  const extractedZipPath = "./src/db";
  zipExtract.extractAllTo(extractedZipPath, true);
  console.log(`ZIP extracted to ${extractedZipPath}`);

  // Step 5: Rename the extracted content file to an SQLite3 file
  extractedFiles = await fs.readdir(extractedZipPath);

  const oldFilePath = path.join(extractedZipPath, extractedFiles[0]);
  await fs.rename(oldFilePath, DB_FILE_NAME);

  console.log(`Renamed ${extractedFiles[0]} to ${DB_FILE_NAME}`);
}

async function getManifestURL() {
  if (!BUNGIE_API_KEY) throw new Error("BUNGIE API KEY undefined");
  if (!BUNGIE_MANIFEST_API_ENDPOINT)
    throw new Error("BUNGIE MANIFEST API ENDPOINT undefined");

  const resp = await fetch(BUNGIE_MANIFEST_API_ENDPOINT, {
    method: "GET",
    headers: {
      "x-api-key": BUNGIE_API_KEY,
    },
  });

  if (!resp.ok)
    throw new Error(`Failed to fetch bungie API: ${resp.statusText}`);

  const manifestUrl: string = await resp
    .json()
    .then((response) => response.Response.mobileWorldContentPaths.en);

  return manifestUrl;
}

app.listen(port, async () => {
  // get manifest URL
  const manifestUrl = await getManifestURL();

  // download manifest
  await downloadAndOpenManifest(manifestUrl);

  console.log(`[server]: Server is running at http://localhost:${port}`);
});
