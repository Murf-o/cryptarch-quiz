import { response, type Express, type Request, type Response } from "express";

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

const GET_MANIFEST_URL = "/get-manifest-shit";
app.get(GET_MANIFEST_URL, async (req: Request, res: Response) => {
  /**NOTE: should move to this to just do it on startup, rather than on every request leaving it here for now till we do that */
  if (!BUNGIE_API_KEY) return res.status(500).send("BUNGIE API KEY undefined");

  const resp = await fetch(
    "https://www.bungie.net/Platform/Destiny2/Manifest",
    {
      method: "GET",
      headers: {
        "x-api-key": BUNGIE_API_KEY,
      },
    }
  );

  return res.json(await resp.json());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(
    `[server]: Get Manifest here: http://localhost:${port}${GET_MANIFEST_URL}`
  );
});
