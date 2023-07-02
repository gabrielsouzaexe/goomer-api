import Restaurant from "../../../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../../../domain/restaurant/repository/restaurant.interface";
import RestaurantNotFoundError from "../../../../usecase/errors/restaurant.notfound.error";

export default class InMemoryRestaurantRepository
  implements IRestaurantRepository
{
  private inMemoryDatabase: Restaurant[] = [];

  async find(id: string): Promise<Restaurant> {
    const restaurant = this.inMemoryDatabase.find(
      (restaurant) => restaurant.id === id
    );

    if (restaurant === undefined) {
      throw new RestaurantNotFoundError();
    }

    return restaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    return this.inMemoryDatabase;
  }

  async create(entity: Restaurant): Promise<void> {
    this.inMemoryDatabase.push(entity);
  }

  async delete(id: string): Promise<void> {
    const index = this.inMemoryDatabase.findIndex(
      (restaurant) => restaurant.id === id
    );

    this.inMemoryDatabase.splice(index, 1);
  }

  async update(entity: Restaurant): Promise<void> {
    const index = this.inMemoryDatabase.findIndex(
      (restaurant) => restaurant.id === entity.id
    );

    this.inMemoryDatabase[index] = entity;
  }
}
