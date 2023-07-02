import Restaurant from "../../domain/restaurant/entity/restaurant";
import Address from "../../domain/restaurant/vo/address";
import OpeningHours from "../../domain/restaurant/vo/openingHours";
import InMemoryRestaurantRepository from "../../infra/restaurant/repository/inmemory/restaurant.inmemory-repository";
import DeleteRestaurantUseCase from "./delete.restaurant.usecase";

describe("Delete restaurant use case", () => {
  it("should delete a restaurant", async () => {
    const restaurantRepository = new InMemoryRestaurantRepository();
    const restaurant = new Restaurant("MockedID", "Paris5");
    const address = new Address("Av Paulista", 3333, "00000-000", "São Paulo");
    const openingHours = new OpeningHours(1, "12:30", "18:40");

    restaurantRepository.create(
      restaurant.withAddress(address).withOpeningHours([openingHours])
    );

    const usecase = new DeleteRestaurantUseCase(restaurantRepository);

    await usecase.execute({ id: restaurant.id });

    const restaurants = await restaurantRepository.findAll();

    expect(restaurants.length).toBe(0);
  });
});
