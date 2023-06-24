import Restaurant from "../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../domain/restaurant/repository/restaurant.interface";
import { OutputListRestaurantsDTO } from "./list.restaurant.dto";

export default class ListRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(): Promise<OutputListRestaurantsDTO> {
    const restaurants = await this.restaurantRepository.findAll();
    return this.toOutput(restaurants);
  }

  toOutput(restaurants: Restaurant[]): OutputListRestaurantsDTO {
    return {
      restaurants: restaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        address: {
          street: restaurant.address.street,
          number: restaurant.address.number,
          zip: restaurant.address.zip,
          city: restaurant.address.city,
        },
      })),
    };
  }
}
