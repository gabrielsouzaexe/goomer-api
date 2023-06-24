import dotenv from "dotenv";
import express, { Express } from "express";
import RestaurantRepository from "../restaurant/repository/mysql/restaurant.repository";
import ListRestaurantUseCase from "../../usecase/list/list.restaurant.usecase";
import FindRestaurantUseCase from "../../usecase/find/find.restaurant.usecase";
import CreateRestaurantUseCase from "../../usecase/create/create.restaurant.usecase";
import { connection } from "../mysql";

dotenv.config();
const PORT: number = Number(process.env.PORT) || 5000;

const app: Express = express();

app.use(express.json());
app.get("/", async (req, res) => {
  const restaurantRepository = new RestaurantRepository(connection);
  const usecase = new ListRestaurantUseCase(restaurantRepository);

  const output = await usecase.execute();
  res.status(200).json(output.restaurants);
});

app.get("/:restaurant_uuid", async (req, res) => {
  const restaurantRepository = new RestaurantRepository(connection);
  const usecase = new FindRestaurantUseCase(restaurantRepository);

  const restaurant = await usecase.execute({
    id: req.params.restaurant_uuid,
  });

  res.status(200).json(restaurant);
});

app.post("/", async (req, res) => {

  const restaurantRepository = new RestaurantRepository(connection);
  const usecase = new CreateRestaurantUseCase(restaurantRepository);

  let id;

  try {
    id = await usecase.execute({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    });
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Something went wrong. Try later.";

    res.status(422).send(`Error at create: ${errMessage}`);
  }

  res.status(200).json(id);
});

app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
