import Restaurant from "../../domain/restaurant/entity/restaurant";
import Address from "../../domain/restaurant/vo/address";
import OpeningHours from "../../domain/restaurant/vo/openingHours";
import InMemoryRestaurantRepository from "../../infra/restaurant/repository/inmemory/restaurant.inmemory-repository";
import RestaurantNotFoundError from "../errors/restaurant.notfound.error";
import FindRestaurantUseCase from "./find.restaurant.usecase";

describe("Restaurant find use case", () => {
  it("should throw an error when none restaurant found", () => {
    const restaurantRepository = new InMemoryRestaurantRepository();

    const usecase = new FindRestaurantUseCase(restaurantRepository);

    expect(async () => {
      await usecase.execute({
        id: "MockedID",
      });
    }).rejects.toThrowError(new RestaurantNotFoundError());
  });

  it("should find a restaurant", async () => {
    const restaurantRepository = new InMemoryRestaurantRepository();
    const restaurant = new Restaurant("MockedID", "Paris5");
    const address = new Address("Av Paulista", 3333, "00000-000", "São Paulo");
    const openingHours = new OpeningHours(1, "12:30", "18:40");

    restaurantRepository.create(
      restaurant.withAddress(address).withOpeningHours([openingHours])
    );

    const usecase = new FindRestaurantUseCase(restaurantRepository);

    const output = {
      id: "MockedID",
      name: "Paris5",
      address: {
        street: "Av Paulista",
        number: 3333,
        zip: "00000-000",
        city: "São Paulo",
      },
      opening_hours: [
        { weekday_id: 1, start_hour: "12:30", end_hour: "18:40" },
      ],
    };

    const result = await usecase.execute({ id: "MockedID" });

    expect(result).toEqual(output);
  });
});
