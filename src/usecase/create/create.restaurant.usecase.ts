import Restaurant from "../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../domain/restaurant/repository/restaurant.interface";
import Address from "../../domain/restaurant/vo/address";
import OpeningHours from "../../domain/restaurant/vo/openingHours";
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

    const openingHours = input.opening_hours.map((opening) => {
      return new OpeningHours(
        opening.weekday,
        opening.start_hour,
        opening.end_hour
      );
    });

    const restaurant = new Restaurant(randomUUID(), input.name);

    await this.restaurantRepository.create(
      restaurant.withAddress(address).withOpeningHours(openingHours)
    );

    return { id: restaurant.id };
  }
}
