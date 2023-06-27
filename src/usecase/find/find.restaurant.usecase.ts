import Restaurant from "../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../domain/restaurant/repository/restaurant.interface";
import {
  InputFindRestaurantDTO,
  OutputFindRestaurantDTO,
} from "./find.restaurant.dto";

export default class FindpRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(
    input: InputFindRestaurantDTO
  ): Promise<OutputFindRestaurantDTO> {
    const restaurant = await this.restaurantRepository.find(input.id);
    return this.toOutput(restaurant);
  }

  toOutput(restaurant: Restaurant): OutputFindRestaurantDTO {
    return {
      id: restaurant.id,
      name: restaurant.name,
      address: {
        street: restaurant.address.street,
        number: restaurant.address.number,
        zip: restaurant.address.zip,
        city: restaurant.address.city,
      },
      opening_hours: restaurant.openingHours.map((value) => ({
        weekday_id: value.weekday.shift() as number,
        start_hour: value.startHour,
        end_hour: value.endHour,
      })),
    };
  }
}
