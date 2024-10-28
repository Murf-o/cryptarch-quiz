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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 8000;
app.use(express.json);
app.use(cors());
const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY;
app.get("/get-manifest-shit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!BUNGIE_API_KEY)
        return res.status(500).send("BUNGIE API KEY undefined");
    const resp = yield fetch("https://www.bungie.net/Platform/Destiny2/Manifest", {
        method: "GET",
        headers: {
            "x-api-key": BUNGIE_API_KEY,
        },
    });
    return res.json(yield resp.json);
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
