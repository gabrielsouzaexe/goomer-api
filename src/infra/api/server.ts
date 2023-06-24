import dotenv from "dotenv";
import express, { Express } from "express";
import RestaurantRepository from "../restaurant/repository/mysql/restaurant.repository";
import mysql from "mysql2/promise";
import ListRestaurantUseCase from "../../usecase/list/list.restaurant.usecase";

dotenv.config();
const PORT: number = Number(process.env.PORT) || 5000;

const app: Express = express();

app.use(express.json());
app.get("/", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "challenge",
    database: "db_goomer",
  });
  const restaurantRepository = new RestaurantRepository(connection);
  const usecase = new ListRestaurantUseCase(restaurantRepository);

  const output = await usecase.execute();
  res.status(200).json(output.restaurants);
});

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
