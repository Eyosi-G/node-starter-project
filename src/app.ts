import express from "express";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import cors from "cors";
import path from "path";
const main = () => {
  config();
  connectToDb();
  const PORT = process.env.PORT || 8080;
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join("public")));
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};

const connectToDb = async () => {
  const connection = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    entities: [],
  });
  await connection.initialize();
};
main();
