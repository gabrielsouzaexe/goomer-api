import mysql, { Connection } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export let connection: Connection;

export const setup = async (): Promise<mysql.Connection> => {
  if (connection) {
    return connection;
  }

  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return connection;
};

setup();
