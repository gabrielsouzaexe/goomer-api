import mysql, { Connection } from "mysql2/promise";

export let connection: Connection;

export const setup = async (): Promise<mysql.Connection> => {
  if (connection) {
    return connection;
  }

  connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "challenge",
    database: "db_goomer",
  });

  return connection;
};

setup();
