import { Connection } from "mysql2/typings/mysql/lib/Connection";
import Restaurant from "../../../../domain/restaurant/entity/restaurant";
import IRestaurantRepository from "../../../../domain/restaurant/repository/restaurant.interface";

export default class RestaurantRepository implements IRestaurantRepository {
  constructor(private conn: Connection) {}

  async create(entity: Restaurant): Promise<void> {}

  async update(entity: Restaurant): Promise<void> {}

  async find(id: string): Promise<Restaurant | null> {
    return null;
  }

  async findAll(): Promise<Restaurant[] | null> {
    return null;
  }

  async delete(id: string): Promise<{} | undefined> {
    return undefined;
  }
}
