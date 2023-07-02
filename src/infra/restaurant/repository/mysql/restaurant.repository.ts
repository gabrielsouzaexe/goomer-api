import Restaurant from "../../../../domain/restaurant/entity/restaurant";
import Address from "../../../../domain/restaurant/vo/address";
import OpeningHours from "../../../../domain/restaurant/vo/openingHours";
import IRestaurantRepository from "../../../../domain/restaurant/repository/restaurant.interface";
import {
  ExistsByUUID,
  OpeningHoursModel,
  RestaurantModel,
} from "./restaurant.model";
import RestaurantNotFoundError from "../../../../usecase/errors/restaurant.notfound.error";
import { Connection, OkPacket } from "mysql2/promise";
import { connection } from "../../../mysql";
import { RedisClientType } from "redis";
import { redis } from "../../../redis";

const baseQuery = `
    SELECT 
      tr.restaurant_id,
      restaurant_uuid,
      name,
      street,
      number,
      zip_code,
      city
    FROM tab_restaurant tr 
    LEFT JOIN tab_address ta ON tr.restaurant_id = ta.restaurant_id
`;

export default class RestaurantRepository implements IRestaurantRepository {
  private conn: Connection;
  private cache: RedisClientType;

  constructor() {
    this.conn = connection;
    this.cache = redis;
  }

  async create(entity: Restaurant): Promise<void> {
    const [row] = await this.conn.execute<OkPacket>(
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

    for (const hours of entity.openingHours) {
      await this.conn.execute(
        "INSERT INTO `tab_opening_hours` SET restaurant_id = ?, weekday_id = ?, start_hour = ?, end_hour = ?",
        [row.insertId, hours.weekday, hours.startHour, hours.endHour]
      );
    }
  }

  async update(entity: Restaurant): Promise<void> {
    await this.conn.execute<OkPacket>(
      "UPDATE tab_restaurant SET name = ? WHERE restaurant_uuid = ?",
      [entity.name, entity.id]
    );
  }

  async find(id: string): Promise<Restaurant> {
    const joins = `
      LEFT JOIN tab_opening_hours toh ON tr.restaurant_id = toh.restaurant_id
      LEFT JOIN tab_weekday tw ON tw.weekday_id = toh.weekday_id
    `;
    const query = baseQuery + joins + `WHERE restaurant_uuid = ? LIMIT 1`;

    const [rows] = await this.conn.execute<RestaurantModel[]>(query, [id]);

    const restaurantModel = rows.shift();

    if (restaurantModel === undefined) {
      throw new RestaurantNotFoundError();
    }

    const openingHours = await this.findOpeningHours(
      restaurantModel.restaurant_id
    );

    const address = new Address(
      restaurantModel.street,
      restaurantModel.number,
      restaurantModel.zip_code,
      restaurantModel.city
    );

    const restaurant = new Restaurant(
      restaurantModel.restaurant_uuid,
      restaurantModel.name
    );

    return restaurant.withAddress(address).withOpeningHours(openingHours);
  }

  async findAll(): Promise<Restaurant[]> {
    const cacheKey = `${RestaurantRepository.name}.${this.findAll.name}`;
    const cachedResults = await this.cache.get(cacheKey);

    if (cachedResults !== null) {
      return this.cachedRestaurantList(cachedResults);
    }

    const [rows] = await this.conn.query<RestaurantModel[]>(baseQuery);

    if (rows.length === 0) {
      return [];
    }

    const restaurants = rows.map((restaurantModel) => {
      const address = new Address(
        restaurantModel.street,
        restaurantModel.number,
        restaurantModel.zip_code,
        restaurantModel.city
      );

      const restaurant = new Restaurant(
        restaurantModel.restaurant_uuid,
        restaurantModel.name
      );

      return restaurant.withAddress(address);
    });

    await this.cache.set(cacheKey, JSON.stringify(restaurants), { EX: 60 });

    return restaurants;
  }

  async delete(id: string): Promise<void> {
    const exists = await this.existsByUUID(id);

    if (!exists) {
      throw new RestaurantNotFoundError();
    }

    await this.conn.execute(
      "DELETE FROM tab_restaurant WHERE restaurant_uuid = ?",
      [id]
    );

    return;
  }

  async findOpeningHours(id: number): Promise<OpeningHours[]> {
    const query = `
        SELECT 
          weekday_id,
          start_hour,
          end_hour 
        FROM tab_opening_hours 
        WHERE restaurant_id = ?
      `;

    const [rows] = await this.conn.execute<OpeningHoursModel[]>(query, [id]);

    return rows.map((openingHour) => {
      return new OpeningHours(
        openingHour.weekday_id,
        openingHour.start_hour,
        openingHour.end_hour
      );
    });
  }

  async existsByUUID(uuid: string): Promise<boolean> {
    const [rows] = await this.conn.execute<ExistsByUUID[]>(
      "SELECT count(*) AS count FROM tab_restaurant WHERE restaurant_uuid = ?",
      [uuid]
    );

    return rows.shift()!.count > 0;
  }

  cachedRestaurantList(cachedResults: string) {
    const parsed = JSON.parse(cachedResults);

    return parsed.map((item: any) => {
      const cachedAddress = Object.assign(Address.prototype, item.address);
      const cachedRestaurant = Object.assign(Restaurant.prototype, item);

      const address = new Address(
        cachedAddress.street,
        cachedAddress.number,
        cachedAddress.zip,
        cachedAddress.city
      );

      const restaurant = new Restaurant(
        cachedRestaurant.id,
        cachedRestaurant.name
      );

      return restaurant.withAddress(address);
    });
  }
}
