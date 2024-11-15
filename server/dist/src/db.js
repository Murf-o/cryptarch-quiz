"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const libsql_1 = require("drizzle-orm/libsql");
const db = (0, libsql_1.drizzle)("file:" + process.env.DB_FILE_NAME);
exports.db = db;
