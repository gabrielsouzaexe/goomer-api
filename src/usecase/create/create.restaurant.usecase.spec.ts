import InMemoryRestaurantRepository from "../../infra/restaurant/repository/inmemory/restaurant.inmemory-repository";
import CreateRestaurantUseCase from "./create.restaurant.usecase";

describe("Create restaurant use case", () => {
  it("should create a restaurant", async () => {
    const restaurantRepository = new InMemoryRestaurantRepository();

    const usecase = new CreateRestaurantUseCase(restaurantRepository);

    await usecase.execute({
      name: "Paris5",
      address: {
        street: "Av Paulista",
        number: 3333,
        zip: "00000-000",
        city: "São Paulo",
      },
      opening_hours: [],
    });

    const restaurants = await restaurantRepository.findAll();

    expect(restaurants.length).toBe(1);
    expect(restaurants[0].name).toEqual("Paris5");
  });
});
