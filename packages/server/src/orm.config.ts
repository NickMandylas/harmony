import "dotenv/config";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Constants } from "utils";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    tableName: "migrations",
    transactional: true,
  },
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  tsNode: !Constants.__prod__,
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  type: "postgresql",
  debug: !Constants.__prod__,
} as Parameters<typeof MikroORM.init>[0];
