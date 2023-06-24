import Restaurant from "../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../domain/restaurant/repository/restaurant.interface";
import Address from "../../domain/restaurant/vo/address";
import {
  InputCreateRestaurantDTO,
  OutputCreateRestaurantsDTO,
} from "./create.restaurant.dto";
import { randomUUID } from "crypto";

export default class CreateRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(
    input: InputCreateRestaurantDTO
  ): Promise<OutputCreateRestaurantsDTO> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    );

    const restaurant = new Restaurant(randomUUID(), input.name, address);

    await this.restaurantRepository.create(restaurant);

    return { id: restaurant.id };
  }
}
