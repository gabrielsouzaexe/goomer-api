import Restaurant from "../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../domain/restaurant/repository/restaurant.interface";
import Address from "../../domain/restaurant/vo/address";
import OpeningHours from "../../domain/restaurant/vo/openingHours";
import {
  InputUpdateRestaurantDTO,
  OutputUpdateRestaurantDTO,
} from "./update.restaurant.dto";

export default class UpdateRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(
    input: InputUpdateRestaurantDTO
  ): Promise<OutputUpdateRestaurantDTO> {
    const restaurant = new Restaurant(input.id, input.name);

    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    );

    const openingHours = input.opening_hours.map((opening) => {
      return new OpeningHours(
        opening.weekday.slice(),
        opening.start_hour,
        opening.end_hour
      );
    });

    await this.restaurantRepository.update(
      restaurant.withAddress(address).withOpeningHours(openingHours)
    );

    return;
  }
}
