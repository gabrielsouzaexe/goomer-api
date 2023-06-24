import Restaurant from "../../../../domain/restaurant/entity/restaurant";
import Address from "../../../../domain/restaurant/vo/address";
import IRestaurantRepository from "../../../../domain/restaurant/repository/restaurant.interface";
import { RestaurantModel } from "./restaurant.model";
import { Connection } from "mysql2/promise";

export default class RestaurantRepository implements IRestaurantRepository {
  constructor(private conn: Connection) {}

  async create(entity: Restaurant): Promise<void> {
    const [row]: any = await this.conn.execute(
      "INSERT INTO `tab_restaurant` SET restaurant_uuid = ?, name = ?",
      [entity.id, entity.name]
    );

    await this.conn.execute(
      "INSERT INTO `tab_address` SET restaurant_id = ?, street = ?, number = ?, zip_code = ?, city = ?",
      [
        row.insertId,
        entity.address.street,
        entity.address.number,
        entity.address.zip,
        entity.address.city,
      ]
    );
  }

  async update(entity: Restaurant): Promise<void> {}

  async find(id: string): Promise<Restaurant | null> {
    return null;
  }

  async findAll(): Promise<Restaurant[]> {
    const [rows] = await this.conn.query<RestaurantModel[]>(
      `
        SELECT tr.restaurant_id,
          restaurant_uuid,
          name,
          street,
          number,
          zip_code,
          city
        FROM tab_restaurant tr 
        JOIN tab_address ta 
        ON tr.restaurant_id = ta.restaurant_id;
      `
    );

    const restaurantList = rows.map((restaurantModel) => {
      const address = new Address(
        restaurantModel.street,
        restaurantModel.number,
        restaurantModel.zip,
        restaurantModel.city
      );

      return new Restaurant(restaurantModel.id, restaurantModel.name, address);
    });

    return restaurantList;
  }

  async delete(id: string): Promise<{} | undefined> {
    return undefined;
  }
}
