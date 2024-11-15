"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const libsql_1 = require("drizzle-orm/libsql");
const schema_1 = require("./database/schema");
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
const DB_FILE_NAME = process.env.DB_FILE_NAME;
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
const DAMAGE_TYPE_MAP = {
    0: "Kinetic", // Not official, but some weapons still have a damage type of 0 and are kinetic
    1: "Kinetic", // Kinetic -- officially marked in DestinyDamageTypeDefinition
    2: "Arc",
    3: "Solar",
    4: "Void",
    5: "Raid", // This is a special damage type reserved for some raid activity encounters -- no weapons have it as defaultDamageType 11/12/2024
    6: "Stasis",
    7: "Strand",
};
const WEAPON_ITEMS = []; // This will store the weapon items
function downloadAndOpenManifest(manifestUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // Step 1: fetch the manifest
        const response = yield fetch("https://bungie.net" + manifestUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch manifest: ${response.statusText}`);
        }
        // Declare paths/directory
        const directoryName = "./manifest_data/";
        const contentFilePath = path_1.default.join(directoryName, "manifest.content");
        // Ensure the directory exists
        yield promises_1.default.mkdir(directoryName, { recursive: true });
        // Step 2: Save the .content file
        yield promises_1.default.writeFile(contentFilePath, yield response.arrayBuffer().then((arrayBuffer) => Buffer.from(arrayBuffer)));
        console.log(`Manifest saved to ${contentFilePath}`);
        // Step 3: Rename to a zip file
        let extractedFiles = yield promises_1.default.readdir(directoryName);
        const zipFilePath = path_1.default.join(directoryName, "manifest.zip");
        let savedZip = false;
        for (const file of extractedFiles) {
            const filePath = path_1.default.join(directoryName, file);
            if (file.endsWith(".content")) {
                yield promises_1.default.rename(filePath, zipFilePath);
                console.log(`Manifest zipped to ${zipFilePath}`);
                savedZip = true;
                break;
            }
        }
        if (!savedZip)
            throw new Error("Failed to save content file as a zip");
        // Step 4: Extract the ZIP file
        const zipExtract = new adm_zip_1.default(zipFilePath);
        const extractedZipPath = "./src/database";
        zipExtract.extractAllTo(extractedZipPath, true);
        console.log(`ZIP extracted to ${extractedZipPath}`);
        // Step 5: Rename the extracted content file to an SQLite3 file
        extractedFiles = yield promises_1.default.readdir(extractedZipPath);
        for (const file of extractedFiles) {
            const oldFilePath = path_1.default.join(extractedZipPath, file);
            if (file.endsWith(".content")) {
                yield promises_1.default.rename(oldFilePath, DB_FILE_NAME);
                console.log(`Renamed ${extractedFiles[0]} to ${DB_FILE_NAME}`);
                break;
            }
        }
    });
}
function getManifestURL() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!BUNGIE_API_KEY)
            throw new Error("BUNGIE API KEY undefined");
        if (!BUNGIE_MANIFEST_API_ENDPOINT)
            throw new Error("BUNGIE MANIFEST API ENDPOINT undefined");
        const resp = yield fetch(BUNGIE_MANIFEST_API_ENDPOINT, {
            method: "GET",
            headers: {
                "x-api-key": BUNGIE_API_KEY,
            },
        });
        if (!resp.ok)
            throw new Error(`Failed to fetch bungie API: ${resp.statusText}`);
        const manifestUrl = yield resp
            .json()
            .then((response) => response.Response.mobileWorldContentPaths.en);
        return manifestUrl;
    });
}
function parseItemData(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield db.select().from(schema_1.destinyInventoryItemDefinition);
        for (let i = 0; i < data.length; ++i) {
            const json = JSON.parse(data[i].json);
            if ((json === null || json === void 0 ? void 0 : json.itemTypeDisplayName) && (json === null || json === void 0 ? void 0 : json.collectibleHash)) {
                const itemType = json.itemTypeDisplayName;
                if (WEAPON_TYPES.has(itemType)) {
                    const name = json.displayProperties.name;
                    const iconURL = "https://www.bungie.net/" + json.displayProperties.icon;
                    const hasIcon = json.displayProperties.hasIcon;
                    const tier = json.inventory.tierTypeName;
                    const damageType = json.defaultDamageType;
                    // Map damageType to an elementType (like "Solar", "Arc", etc.)
                    const elementType = DAMAGE_TYPE_MAP[damageType] || "Unknown";
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
    });
}
// get Item data we parsed earlier -- Weapons
app.get("/item_data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(WEAPON_ITEMS);
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // get manifest URL
    const manifestUrl = yield getManifestURL();
    // download manifest
    yield downloadAndOpenManifest(manifestUrl);
    // open db
    const db = (0, libsql_1.drizzle)("file:" + process.env.DB_FILE_NAME);
    // parse item data out of db -- filter out unneccesary data and remove items not used in the game
    yield parseItemData(db);
    console.log(`[server]: Server is running at http://localhost:${port}`);
}));
const FRONTEND_PROD_BUILD_PATH = "../../../frontend/dist";
app.use(express.static(path_1.default.join(__dirname, FRONTEND_PROD_BUILD_PATH)));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, FRONTEND_PROD_BUILD_PATH, "index.html"));
});
