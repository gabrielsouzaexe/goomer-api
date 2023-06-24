import { RowDataPacket } from "mysql2";
import Address from "../../../../domain/restaurant/vo/address";

export interface RestaurantModel extends RowDataPacket {
  id: string;
  name: string;
  street: string;
  number: number;
  zip: string;
  city: string;
}
