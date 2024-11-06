import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
const db = drizzle("file:" + process.env.DB_FILE_NAME!);

export { db };
