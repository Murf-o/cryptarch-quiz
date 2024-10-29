import { response, type Express, type Request, type Response } from "express";
import path from "path";
import fs from "fs/promises";
import AdmZip from "adm-zip";

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

async function downloadAndOpenManifest(manifestUrl: string) {
  const response = await fetch("https://bungie.net" + manifestUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest: ${response.statusText}`);
  }

  const directoryName = "./manifest_data/";
  const filePath = path.join(directoryName, "manifest.content");

  // Ensure the directory exists
  await fs.mkdir(directoryName, { recursive: true });

  const fileStream = await fs.writeFile(
    filePath,
    await response.arrayBuffer().then((arrayBuffer) => Buffer.from(arrayBuffer))
  );
  console.log(`Manifest saved to ${filePath}`);

  // Create a ZIP archive
  const zipFilePath = path.join(directoryName, "manifest.zip");
  const zip = new AdmZip();
  zip.addLocalFile(filePath);
  zip.writeZip(zipFilePath);
  console.log(`Manifest zipped to ${zipFilePath}`);

  // Read and parse the file
  // const fileContents = await fs.readFile(filePath, "utf-8");
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
