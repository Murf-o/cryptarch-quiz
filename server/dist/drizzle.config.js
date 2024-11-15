"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: "./drizzle",
    schema: "/src/db/schema.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DB_FILE_NAME,
    },
});
