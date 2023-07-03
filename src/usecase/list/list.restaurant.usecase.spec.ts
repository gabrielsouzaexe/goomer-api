import Restaurant from "../../domain/restaurant/entity/restaurant";
import Address from "../../domain/restaurant/vo/address";
import OpeningHours from "../../domain/restaurant/vo/openingHours";
import InMemoryRestaurantRepository from "../../infra/restaurant/repository/inmemory/restaurant.inmemory-repository";
import ListRestaurantUseCase from "./list.restaurant.usecase";

describe("List restaurants use case", () => {
  it("should list all restaurants", async () => {
    const restaurantRepository = new InMemoryRestaurantRepository();
    const restaurant = new Restaurant("MockedID", "Paris5");
    const address = new Address("Av Paulista", 3333, "00000-000", "São Paulo");
    const openingHours = new OpeningHours(1, "12:30", "18:40");

    const restaurant2 = new Restaurant("MockedID2", "Paris5");

    restaurantRepository.create(
      restaurant.withAddress(address).withOpeningHours([openingHours])
    );

    restaurantRepository.create(
      restaurant2.withAddress(address).withOpeningHours([openingHours])
    );

    const usecase = new ListRestaurantUseCase(restaurantRepository);

    await usecase.execute();

    const restaurants = await restaurantRepository.findAll();

    expect(restaurants.length).toBe(2);
    expect(restaurants).toStrictEqual([restaurant, restaurant2]);
  });
});
