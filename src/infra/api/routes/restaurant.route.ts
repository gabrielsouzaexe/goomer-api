import express, { Router, Request, Response } from "express";
import RestaurantRepository from "../../restaurant/repository/mysql/restaurant.repository";
import ListRestaurantUseCase from "../../../usecase/list/list.restaurant.usecase";
import FindpRestaurantUseCase from "../../../usecase/find/find.restaurant.usecase";
import CreateRestaurantUseCase from "../../../usecase/create/create.restaurant.usecase";
import DeleteRestaurantUseCase from "../../../usecase/delete/delete.restaurant.usecase";
import RestaurantNotFoundError from "../../../usecase/errors/restaurant.notfound.error";
import { InputCreateRestaurantDTO } from "../../../usecase/create/create.restaurant.dto";
import { InputUpdateRestaurantDTO } from "../../../usecase/update/update.restaurant.dto";
import UpdateRestaurantUseCase from "../../../usecase/update/update.restaurant.usecase";

export const restaurantRoute: Router = express.Router();

restaurantRoute.get("/", async (req, res: Response) => {
  const restaurantRepository = new RestaurantRepository();
  const usecase = new ListRestaurantUseCase(restaurantRepository);

  const output = await usecase.execute();

  const statusCode = output.restaurants.length > 0 ? 200 : 204;
  res.status(statusCode).json(output.restaurants);
});

restaurantRoute.get(
  "/:restaurant_uuid",
  async (req: Request, res: Response) => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new FindpRestaurantUseCase(restaurantRepository);

    let restaurant;

    try {
      restaurant = await usecase.execute({
        id: req.params.restaurant_uuid,
      });
    } catch (err) {
      if (err instanceof RestaurantNotFoundError) {
        res.status(404).send({ message: err.message });
      }
    }

    res.status(200).json(restaurant);
  }
);

restaurantRoute.post(
  "/",
  async (req: Request<{}, InputCreateRestaurantDTO>, res: Response) => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new CreateRestaurantUseCase(restaurantRepository);

    let id;

    try {
      id = await usecase.execute(req.body);
    } catch (err) {
      if (err instanceof Error) {
        res.status(422).send({ message: err.message });
      }
    }

    res.status(201).json(id);
  }
);

restaurantRoute.delete(
  "/:restaurant_uuid",
  async (req: Request, res: Response) => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new DeleteRestaurantUseCase(restaurantRepository);

    try {
      await usecase.execute({ id: req.params.restaurant_uuid });
    } catch (err) {
      if (err instanceof RestaurantNotFoundError) {
        res.status(404).send({ message: err.message });
      }
    }

    res.status(200).send();
  }
);

restaurantRoute.put(
  "/:restaurant_uuid",
  async (req: Request<InputUpdateRestaurantDTO>, res: Response) => {
    const restaurantRepository = new RestaurantRepository();
    const usecase = new UpdateRestaurantUseCase(restaurantRepository);

    try {
      await usecase.execute({ ...req.body, id: req.params.restaurant_uuid });
    } catch (err) {
      if (err instanceof RestaurantNotFoundError) {
        res.status(404).send({ message: err.message });
      }

      if (err instanceof Error) {
        res.status(422).send({ message: err.message });
      }
    }

    res.status(200).send();
  }
);
