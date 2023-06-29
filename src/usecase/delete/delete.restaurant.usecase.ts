import IRestaurantRepository from "../../domain/restaurant/repository/restaurant.interface";
import {
  InputDeleteRestaurantDTO,
  OutputDeleteRestaurantDTO,
} from "./delete.restaurant.dto";

export default class DeleteRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRepository) {}

  async execute(
    input: InputDeleteRestaurantDTO
  ): Promise<OutputDeleteRestaurantDTO> {
    await this.restaurantRepository.delete(input.id);
    return;
  }
}
