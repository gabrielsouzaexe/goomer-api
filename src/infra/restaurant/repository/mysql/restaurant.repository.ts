import Restaurant from "../../../../domain/restaurant/entity/restaurant";
import Address from "../../../../domain/restaurant/vo/address";
import IRestaurantRepository from "../../../../domain/restaurant/repository/restaurant.interface";
import { RestaurantModel } from "./restaurant.model";
import RestaurantNotFoundError from "../../../../usecase/errors/restaurant.notfound.error";
import { Connection } from "mysql2/promise";
import { connection } from "../../../mysql";

let baseQuery = `
    SELECT 
      tr.restaurant_id,
      restaurant_uuid,
      name,
      street,
      number,
      zip_code,
      city
    FROM tab_restaurant tr 
    LEFT JOIN tab_address ta 
    ON tr.restaurant_id = ta.restaurant_id
`;

export default class RestaurantRepository implements IRestaurantRepository {
  private conn: Connection;

  constructor() {
    this.conn = connection;
  }

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

  async update(entity: Restaurant): Promise<void> {
    this.conn.execute("UPDATE tab_restaurant SET");
  }

  async find(id: string): Promise<Restaurant> {
    const query = baseQuery + `WHERE restaurant_uuid = ? LIMIT 1`;

    const [rows] = await this.conn.execute<RestaurantModel[]>(query, [id]);

    const restaurantModel = rows.shift() as RestaurantModel;

    if (restaurantModel === undefined) {
      throw new RestaurantNotFoundError();
    }

    const address = new Address(
      restaurantModel.street,
      restaurantModel.number,
      restaurantModel.zip,
      restaurantModel.city
    );

    return new Restaurant(
      restaurantModel.restaurant_uuid,
      restaurantModel.name,
      address
    );
  }

  async findAll(): Promise<Restaurant[]> {
    const [rows] = await this.conn.query<RestaurantModel[]>(baseQuery);

    const restaurantList = rows.map((restaurantModel) => {
      const address = new Address(
        restaurantModel.street,
        restaurantModel.number,
        restaurantModel.zip,
        restaurantModel.city
      );

      return new Restaurant(
        restaurantModel.restaurant_uuid,
        restaurantModel.name,
        address
      );
    });

    return restaurantList;
  }

  async delete(id: string): Promise<{} | undefined> {
    return undefined;
  }
}
