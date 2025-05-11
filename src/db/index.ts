import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "@/env";

import * as tasks from "./schema/tasks";
import * as students from "./schema/students";

const schemaArray = { ...tasks, ...students };

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client, {
  schema: schemaArray,
});

export default db;
