import { RowDataPacket } from "mysql2";

export interface RestaurantModel extends RowDataPacket {
  restaurant_uuid: string;
  name: string;
  street: string;
  number: number;
  zip: string;
  city: string;
}

export interface OpeningHoursModel extends RowDataPacket {
  weekday_id: number;
  start_hour: string;
  end_hour: string;
}

export interface ExistsByUUID extends RowDataPacket {
  count: number;
}
